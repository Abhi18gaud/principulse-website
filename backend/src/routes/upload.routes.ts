import { Router } from 'express';
import { upload, uploadToS3, generateUploadUrl } from '../config/storage';
import { asyncHandler } from '../middleware/error.middleware';
import { ApiResponse } from '../types';

const router = Router();

// Upload file directly to S3
router.post('/upload', upload.single('file'), asyncHandler(async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: { code: 'NO_FILE', message: 'No file uploaded' }
    } as ApiResponse);
  }

  try {
    const result = await uploadToS3(req.file);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'File uploaded successfully'
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'UPLOAD_FAILED', message: 'Failed to upload file' }
    } as ApiResponse);
  }
}));

// Get signed URL for direct upload
router.post('/get-upload-url', asyncHandler(async (req: any, res: any) => {
  const { fileName, fileType } = req.body;
  
  if (!fileName || !fileType) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_PARAMS', message: 'fileName and fileType are required' }
    } as ApiResponse);
  }

  try {
    const result = await generateUploadUrl(fileName, fileType);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Upload URL generated successfully'
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'URL_GENERATION_FAILED', message: 'Failed to generate upload URL' }
    } as ApiResponse);
  }
}));

// Legacy endpoint for compatibility
router.post('/single', (req, res) => {
  res.json({ message: 'Use /upload for S3 upload or /get-upload-url for signed URL' });
});

export default router;
