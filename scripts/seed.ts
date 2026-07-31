// scripts/seed.ts
// Run with: npx tsx scripts/seed.ts
// Make sure DATABASE_URL is set in .env.local

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Seeding database...');

  // ── Experiences ───────────────────────────────────────────
  await sql`DELETE FROM experiences`;
  await sql`
    INSERT INTO experiences (company, role, year, description, tags, sort_order) VALUES
    (
      'MOKSA.AI (USA)',
      'AI/ML Intern',
      '2023',
      'Classified datasets and trained an annotation model for surveillance applications. Built a Python + Flutter GUI for a surveillance product integrating OpenCV, NLP, and deep learning pipelines.',
      ARRAY['Python','Flutter','OpenCV','NLP','Deep Learning'],
      1
    ),
    (
      'GenAI Internship',
      'Generative AI Intern',
      '2024',
      'Hands-on work with prompt engineering and LangChain workflows. Explored Generative Adversarial Networks (GANs) and large language models (LLMs) for practical AI applications.',
      ARRAY['LangChain','Prompt Engineering','GANs','LLMs','Python'],
      2
    ),
    (
      'Infosys',
      'ML/GenAI Intern',
      '2024',
      'Built predictive models using ML, Deep Learning, and NLP to analyze credit-risk factors for the "Risk Analysis for Home Credit Default" project. Applied GenAI techniques to improve prediction accuracy.',
      ARRAY['Machine Learning','Deep Learning','NLP','GenAI','Python'],
      3
    )
  `;
  console.log('✅ Experiences seeded');

  // ── Skills ────────────────────────────────────────────────
  await sql`DELETE FROM skills`;
  await sql`
    INSERT INTO skills (category, name, icon_slug, sort_order) VALUES
    ('Languages',   'C',              'c',           1),
    ('Languages',   'C++',            'cplusplus',   2),
    ('Languages',   'Java',           'java',        3),
    ('Languages',   'Python',         'python',      4),
    ('Languages',   'JavaScript',     'javascript',  5),
    ('Languages',   'HTML',           'html5',       6),
    ('Languages',   'CSS',            'css3',        7),
    ('AI/ML',       'Machine Learning','',           8),
    ('AI/ML',       'Deep Learning',   '',           9),
    ('AI/ML',       'NLP',             '',          10),
    ('AI/ML',       'Generative AI',   '',          11),
    ('AI/ML',       'LLMs',            '',          12),
    ('AI/ML',       'GANs',            '',          13),
    ('AI/ML',       'Prompt Engineering','',        14),
    ('AI/ML',       'Computer Vision', '',          15),
    ('Frameworks',  'TensorFlow',     'tensorflow',  16),
    ('Frameworks',  'LangChain',      '',            17),
    ('Frameworks',  'OpenCV',         'opencv',      18),
    ('Frameworks',  'VideoMAE',       '',            19),
    ('Frameworks',  'Streamlit',      'streamlit',   20),
    ('Frameworks',  'Django',         'django',      21),
    ('Frameworks',  'Flutter',        'flutter',     22),
    ('Databases',   'MySQL',          'mysql',       23),
    ('Databases',   'MongoDB',        'mongodb',     24),
    ('Databases',   'Firebase',       'firebase',    25),
    ('Tools',       'GitHub',         'github',      26),
    ('Tools',       'VS Code',        'vscode',      27),
    ('Tools',       'PyCharm',        'pycharm',     28),
    ('Tools',       'Android Studio', 'androidstudio',29),
    ('Tools',       'Google Colab',   '',            30),
    ('Tools',       'Figma',          'figma',       31),
    ('Tools',       'IntelliJ',       'intellij',    32),
    ('Core CS',     'Data Structures & Algorithms','',33),
    ('Core CS',     'OOP',            '',            34),
    ('Core CS',     'Full-Stack Development','',     35)
  `;
  console.log('✅ Skills seeded');

  // ── Certifications ────────────────────────────────────────
  await sql`DELETE FROM certifications`;
  await sql`
    INSERT INTO certifications (title, issuer, year, url, sort_order) VALUES
    ('Introduction to Machine Learning for Everyone', 'Coursera',       2023, 'https://www.coursera.org/account/accomplishments/verify/VASSARXL2JMU', 1),
    ('Mastering Data Structures & Algorithms using C and C++', 'Udemy', 2023, 'https://www.udemy.com/certificate/UC-074c8d52-ef87-4871-a380-e4efa83cd323/', 2),
    ('SQL – Intermediate',                            'HackerRank',     2023, 'https://www.hackerrank.com/certificates/ff1188a70278', 3),
    ('Web Application Technologies and Django',       'Coursera',       2022, 'https://www.coursera.org/account/accomplishments/verify/MPNTU3C9TYWM', 4),
    ('Introduction to Deep Learning',                 'Great Learning', 2022, 'https://verify.mygreatlearning.com/verify/UHLIECXY', 5)
  `;
  console.log('✅ Certifications seeded');

  // ── Achievements ──────────────────────────────────────────
  await sql`DELETE FROM achievements`;
  await sql`
    INSERT INTO achievements (platform, title, value, unit, description, type, sort_order) VALUES
    ('LeetCode',   'LeetCode Rating',        '1756', 'rating',   'Top 9.53% worldwide',                           'stat',  1),
    ('CodeChef',   'CodeChef Rating',         '1010', 'rating',   '2-star competitive programmer',                 'stat',  2),
    ('HackerRank', 'HackerRank C Badge',        '5',  'stars',    '5-star badge in C programming',                 'stat',  3),
    ('HackerRank', 'HackerRank Certifications', '3',  'certs',    '3 verified skill certifications',               'stat',  4),
    (NULL, 'Nexus24 Hackathon',              NULL, NULL, '5th place · ₹3,000 cash prize · CIT',            'award', 5),
    (NULL, 'Asthra 2K24 – Project Expo',     NULL, NULL, '2nd place · Project Expo · KIT',                 'award', 6),
    (NULL, 'Asthra 2K24 – Ideathon',         NULL, NULL, '1st place · Ideathon · KIT',                     'award', 7),
    (NULL, 'JITHACK''24',                    NULL, NULL, 'Participant · 24-hour hackathon · JIT Bangalore', 'award', 8)
  `;
  console.log('✅ Achievements seeded');

  // ── Projects ──────────────────────────────────────────────
  await sql`DELETE FROM projects`;
  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES
    (
      'chameleon',
      'Chameleon – Interactive Language Learning App',
      2024,
      'Interactive language acquisition with lessons, quizzes, real-time video calls, chat, object detection & translation.',
      'Chameleon is a comprehensive Android language learning application designed to make language acquisition engaging, interactive, and effective. It combines structured lessons, quizzes, handwriting and pronunciation practice with real-time video calls, WhatsApp-style messaging, object detection, and multilingual translation.',
      'Language learning can be challenging without access to quality resources, native speakers, or personalized guidance. Traditional methods lack interactivity, making it difficult to practice speaking, writing, and pronunciation effectively in real-world conversational contexts.',
      'Designed a multi-modal Android platform in Java with 18+ custom screens designed in Figma. Combined self-paced learning modules (lessons, quizzes, handwriting practice) with live communication features (1-on-1 video calls, real-time chat) and AI-driven tools (object detection & message translation).',
      'Built in Java with Android Studio & XML UI layouts. Integrated TensorFlow for object detection (identifying real-world objects in the target language), OpenCV for video call processing, and Google Translation API for real-time message translation. Implemented a Java-based real-time messaging engine for student-teacher interaction.',
      'Dramatically improved language proficiency across speaking, writing, and pronunciation. Increased learner motivation through interactive quizzes and live video sessions, making quality language education accessible globally.',
      ARRAY['Java','Android Studio','TensorFlow','OpenCV','Google Translation API','Figma','XML','Real-time Chat'],
      ARRAY['Android','AI/ML','Computer Vision','Object Detection','Mobile'],
      '/projects/chameleon.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/Chameleon-Language-Learning-App',
      true,
      1
    ),
    (
      'surveillance-vision-transformers',
      'Surveillance Using Vision Transformers (ViTs)',
      2024,
      'Real-time retail anomaly, theft, and violence detection powered by VideoMAE, HOG tracking & Streamlit.',
      'An end-to-end intelligent video surveillance system leveraging Vision Transformers (ViTs) and VideoMAE (Video Masked Autoencoders) for real-time anomaly detection, action recognition, and person tracking in retail environments. Designed to combat retail shrink ($112.1B annual loss) and Organized Retail Crime (ORC) by classifying behavior into Normal, Suspicious, Aggressive, Violence, and Theft.',
      'Retail shrink reached $112.1 billion in 2022, with theft accounting for 65–70% of losses and Organized Retail Crime (ORC) growing increasingly violent (81% report higher violence). Traditional CCTV systems rely on manual monitoring and rule-based frame analysis, failing to capture complex temporal context or prevent active threats.',
      'Engineered the EnhancedRetailSurveillanceSystem using VideoMAE pretrained on UCF-Crime (128 hrs, 1900 videos across 13 anomaly classes) and Kinetics-400 (400 human action classes). Combined HOG motion detection, a custom PersonTracker, and a 16-frame sliding buffer to classify behavior across 5 distinct threat levels.',
      'Built a Google Colab GPU processing backend linked via Pyngrok to a Streamlit web interface. Uploaded video streams undergo HOG person detection, tracking, and 16-frame temporal classification via VideoMAE. Output includes real-time annotated video frames with bounding boxes, anomaly confidence statistics ("Violence Detected"), automated Google Drive results sync, and Streamlit dashboard alerts.',
      'Achieved real-time, high-accuracy threat detection with significantly reduced false alarms. Provided automated alert logs to Google Drive and Streamlit dashboard, creating a scalable, future-proof AI surveillance pipeline for retail security.',
      ARRAY['Python','VideoMAE','Vision Transformers (ViTs)','PyTorch','Streamlit','HOG','Google Colab','Pyngrok','UCF-Crime','Kinetics-400'],
      ARRAY['AI/ML','Computer Vision','Deep Learning','Transformers','Streamlit'],
      '/projects/surveillance-v3.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/-Surveillance-Using-Vision-Transformers-ViTs-',
      true,
      2
    ),
    (
      'saas-smart-attendance',
      'Smart Attendance and Services (SAAS)',
      2023,
      'Automated face-recognition attendance with Flask & OpenCV, Google Drive Excel exports, and real-time translation.',
      'SAAS (Smart Attendance and Services) is a web application built with Python, Flask, and OpenCV that automates classroom attendance recording via face recognition (haarcascade_frontalface). It syncs logs to Google Drive as Excel sheets, includes real-time translation into German, Arabic, and Korean, and features secure user account management.',
      'Managing attendance manually is time-consuming in large classrooms, error-prone due to student mistakes or proxy attendance, and relies on inefficient paper-based records.',
      'Built a modular Flask web application with 4 primary tabs: Attendance, Scan Activity, Translate, and Account. Combined OpenCV with haarcascade_frontalface for automated face detection/recognition, integrated Google Drive API for Excel spreadsheet sync, and built a real-time language translation module for German, Arabic, and Korean.',
      'Face detection and recognition utilize OpenCV''s haarcascade_frontalface classifier to capture student presence as they enter. Attendance data is automatically formatted into Excel sheets and synced via the Google Drive API for easy access. The real-time translation engine lets users download language models and translate text into German, Arabic, or Korean. Includes secure email/password authentication and an attractive splash screen UX.',
      'Automated classroom attendance to eliminate manual errors and proxy attendance. Reduced attendance marking time to seconds, streamlined faculty workflow with automated Google Drive Excel sheets, and added multi-language support.',
      ARRAY['Python','Flask','OpenCV','Google Drive API','Translation API','Haarcascade','Excel Export'],
      ARRAY['Python','Flask','AI/ML','Computer Vision','Automation'],
      '/projects/saas.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/Smart-Attendance-And-Services-SAAS-',
      false,
      3
    )
  `;
  console.log('✅ Projects seeded');

  console.log('\n🎉 Database seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
