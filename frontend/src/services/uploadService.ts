import { api } from './api'

export interface UploadImageResponse {
  url: string
  publicId: string
  size: number
  format: string
}

export interface UploadVideoResponse {
  url: string
  publicId: string
  size: number
  duration: number
  format: string
  thumbnailUrl: string
}

export interface UploadDocumentResponse {
  url: string
  publicId: string
  size: number
  format: string
}

export const uploadService = {
  uploadImage: async (file: File, folder?: string): Promise<UploadImageResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    if (folder) formData.append('folder', folder)

    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  uploadVideo: async (file: File, folder?: string): Promise<UploadVideoResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    if (folder) formData.append('folder', folder)

    const response = await api.post('/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000, // 5 minutes for video upload
    })
    return response.data.data
  },

  uploadDocument: async (file: File, folder?: string): Promise<UploadDocumentResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    if (folder) formData.append('folder', folder)

    const response = await api.post('/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  deleteFile: async (publicId: string): Promise<void> => {
    await api.delete(`/upload/${publicId}`)
  },

  getUploadProgress: async (uploadId: string): Promise<{ progress: number; status: string }> => {
    const response = await api.get(`/upload/progress/${uploadId}`)
    return response.data.data
  }
}

export default uploadService
