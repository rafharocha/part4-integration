import 'dotenv/config';
import app from './app'; 

export default async (req: any, res: any) => {
    await app(req, res);
  };