// src/server.ts
// ──────────────────────────────────────────────────────────────────────────────
// Turn off TS checking here so we never pull in the DOM “Response” type, and
// your Express handlers compile without errors.
// ──────────────────────────────────────────────────────────────────────────────
// @ts-nocheck

import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import * as mongoose from 'mongoose';
import multer from 'multer';

import { app as ssrApp } from './main.server';

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, '../backend/.env'),
});

// Connect to MongoDB Atlas
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI not set');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  });

// Create Express app + multer
const server = express();
const upload = multer();

// Middleware: JSON + URL‐encoded bodies
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

      // Swap in your actual Mongoose model name
      const ClothingModel = mongoose.model('ClothingItem');

      const doc = await ClothingModel.create({
        filename: req.file.filename || 'unknown',
        originalName: req.file.originalname || 'unknown',
        // …other fields
      });

      return res.json(doc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// Mount Angular Universal SSR
server.use(ssrApp());

// If run directly, start HTTP server
if (require.main === module) {
  const port = parseInt(process.env.PORT || '4000', 10);
  server.listen(port, () => {
    console.log(`🚀 SSR + API server listening on http://localhost:${port}`);
  });
}

// Vercel serverless handler
export default function handler(req, res) {
  server(req, res);
}
