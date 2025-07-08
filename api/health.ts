import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const isHealthy = await storage.healthCheck();
    res.status(200).json({ status: isHealthy ? 'healthy' : 'unhealthy' });
  } catch (error) {
    res.status(500).json({ message: 'Health check failed' });
  }
} 