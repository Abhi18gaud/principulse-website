import { Router } from 'express';

const router = Router();

// Placeholder PrinciEdge routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciEdge endpoint' });
});

export default router;
