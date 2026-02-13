import { Router } from 'express';

const router = Router();

// Placeholder analytics routes
router.get('/', (req, res) => {
  res.json({ message: 'Analytics endpoint' });
});

export default router;
