import { Router } from 'express';

const router = Router();

// Placeholder PrinciVoice routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciVoice endpoint' });
});

export default router;
