import { Router } from 'express';

const router = Router();

// Placeholder PrinciMoments routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciMoments endpoint' });
});

export default router;
