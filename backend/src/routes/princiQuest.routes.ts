import { Router } from 'express';

const router = Router();

// Placeholder PrinciQuest routes
router.get('/', (req, res) => {
  res.json({ message: 'PrinciQuest endpoint' });
});

export default router;
