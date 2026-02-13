import { Router } from 'express';

const router = Router();

// Placeholder PrinciServe routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciServe endpoint' });
});

export default router;
