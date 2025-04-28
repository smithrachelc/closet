// server.ts
// ──────────────────────────────────────────────────────────────────────────────
// Disable TS checking so Express’s runtime types (res.status()/res.json())
// are used instead of any DOM/Fetch `Response` collision.
// ──────────────────────────────────────────────────────────────────────────────
// @ts-nocheck

import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

// ← Import your SSR app (compiled via tsconfig.server.json into dist/server)
//    Note the “.js” so Node’s ES‐module loader can find it.
import { app as ssrApp } from './dist/server/main.server.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI not set');
  process.exit(1);
}
mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  });

// Express + Multer setup
const server = express();
const upload = multer();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// API endpoint
server.post(
  '/api/upload-clothing',
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ error: 'No file uploaded' });
      }
      const ClothingModel = mongoose.model('ClothingItem');
      const doc = await ClothingModel.create({
        filename: req.file.filename ?? 'unknown',
        originalName:
          req.file.originalname ?? 'unknown',
      });
      return res.json(doc);
    } catch (e: any) {
      return res
        .status(500)
        .json({ error: e.message });
    }
  }
);

// Mount SSR
server.use(ssrApp());

// Local‐dev listener
if (require.main === module) {
  const port = Number(process.env.PORT || '4000');
  server.listen(port, () =>
    console.log(
      `🚀 Server listening on http://localhost:${port}`
    )
  );
}

// Vercel serverless handler
export default function handler(req, res) {
  server(req, res);
}
