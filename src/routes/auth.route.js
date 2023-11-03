import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('layouts/login');
})

export default router;