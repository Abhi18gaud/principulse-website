// File upload configuration for large files
import multer from 'multer';
import AWS from 'aws-sdk';

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer configuration for temporary storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow videos, images, documents
    const allowedTypes = /jpeg|jpg|png|gif|mp4|avi|mov|pdf|doc|docx/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Upload file to S3
export async function uploadToS3(file: any) {
  const key = `uploads/${Date.now()}-${file.originalname}`;
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  
  const result = await s3.upload(params).promise();
  
  return {
    fileUrl: result.Location,
    key: result.Key,
    originalName: file.originalname,
    size: file.size,
    type: file.mimetype,
  };
}

// Generate S3 signed URL for direct upload
export async function generateUploadUrl(fileName: string, fileType: string) {
  const key = `uploads/${Date.now()}-${fileName}`;
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Expires: 3600,
    ContentType: fileType,
  };
  
  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  
  return {
    uploadUrl,
    fileUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    key,
  };
}

export { upload };
