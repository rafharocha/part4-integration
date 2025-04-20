import express from 'express';
import multer from 'multer';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticate } from './middlewares/auth';
import { rateLimit } from './middlewares/rateLimit';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());



app.post('/api/classify', 
  authenticate,
  rateLimit,
  upload.single('document'),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) throw new Error('No file uploaded');

      const formData = new FormData();
      const blob = new Blob([file.buffer], { type: file.mimetype }); 

      formData.append('document', blob, file.originalname);
      const headers = {
        'Content-Type': `multipart/form-data;`,
      };

      const response = await axios.post(
        process.env.N8N_CLASSIFY_WEBHOOK!,
        formData,
        { headers }
      );

      if (!response.data) {
        throw new Error('Resposta vazia do N8N');
      }

      res.json({
        classification: response.data.text_content,
        status: 'processed'
      });
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ error: message });
    }
  }
);

app.post('/api/seach', 
  authenticate,
  rateLimit,
  upload.single('document'),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) throw new Error('No file uploaded');

      const formData = new FormData();
      const blob = new Blob([file.buffer], { type: file.mimetype }); 

      formData.append('document', blob, file.originalname);
      const headers = {
        'Content-Type': `multipart/form-data;`,
      };

      const response = await axios.post(
        process.env.N8N_SEARCH_WEBHOOK!,
        formData,
        { headers }
      );

      if (!response.data) {
        throw new Error('Resposta vazia do N8N');
      }

      res.json({
        results: response.data.results,
        status: 'processed'
      });
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ error: message });
    }
  }
);

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default app;