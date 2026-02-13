import { Router } from 'express';

const router = Router();

// Placeholder PrinciPosts routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciPosts endpoint' });
});

export default router;
