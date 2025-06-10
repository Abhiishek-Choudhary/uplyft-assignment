import express from 'express';
import { handleMessage } from '../controllers/chatControllers.js';

const router = express.Router();

router.post('/', handleMessage);

export default router;
