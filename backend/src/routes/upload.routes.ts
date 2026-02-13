import { Router } from 'express';

const router = Router();

// Placeholder upload routes
router.post('/single', (req, res) => {
  res.json({ message: 'Single file upload endpoint' });
});

export default router;
