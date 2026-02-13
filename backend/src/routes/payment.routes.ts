import { Router } from 'express';

const router = Router();

// Placeholder payment routes
router.post('/create-intent', (req, res) => {
  res.json({ message: 'Create payment intent endpoint' });
});

export default router;
