// Common types used across the application

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isVerified: boolean;
    roles: Array<{
      id: string;
      role: {
        id: string;
        name: string;
        permissions: string[];
      };
    }>;
  };
  cookies?: {
    [key: string]: string;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resource_type: string;
  created_at: string;
}

export interface S3UploadResult {
  Location: string;
  Key: string;
  Bucket: string;
  ETag: string;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  template?: string;
  data?: Record<string, any>;
  html?: string;
  text?: string;
  from?: string;
}

export interface NotificationData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead?: boolean;
  createdAt?: Date;
}

export interface AnalyticsEvent {
  userId?: string;
  event: string;
  properties?: Record<string, any>;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentIntent {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethodId?: string;
  subscriptionId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Feature-specific types
export interface PrinciPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  categoryId?: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciVoice {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  categoryId?: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciMoment {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  occasion: string;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciTalk {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  guestName: string;
  guestTitle?: string;
  guestOrganization?: string;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  categoryId?: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Principassion {
  id: string;
  title: string;
  description?: string;
  content: string;
  images?: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciFlash {
  id: string;
  title: string;
  content: string;
  images?: string[];
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  schoolId?: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciCare {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciFest {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  celebrationType: string;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciTorch {
  id: string;
  title: string;
  content: string;
  author?: string;
  authorTitle?: string;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciQuest {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  categoryId?: string;
  timeLimit?: number;
  maxAttempts: number;
  passingScore: number;
  viewCount: number;
  attemptCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface PrinciEdge {
  id: string;
  title: string;
  description?: string;
  type: 'webinar' | 'seminar' | 'summit';
  scheduledDate: Date;
  duration: number;
  speakerName: string;
  speakerTitle?: string;
  speakerOrganization?: string;
  speakerImage?: string;
  registrationUrl?: string;
  meetingUrl?: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  price: number;
  currency: string;
  isFree: boolean;
  tags: string[];
  viewCount: number;
  registrationCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciCatalyst {
  id: string;
  title: string;
  description?: string;
  type: 'workshop' | 'training' | 'skill-building';
  scheduledDate: Date;
  duration: number;
  instructorName: string;
  instructorTitle?: string;
  instructorOrganization?: string;
  instructorImage?: string;
  location?: string;
  isOnline: boolean;
  meetingUrl?: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  currency: string;
  isFree: boolean;
  tags: string[];
  viewCount: number;
  registrationCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciCircle {
  id: string;
  title: string;
  description?: string;
  category: string;
  authorId: string;
  status: 'active' | 'closed' | 'archived';
  viewCount: number;
  postCount: number;
  memberCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciServe {
  id: string;
  title: string;
  description?: string;
  content: string;
  images?: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  volunteerCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciPerk {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category: string;
  provider: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  originalPrice?: number;
  discountedPrice?: number;
  validFrom: Date;
  validTo: Date;
  redemptionCode?: string;
  redemptionUrl?: string;
  termsAndConditions?: string;
  status: 'active' | 'expired' | 'archived';
  viewCount: number;
  redemptionCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciAward {
  id: string;
  title: string;
  description?: string;
  category: string;
  nominationDeadline?: Date;
  announcementDate?: Date;
  ceremonyDate?: Date;
  ceremonyLocation?: string;
  eligibilityCriteria?: string;
  nominationProcess?: string;
  prizes?: string;
  status: 'open' | 'closed' | 'announced' | 'completed';
  viewCount: number;
  nominationCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciSchool {
  id: string;
  title: string;
  description?: string;
  content: string;
  thumbnailUrl?: string;
  instructorName: string;
  instructorTitle?: string;
  instructorOrganization?: string;
  instructorImage?: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  price: number;
  currency: string;
  isFree: boolean;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciPathway {
  id: string;
  title: string;
  description?: string;
  category: string;
  mentorId: string;
  mentorName: string;
  mentorTitle?: string;
  mentorOrganization?: string;
  mentorImage?: string;
  mentorBio?: string;
  expertise: string[];
  status: 'available' | 'busy' | 'unavailable';
  viewCount: number;
  connectionCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrinciHub {
  id: string;
  title: string;
  description?: string;
  city: string;
  state: string;
  country: string;
  coordinatorId: string;
  coordinatorName: string;
  coordinatorEmail: string;
  coordinatorPhone?: string;
  meetingFrequency: string;
  meetingLocation?: string;
  memberCount: number;
  status: 'active' | 'inactive' | 'archived';
  viewCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
