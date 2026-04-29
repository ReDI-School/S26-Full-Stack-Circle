// Test file to demonstrate JWT middleware functionality
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from './middleware/authenticate.js';

const app = express();
app.use(express.json());

// Example protected route
app.get('/protected', authenticate, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not found' });
  }
  res.json({
    message: 'Access granted!',
    user: req.user,
  });
});

// Example unprotected route
app.get('/public', (req: Request, res: Response) => {
  res.json({ message: 'This is a public route' });
});

// Example of creating expired token for testing
function generateExpiredToken(userId: string, role: string): string {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ userId, role }, secret, { expiresIn: '-1s' });
}

//  Endpoint to get an expired token (for testing)
app.get('/get-expired-token', (req: Request, res: Response) => {
  try {
    const expiredToken = generateExpiredToken('test-user', 'user');
    res.json({
      message: '⚠️ This token is ALREADY EXPIRED - use for testing',
      token: expiredToken,
      note: 'This token will be rejected by the authenticate middleware',
    });
  } catch (error) {
    console.error('Error generating expired token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// Add this to test expired token scenario: returns 401 with expired token
app.get('/test-expired', authenticate, (req, res) => {
  res.json({ message: 'This should not work with expired token' });
});

app.listen(4000, () => {
  console.log('✅ Server running on http://localhost:4000');
  console.log('   GET /public');
  console.log('   GET /protected (use token above)');
  console.log('   GET /get-expired-token');
  console.log('   GET /test-expired\n');
});
