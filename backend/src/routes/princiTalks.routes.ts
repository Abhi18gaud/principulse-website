import { Router } from 'express';

const router = Router();

// Placeholder PrinciTalks routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciTalks endpoint' });
});

export default router;
