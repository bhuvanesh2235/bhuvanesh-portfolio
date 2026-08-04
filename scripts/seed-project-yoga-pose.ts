// scripts/seed-project-yoga-pose.ts
// Adds the Yoga Pose Classification project to the DB
// Run with: npx tsx scripts/seed-project-yoga-pose.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Adding Vision in Motion: Yoga Pose Classification...');

  await sql`DELETE FROM projects WHERE slug = 'yoga-pose-classification'`;

  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES (
      'yoga-pose-classification',

      'Vision in Motion — Yoga Pose Classification',

      2024,

      'Real-time yoga pose detection & classification via webcam — MobileNetV2 CNN, OpenCV, Flask & WebRTC.',

      'A real-time yoga pose classification system that captures live webcam video, processes frames with OpenCV, and classifies poses (downdog, goddess, tree, warrior2) using a trained MobileNetV2 CNN model served via Flask. Provides instant on-screen feedback on pose accuracy to help users refine their yoga technique — no wearable or special equipment required.',

      'Yoga practitioners without access to instructors struggle to self-correct posture in real time. Static image feedback apps are too slow for live correction, and most pose detection demos are Python scripts without a user-facing interface — making them inaccessible for non-technical users.',

      'Trained a MobileNetV2 CNN (ImageNet pretrained, fine-tuned) on a labeled yoga pose image dataset with preprocessing: resizing, pixel normalization, and data augmentation. Saved the trained model as Yoga_Pose_Classification_Model.h5. Built a Flask backend that receives video frames from the browser, runs OpenCV preprocessing, passes frames through the Keras model, and returns the classification result. Frontend captures the live webcam stream via WebRTC and sends frames to the Flask API for real-time inference.',

      'Flask (Python) backend receives JPEG frames from the browser via HTTP POST, resizes and normalizes them with OpenCV, and runs inference with TensorFlow/Keras. The model outputs a softmax classification across 4 pose classes; the predicted label and confidence are returned as JSON and rendered on the webpage in real time. The HTML/CSS/JavaScript frontend uses the WebRTC getUserMedia API to capture the webcam feed and sends frames to Flask on a timer loop for live inference.',

      'Delivered a fully browser-accessible real-time yoga pose classifier: users open the webpage, click "Capture Pose", and instantly see their pose classified with feedback — no app installation required. Demonstrates end-to-end computer vision deployment: from model training and H5 serialization to Flask serving and WebRTC browser integration.',

      ARRAY['Python','TensorFlow','Keras','MobileNetV2','OpenCV','Flask','WebRTC','HTML','CSS','JavaScript','NumPy','Pillow'],

      ARRAY['Computer Vision','Deep Learning','AI/ML','Python','Flask','Real-Time','Pose Detection','CNN'],

      '/projects/yoga-pose.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/Yoga-Pose-Classification',
      true,
      8
    )
  `;

  const rows = await sql`SELECT slug, title FROM projects ORDER BY sort_order` as { slug: string; title: string }[];
  console.log('\n✅ Projects in DB:');
  rows.forEach((r) => console.log(`  • [${r.slug}] ${r.title}`));
  console.log('\n🎉 Done!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
