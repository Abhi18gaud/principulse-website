import { Router } from 'express';

const router = Router();

// Placeholder PrinciSchool routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciSchool endpoint' });
});

export default router;
