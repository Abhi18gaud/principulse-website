import { Router } from 'express';

const router = Router();

// Placeholder Principassions routes
router.get('/', (req, res) => {
  res.json({ message: 'Principassions endpoint' });
});

export default router;
