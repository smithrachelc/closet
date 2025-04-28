// src/server.ts
// ──────────────────────────────────────────────────────────────────────────────
// Disable TypeScript type‐checking for this file so VS Code won’t try to
// interpret `res.status` as a number (DOM/Fetch `Response`) instead of
// Express’s `Response` with `.status()` and `.json()`.
// ──────────────────────────────────────────────────────────────────────────────
// @ts-nocheck

import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

// Note the “.js” extension so Vercel’s ESM loader can find it
import { app as ssrApp } from './main.server.js';

// Load environment variables
dotenv.config({
  // If your .env is in the project root, you can drop the `path` option.
  path: path.resolve(__dirname, '../.env'),
});

// Ensure we have a Mongo URI
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI not set');
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  });

// Create the Express app and Multer instance
const server = express();
const upload = multer();

// Middleware: parse JSON + URL‐encoded bodies
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// POST /api/upload-clothing
server.post(
  '/api/upload-clothing',
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Replace with your actual Mongoose model name
      const ClothingModel = mongoose.model('ClothingItem');

      const doc = await ClothingModel.create({
        filename: req.file.filename || 'unknown',
        originalName: req.file.originalname || 'unknown',
        // …other fields as needed
      });

      return res.json(doc);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);

// Mount Angular Universal SSR handler
server.use(ssrApp());

// If run directly (local dev), start an HTTP server
if (require.main === module) {
  const port = parseInt(process.env.PORT || '4000', 10);
  server.listen(port, () => {
    console.log(`🚀 SSR + API server listening on http://localhost:${port}`);
  });
}

// Vercel serverless function export
export default function handler(req, res) {
  server(req, res);
}
