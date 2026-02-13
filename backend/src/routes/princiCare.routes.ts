import { Router } from 'express';

const router = Router();

// Placeholder PrinciCare routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciCare endpoint' });
});

export default router;
