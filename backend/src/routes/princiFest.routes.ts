import { Router } from 'express';

const router = Router();

// Placeholder PrinciFest routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciFest endpoint' });
});

export default router;
