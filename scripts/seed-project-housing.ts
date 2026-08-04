// scripts/seed-project-housing.ts
// Adds the Housing Price Prediction Microservice project to the DB
// Run with: npx tsx scripts/seed-project-housing.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Adding Housing Price Prediction Microservice...');

  await sql`DELETE FROM projects WHERE slug = 'housing-price-predictor'`;

  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES (
      'housing-price-predictor',

      'Housing Price Prediction Microservice',

      2026,

      'Production-ready ML microservice — 4 models benchmarked, auto-selected by RMSE, served via Flask REST API & Docker.',

      'A deployment-ready ML engineering project that predicts residential house sale prices using the Ames Housing dataset. Demonstrates the full ML lifecycle: raw data ingestion via KaggleHub → 6 domain-engineered features → sklearn preprocessing pipeline (imputation, scaling, encoding, outlier clipping) → 4 model training & auto-selection → Flask REST API with input validation → Docker containerization. Achieves R² = 0.9245, MAE = $15,690, RMSE = $24,071 with LinearRegression on log-transformed targets.',

      'ML models in production frequently fail because training and inference use inconsistent preprocessing, predictions are served without input validation, and there is no automated way to compare and select the best model. Most tutorials stop at a trained model in a notebook — never reaching a production-grade, testable, containerized API.',

      'Built a modular OOP-first Python library (src/) with separate concerns: DataLoader (KaggleHub + API token), FeatureEngineer (6 domain features), Preprocessor (sklearn ColumnTransformer persisted as .pkl), Trainer (4 models: LinearRegression, XGBoost, LightGBM, RandomForest — auto-selects lowest validation RMSE). Applied log1p() target transformation to normalize the skewed price distribution, then expm1() at inference. Same preprocessing_pipeline.pkl used for both training and prediction to guarantee consistency.',

      'Flask API (app factory pattern) exposes GET /, GET /health, POST /predict. Input schema validation enforces required fields (OverallQual, GrLivArea, YearBuilt) with type and range checks; all other Ames features are optional — graceful median imputation fills missing columns at inference time. Rotating log files (5 MB × 3 backups) record per-prediction latency in milliseconds. Full pytest suite: 21 API integration tests + 14 pipeline unit tests + 6 model smoke tests = 41/41 passing. Dockerized with docker-compose for one-command deployment.',

      'Achieved LinearRegression as best model (RMSE $24,071, R² 0.9245, MAE $15,690) — outperforming XGBoost and LightGBM due to thoughtful feature engineering and log-normal target transformation making relationships near-linear. Live prediction on Ames House ID 1: predicted $203,609 vs actual $208,500 (~2.3% error). Average API latency ~45 ms. 41/41 tests passing. Demonstrates that preprocessing quality and feature engineering can outweigh model complexity.',

      ARRAY['Python','Flask','scikit-learn','XGBoost','LightGBM','pandas','numpy','joblib','pytest','Docker','Docker Compose','kagglehub','KaggleAPI','ColumnTransformer','SimpleImputer','StandardScaler','OrdinalEncoder','RotatingFileHandler','python-dotenv'],

      ARRAY['Machine Learning','Python','Flask','MLOps','Docker','API','scikit-learn','Feature Engineering','Regression'],

      '/projects/housing-predictor.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/housing-price-predictor',
      true,
      6
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
