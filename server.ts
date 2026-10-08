import express from 'express';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory secure OTP storage (hashed with SHA-256)
interface OtpSession {
  hashedOtp: string;
  expiresAt: number;
  attempts: number;
  verified: boolean;
}

const otpStore = new Map<string, OtpSession>();

// Helper to hash OTP
function hashValue(val: string): string {
  return crypto.createHash('sha256').update(val).digest('hex');
}

// Clean up expired OTPs periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, session] of otpStore.entries()) {
    if (session.expiresAt < now) {
      otpStore.delete(key);
    }
  }
}, 60 * 1000);

// Endpoint: Send OTP
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;

  if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
    return res.status(400).json({ error: 'Valid mobile phone number is required.' });
  }

  const cleanPhone = phone.trim();

  // Generate 6-digit cryptographic OTP
  const rawOtp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = hashValue(rawOtp);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(cleanPhone, {
    hashedOtp,
    expiresAt,
    attempts: 0,
    verified: false,
  });

  // Log on server for testing/audit without exposing to frontend HTTP response
  console.log(`[SECURE AUTH GATE] Verification OTP for ${cleanPhone}: [${rawOtp}] (Valid for 5 mins)`);

  // Mask phone number for security in response
  const visiblePrefix = cleanPhone.slice(0, 4);
  const visibleSuffix = cleanPhone.slice(-2);
  const maskedPhone = `${visiblePrefix}****${visibleSuffix}`;

  return res.json({
    success: true,
    maskedPhone,
    expiresInSeconds: 300,
    message: `Secure 6-digit verification code sent to ${maskedPhone}.`,
  });
});

// Endpoint: Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone number and verification OTP code are required.' });
  }

  const cleanPhone = phone.trim();
  const cleanOtp = otp.toString().trim();

  const session = otpStore.get(cleanPhone);

  if (!session) {
    return res.status(400).json({
      error: 'No active OTP verification session found. Please request a new code.',
    });
  }

  if (Date.now() > session.expiresAt) {
    otpStore.delete(cleanPhone);
    return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
  }

  if (session.attempts >= 4) {
    otpStore.delete(cleanPhone);
    return res.status(429).json({
      error: 'Maximum verification attempts exceeded. Please request a new code.',
    });
  }

  session.attempts += 1;

  const incomingHash = hashValue(cleanOtp);

  // Constant-time comparison
  const isValid = crypto.timingSafeEqual(
    Buffer.from(incomingHash, 'hex'),
    Buffer.from(session.hashedOtp, 'hex')
  );

  if (!isValid) {
    const remaining = 4 - session.attempts;
    return res.status(400).json({
      error: `Invalid verification code. ${remaining} attempts remaining.`,
    });
  }

  // Mark as verified and remove OTP
  otpStore.delete(cleanPhone);

  return res.json({
    success: true,
    verified: true,
    message: 'Mobile number successfully verified.',
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite middlewares in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
