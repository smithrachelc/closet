// src/server.ts
// ──────────────────────────────────────────────────────────────────────────────
// Disable TS checking in this file so we never pull in the DOM “Response” type.
// ──────────────────────────────────────────────────────────────────────────────
// @ts-nocheck

import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { app as ssrApp } from './main.server';

// Load environment variables from .env
dotenv.config({
  // If your .env lives somewhere else, adjust the path accordingly:
  // path: path.resolve(__dirname, '../.env'),
});

// Ensure we have a Mongo URI
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI not set');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  });

// Create Express app + multer
const server = express();
const upload = multer();

// Parse JSON and URL-encoded bodies
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// POST /api/upload-clothing
server.post(
  '/api/upload-clothing',
  upload.single('image'),
  async (req, res) => {
    try {
      // multer puts the file metadata on req.file
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Replace with your actual model name
      const ClothingModel = mongoose.model('ClothingItem');

      const doc = await ClothingModel.create({
        filename: req.file.filename || 'unknown',
        originalName: req.file.originalname || 'unknown',
        // …add other schema fields here as needed
      });

      return res.json(doc);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);

// Mount your Angular Universal SSR handler
server.use(ssrApp());

// If run locally (node src/server.ts), start the HTTP listener
if (require.main === module) {
  const port = parseInt(process.env.PORT || '4000', 10);
  server.listen(port, () => {
    console.log(`🚀 SSR + API server listening on http://localhost:${port}`);
  });
}

// Export for Vercel’s serverless function
export default function handler(req, res) {
  server(req, res);
}
