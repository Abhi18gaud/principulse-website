import { Router } from 'express';

const router = Router();

// Placeholder notification routes
router.get('/', (req, res) => {
  res.json({ message: 'Notifications endpoint' });
});

export default router;
