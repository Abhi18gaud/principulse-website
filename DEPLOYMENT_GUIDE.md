# 🚀 Principulse Deployment Guide

## 📋 Overview
- **Backend**: Deploy to Render (Node.js)
- **Frontend**: Deploy to Vercel/Netlify (React)
- **Database**: Aiven PostgreSQL (already deployed)
- **Storage**: AWS S3 for large files

## 🔧 Step 1: Backend Deployment (Render)

### 1. Prepare for Production
```bash
# Build your backend
npm install ;npm run build

# Test production build locally
npm start
```

### 2. Deploy to Render
1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repository
4. **Build Command**: `npm install ;npm run build`
5. **Start Command**: `npm start`
6. **Environment Variables** (add all from .env):
   ```
   DATABASE_URL=your-production-db-url
   REDIS_URL=your-production-redis-url
   JWT_SECRET=your-production-jwt-secret
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=your-aws-region
   AWS_S3_BUCKET=your-s3-bucket-name
   EMAIL_HOST=your-email-host
   EMAIL_USER=your-email
   EMAIL_PASS=your-email-password
   ```

### 3. Get Backend URL
After deployment, you'll get: `https://your-api.onrender.com`

## 🎨 Step 2: Frontend Deployment

### 1. Update Frontend Configuration
```typescript
// frontend/.env.production
VITE_API_BASE_URL=https://your-api.onrender.com/api/v1
VITE_AWS_REGION=your-aws-region
VITE_AWS_BUCKET=your-s3-bucket-name
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your frontend repository
3. Vercel will auto-detect React
4. Add environment variables
5. Deploy: `https://your-app.vercel.app`

## 📁 Step 3: AWS S3 Setup

### 1. Create S3 Bucket
```bash
# AWS Console → S3 → Create bucket
Bucket Name: principulse-uploads
Region: us-east-1 (or your preferred region)
Block all public access: ✅
```

### 2. Configure CORS
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 3. Get AWS Credentials
1. AWS Console → IAM → Users → Create user
2. Attach policy: `AmazonS3FullAccess`
3. Create access keys
4. Add to Render environment variables

## 🔄 File Upload Flow

### Option A: Backend Upload (Simple)
```javascript
// Frontend sends file to backend
// Backend uploads to S3
// Backend returns S3 URL
POST /api/v1/upload/upload
Content-Type: multipart/form-data
```

### Option B: Direct Upload (Better for large files)
```javascript
// 1. Frontend requests signed URL
POST /api/v1/upload/get-upload-url
{
  "fileName": "video.mp4",
  "fileType": "video/mp4"
}

// 2. Frontend uploads directly to S3
PUT returned-signed-url
Content-Type: video/mp4

// 3. Frontend notifies backend with file info
POST /api/v1/upload/complete
{
  "fileUrl": "s3-url",
  "fileName": "video.mp4"
}
```

## 🎯 Production Checklist

### Backend ✅
- [ ] Environment variables set
- [ ] Database connection working
- [ ] Redis connection working
- [ ] S3 credentials configured
- [ ] Build successful
- [ ] API endpoints tested

### Frontend ✅
- [ ] API base URL updated
- [ ] Environment variables set
- [ ] Build successful
- [ ] File upload working
- [ ] Authentication flow working

### AWS S3 ✅
- [ ] Bucket created
- [ ] CORS configured
- [ ] IAM user with S3 access
- [ ] Access keys generated
- [ ] Bucket policy set for public access (if needed)

## 🚨 Important Notes

### Security
- Never commit .env files
- Use different secrets for production
- Enable bucket encryption
- Set up bucket logging

### Performance
- Use CloudFront CDN for S3 files
- Enable file compression
- Set up proper caching headers

### Costs
- Monitor AWS S3 usage
- Set up billing alerts
- Consider lifecycle policies for old files

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Render
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Render
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

## 🎉 You're Ready!

Your Principulse platform will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-api.onrender.com/api/v1`
- **Database**: Aiven PostgreSQL
- **File Storage**: AWS S3

Users can now:
- Register and login
- Upload videos and large files
- Access content from CDN
- Use all Principulse features!
