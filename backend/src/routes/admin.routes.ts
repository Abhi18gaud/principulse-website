import { Router } from 'express';

const router = Router();

// Placeholder admin routes
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard endpoint' });
});

export default router;
