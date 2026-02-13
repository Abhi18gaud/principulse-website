import { Router } from 'express';

const router = Router();

// Placeholder PrinciPerks routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciPerks endpoint' });
});

export default router;
