import { Router } from 'express';

const router = Router();

// Placeholder user routes
router.get('/profile', (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

export default router;
