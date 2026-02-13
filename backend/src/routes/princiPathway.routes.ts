import { Router } from 'express';

const router = Router();

// Placeholder PrinciPathway routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciPathway endpoint' });
});

export default router;
