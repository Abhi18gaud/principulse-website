/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `roles` table. All the data in the column will be lost.
  - The `id` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The `permissions` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_roles` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerifiedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `schoolName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `position` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `role_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_userId_fkey";

-- DropIndex
DROP INDEX "user_roles_userId_roleId_key";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
DROP COLUMN "permissions",
ADD COLUMN     "permissions" JSONB,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_pkey",
DROP COLUMN "id",
DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "assigned_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id", "role_id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "emailVerifiedAt",
DROP COLUMN "firstName",
DROP COLUMN "isActive",
DROP COLUMN "isVerified",
DROP COLUMN "lastName",
DROP COLUMN "passwordHash",
DROP COLUMN "schoolName",
DROP COLUMN "updatedAt",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_of_birth" DATE,
ADD COLUMN     "education_qualification" TEXT,
ADD COLUMN     "email_verified_at" TIMESTAMP(6),
ADD COLUMN     "experience_years" INTEGER,
ADD COLUMN     "first_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN DEFAULT true,
ADD COLUMN     "is_verified" BOOLEAN DEFAULT false,
ADD COLUMN     "join_date" DATE DEFAULT CURRENT_DATE,
ADD COLUMN     "last_login_at" TIMESTAMP(6),
ADD COLUMN     "last_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL,
ADD COLUMN     "profile_image_url" TEXT,
ADD COLUMN     "school_address" TEXT,
ADD COLUMN     "school_name" VARCHAR(255),
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "position" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "event_type" VARCHAR(50) NOT NULL,
    "resource_type" VARCHAR(50),
    "resource_id" UUID,
    "metadata" JSONB,
    "ip_address" INET,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "award_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "criteria" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "award_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "award_cycles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "nomination_start" DATE NOT NULL,
    "nomination_end" DATE NOT NULL,
    "voting_start" DATE,
    "voting_end" DATE,
    "announcement_date" DATE,
    "status" VARCHAR(20) DEFAULT 'upcoming',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "award_cycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "award_votes" (
    "award_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "voted_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "award_votes_pkey" PRIMARY KEY ("award_id","user_id")
);

-- CreateTable
CREATE TABLE "catalyst_enrollments" (
    "workshop_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "enrolled_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER DEFAULT 0,
    "completed" BOOLEAN DEFAULT false,
    "certificate_url" TEXT,

    CONSTRAINT "catalyst_enrollments_pkey" PRIMARY KEY ("workshop_id","user_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "parent_id" UUID,
    "icon_url" TEXT,
    "color" VARCHAR(7),
    "sort_order" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "circle_forum_members" (
    "forum_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "joined_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "role" VARCHAR(20) DEFAULT 'member',

    CONSTRAINT "circle_forum_members_pkey" PRIMARY KEY ("forum_id","user_id")
);

-- CreateTable
CREATE TABLE "edge_certificates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_id" UUID,
    "user_id" UUID,
    "certificate_url" TEXT NOT NULL,
    "issued_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "edge_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edge_registrations" (
    "event_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "registered_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "attended" BOOLEAN DEFAULT false,
    "certificate_url" TEXT,

    CONSTRAINT "edge_registrations_pkey" PRIMARY KEY ("event_id","user_id")
);

-- CreateTable
CREATE TABLE "hub_discussion_replies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "discussion_id" UUID,
    "user_id" UUID,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_discussion_replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub_discussions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hub_id" UUID,
    "user_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "is_pinned" BOOLEAN DEFAULT false,
    "reply_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_discussions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub_event_registrations" (
    "event_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "registered_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "attended" BOOLEAN DEFAULT false,

    CONSTRAINT "hub_event_registrations_pkey" PRIMARY KEY ("event_id","user_id")
);

-- CreateTable
CREATE TABLE "hub_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hub_id" UUID,
    "organizer_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "event_type" VARCHAR(50),
    "venue" VARCHAR(255),
    "address" TEXT,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "max_participants" INTEGER,
    "is_paid" BOOLEAN DEFAULT false,
    "price" DECIMAL(10,2),
    "registration_deadline" TIMESTAMP(6),
    "status" VARCHAR(20) DEFAULT 'upcoming',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub_members" (
    "hub_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "joined_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "role" VARCHAR(20) DEFAULT 'member',

    CONSTRAINT "hub_members_pkey" PRIMARY KEY ("hub_id","user_id")
);

-- CreateTable
CREATE TABLE "hubs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "hub_type" VARCHAR(20) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "leader_id" UUID,
    "member_count" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentorship_connections" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "mentor_id" UUID,
    "mentee_id" UUID,
    "program_id" UUID,
    "status" VARCHAR(20) DEFAULT 'active',
    "start_date" DATE DEFAULT CURRENT_DATE,
    "end_date" DATE,
    "goals" TEXT[],
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentorship_connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentorship_profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "mentorship_type" VARCHAR(20) NOT NULL,
    "expertise_areas" TEXT[],
    "experience_years" INTEGER,
    "mentorship_style" TEXT,
    "availability" TEXT,
    "max_mentees" INTEGER,
    "current_mentees" INTEGER DEFAULT 0,
    "bio" TEXT,
    "is_available" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentorship_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentorship_programs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "program_type" VARCHAR(50),
    "duration_weeks" INTEGER,
    "start_date" DATE,
    "end_date" DATE,
    "is_paid" BOOLEAN DEFAULT false,
    "price" DECIMAL(10,2),
    "max_participants" INTEGER,
    "status" VARCHAR(20) DEFAULT 'open',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentorship_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentorship_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "connection_id" UUID,
    "title" VARCHAR(255),
    "session_date" TIMESTAMP(6) NOT NULL,
    "duration_minutes" INTEGER,
    "notes" TEXT,
    "action_items" TEXT[],
    "next_session_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentorship_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "notification_type" VARCHAR(50),
    "resource_type" VARCHAR(50),
    "resource_id" UUID,
    "is_read" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occasions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "date" DATE,
    "occasion_type" VARCHAR(50),
    "is_recurring" BOOLEAN DEFAULT false,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "occasions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passion_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "icon_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passion_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "payment_type" VARCHAR(50) NOT NULL,
    "reference_id" UUID,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) DEFAULT 'INR',
    "payment_method" VARCHAR(50),
    "transaction_id" VARCHAR(255),
    "status" VARCHAR(20) DEFAULT 'pending',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perk_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "icon_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perk_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perk_redemptions" (
    "perk_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "redeemed_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) DEFAULT 'claimed',

    CONSTRAINT "perk_redemptions_pkey" PRIMARY KEY ("perk_id","user_id")
);

-- CreateTable
CREATE TABLE "princi_awards" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "award_cycle_id" UUID,
    "award_category_id" UUID,
    "nominee_id" UUID,
    "nominator_id" UUID,
    "nomination_statement" TEXT,
    "supporting_documents" TEXT[],
    "status" VARCHAR(20) DEFAULT 'nominated',
    "vote_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_care_resources" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "wellness_category_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "resource_type" VARCHAR(50),
    "media_url" TEXT,
    "thumbnail_url" TEXT,
    "is_premium" BOOLEAN DEFAULT false,
    "view_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_care_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_catalyst_workshops" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "instructor_name" VARCHAR(255),
    "instructor_bio" TEXT,
    "instructor_image_url" TEXT,
    "workshop_type" VARCHAR(50),
    "duration_hours" INTEGER,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "schedule" JSONB,
    "is_paid" BOOLEAN DEFAULT false,
    "price" DECIMAL(10,2),
    "max_participants" INTEGER,
    "current_participants" INTEGER DEFAULT 0,
    "status" VARCHAR(20) DEFAULT 'upcoming',
    "thumbnail_url" TEXT,
    "materials_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_catalyst_workshops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_circle_forums" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100),
    "is_private" BOOLEAN DEFAULT false,
    "member_count" INTEGER DEFAULT 0,
    "post_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_circle_forums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_circle_replies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "thread_id" UUID,
    "user_id" UUID,
    "parent_id" UUID,
    "content" TEXT NOT NULL,
    "like_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_circle_replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_circle_threads" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "forum_id" UUID,
    "user_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "is_pinned" BOOLEAN DEFAULT false,
    "is_locked" BOOLEAN DEFAULT false,
    "view_count" INTEGER DEFAULT 0,
    "reply_count" INTEGER DEFAULT 0,
    "last_reply_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_circle_threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_edge_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "speaker_name" VARCHAR(255),
    "speaker_bio" TEXT,
    "speaker_image_url" TEXT,
    "event_type" VARCHAR(50),
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "timezone" VARCHAR(50),
    "meeting_url" TEXT,
    "meeting_id" VARCHAR(255),
    "password" VARCHAR(100),
    "max_participants" INTEGER,
    "is_paid" BOOLEAN DEFAULT false,
    "price" DECIMAL(10,2),
    "is_featured" BOOLEAN DEFAULT false,
    "status" VARCHAR(20) DEFAULT 'upcoming',
    "thumbnail_url" TEXT,
    "recording_url" TEXT,
    "participant_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_edge_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_fest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "celebration_type" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "recipient_name" VARCHAR(255),
    "recipient_user_id" UUID,
    "ecard_url" TEXT,
    "is_public" BOOLEAN DEFAULT true,
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "celebration_date" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_fest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_fest_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fest_id" UUID,
    "user_id" UUID,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_fest_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_flash" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "content_type" VARCHAR(20) NOT NULL,
    "media_url" TEXT,
    "thumbnail_url" TEXT,
    "flash_type" VARCHAR(50),
    "is_featured" BOOLEAN DEFAULT false,
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "share_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_flash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_flash_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "flash_id" UUID,
    "user_id" UUID,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_flash_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_moments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "occasion_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "video_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "duration" INTEGER,
    "status" VARCHAR(20) DEFAULT 'processing',
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_moments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_moments_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "moment_id" UUID,
    "user_id" UUID,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_moments_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_moments_likes" (
    "moment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_moments_likes_pkey" PRIMARY KEY ("moment_id","user_id")
);

-- CreateTable
CREATE TABLE "princi_passions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "passion_category_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "content_type" VARCHAR(20) NOT NULL,
    "media_url" TEXT,
    "thumbnail_url" TEXT,
    "status" VARCHAR(20) DEFAULT 'published',
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_passions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_passions_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "passion_id" UUID,
    "user_id" UUID,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_passions_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_perks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendor_id" UUID,
    "perk_category_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "discount_type" VARCHAR(20),
    "discount_value" DECIMAL(10,2),
    "original_price" DECIMAL(10,2),
    "discounted_price" DECIMAL(10,2),
    "terms_conditions" TEXT,
    "redemption_url" TEXT,
    "promo_code" VARCHAR(100),
    "valid_from" DATE,
    "valid_until" DATE,
    "is_featured" BOOLEAN DEFAULT false,
    "is_active" BOOLEAN DEFAULT true,
    "view_count" INTEGER DEFAULT 0,
    "click_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_perks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_post_categories" (
    "post_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "princi_post_categories_pkey" PRIMARY KEY ("post_id","category_id")
);

-- CreateTable
CREATE TABLE "princi_post_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "post_id" UUID,
    "user_id" UUID,
    "parent_id" UUID,
    "content" TEXT NOT NULL,
    "like_count" INTEGER DEFAULT 0,
    "is_approved" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_post_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_post_likes" (
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_post_likes_pkey" PRIMARY KEY ("post_id","user_id")
);

-- CreateTable
CREATE TABLE "princi_post_tags" (
    "post_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "princi_post_tags_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "princi_posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "author_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "featured_image_url" TEXT,
    "status" VARCHAR(20) DEFAULT 'draft',
    "is_featured" BOOLEAN DEFAULT false,
    "view_count" INTEGER DEFAULT 0,
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "published_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_serve_initiatives" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "initiative_type" VARCHAR(50),
    "start_date" DATE,
    "end_date" DATE,
    "status" VARCHAR(20) DEFAULT 'ongoing',
    "target_audience" VARCHAR(255),
    "impact_metrics" JSONB,
    "media_urls" TEXT[],
    "is_featured" BOOLEAN DEFAULT false,
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_serve_initiatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_talks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "interviewer_id" UUID,
    "interviewee_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "video_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "duration" INTEGER,
    "status" VARCHAR(20) DEFAULT 'processing',
    "is_featured" BOOLEAN DEFAULT false,
    "view_count" INTEGER DEFAULT 0,
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "published_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_talks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_talks_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "talk_id" UUID,
    "user_id" UUID,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_talks_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_torch_messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "torch_category_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "audience" VARCHAR(50),
    "theme" VARCHAR(100),
    "occasion" VARCHAR(100),
    "is_premium" BOOLEAN DEFAULT false,
    "usage_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_torch_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_voice_categories" (
    "video_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "princi_voice_categories_pkey" PRIMARY KEY ("video_id","category_id")
);

-- CreateTable
CREATE TABLE "princi_voice_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "video_id" UUID,
    "user_id" UUID,
    "content" TEXT NOT NULL,
    "like_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_voice_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "princi_voice_likes" (
    "video_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_voice_likes_pkey" PRIMARY KEY ("video_id","user_id")
);

-- CreateTable
CREATE TABLE "princi_voice_videos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "video_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "duration" INTEGER,
    "file_size" BIGINT,
    "status" VARCHAR(20) DEFAULT 'processing',
    "is_featured" BOOLEAN DEFAULT false,
    "view_count" INTEGER DEFAULT 0,
    "like_count" INTEGER DEFAULT 0,
    "comment_count" INTEGER DEFAULT 0,
    "share_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "princi_voice_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quest_answers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quest_id" UUID,
    "user_id" UUID,
    "question_id" UUID,
    "answer" TEXT,
    "is_correct" BOOLEAN,
    "points_earned" INTEGER DEFAULT 0,
    "answered_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quest_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quest_participants" (
    "quest_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "started_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(6),
    "score" INTEGER DEFAULT 0,
    "rank" INTEGER,

    CONSTRAINT "quest_participants_pkey" PRIMARY KEY ("quest_id","user_id")
);

-- CreateTable
CREATE TABLE "quest_questions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quest_id" UUID,
    "question_text" TEXT NOT NULL,
    "question_type" VARCHAR(20),
    "options" JSONB,
    "correct_answer" TEXT,
    "points" INTEGER DEFAULT 1,
    "order_index" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quest_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "quest_type" VARCHAR(50),
    "category" VARCHAR(100),
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "prize_description" TEXT,
    "max_participants" INTEGER,
    "participant_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_course_modules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "course_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "video_url" TEXT,
    "resources_url" TEXT[],
    "order_index" INTEGER,
    "duration_minutes" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_course_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_courses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "instructor_name" VARCHAR(255),
    "instructor_bio" TEXT,
    "course_type" VARCHAR(50),
    "duration_hours" INTEGER,
    "difficulty_level" VARCHAR(20),
    "prerequisites" TEXT,
    "learning_objectives" TEXT[],
    "is_paid" BOOLEAN DEFAULT false,
    "price" DECIMAL(10,2),
    "thumbnail_url" TEXT,
    "status" VARCHAR(20) DEFAULT 'published',
    "enrollment_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_enrollments" (
    "course_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "enrolled_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER DEFAULT 0,
    "completed" BOOLEAN DEFAULT false,
    "certificate_url" TEXT,

    CONSTRAINT "school_enrollments_pkey" PRIMARY KEY ("course_id","user_id")
);

-- CreateTable
CREATE TABLE "serve_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "initiative_id" UUID,
    "user_id" UUID,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "serve_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serve_initiative_updates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "initiative_id" UUID,
    "user_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "media_urls" TEXT[],
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "serve_initiative_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsored_content" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sponsor_id" UUID,
    "content_type" VARCHAR(50) NOT NULL,
    "content_id" UUID NOT NULL,
    "sponsorship_type" VARCHAR(50),
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "cost" DECIMAL(10,2),
    "status" VARCHAR(20) DEFAULT 'active',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sponsored_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "plan_type" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "payment_method" VARCHAR(50),
    "stripe_subscription_id" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "color" VARCHAR(7),
    "usage_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "torch_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "torch_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "torch_saved_messages" (
    "message_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "saved_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "torch_saved_messages_pkey" PRIMARY KEY ("message_id","user_id")
);

-- CreateTable
CREATE TABLE "wellness_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wellness_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wellness_challenge_participants" (
    "challenge_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "joined_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER DEFAULT 0,

    CONSTRAINT "wellness_challenge_participants_pkey" PRIMARY KEY ("challenge_id","user_id")
);

-- CreateTable
CREATE TABLE "wellness_challenges" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "challenge_type" VARCHAR(50),
    "is_active" BOOLEAN DEFAULT true,
    "participant_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wellness_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_analytics_events_created" ON "analytics_events"("created_at");

-- CreateIndex
CREATE INDEX "idx_analytics_events_resource" ON "analytics_events"("resource_type", "resource_id");

-- CreateIndex
CREATE INDEX "idx_analytics_events_type" ON "analytics_events"("event_type");

-- CreateIndex
CREATE INDEX "idx_analytics_events_user" ON "analytics_events"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "award_categories_slug_key" ON "award_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "idx_edge_registrations_event" ON "edge_registrations"("event_id");

-- CreateIndex
CREATE INDEX "idx_edge_registrations_user" ON "edge_registrations"("user_id");

-- CreateIndex
CREATE INDEX "idx_notifications_created" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "idx_notifications_read" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "idx_notifications_user" ON "notifications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "occasions_slug_key" ON "occasions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "passion_categories_slug_key" ON "passion_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "perk_categories_slug_key" ON "perk_categories"("slug");

-- CreateIndex
CREATE INDEX "idx_princi_edge_events_start" ON "princi_edge_events"("start_time");

-- CreateIndex
CREATE INDEX "idx_princi_edge_events_status" ON "princi_edge_events"("status");

-- CreateIndex
CREATE INDEX "idx_princi_post_comments_post" ON "princi_post_comments"("post_id");

-- CreateIndex
CREATE INDEX "idx_princi_post_comments_user" ON "princi_post_comments"("user_id");

-- CreateIndex
CREATE INDEX "idx_princi_post_likes_post" ON "princi_post_likes"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "princi_posts_slug_key" ON "princi_posts"("slug");

-- CreateIndex
CREATE INDEX "idx_princi_posts_author" ON "princi_posts"("author_id");

-- CreateIndex
CREATE INDEX "idx_princi_posts_featured" ON "princi_posts"("is_featured");

-- CreateIndex
CREATE INDEX "idx_princi_posts_published" ON "princi_posts"("published_at");

-- CreateIndex
CREATE INDEX "idx_princi_posts_status" ON "princi_posts"("status");

-- CreateIndex
CREATE INDEX "idx_princi_voice_featured" ON "princi_voice_videos"("is_featured");

-- CreateIndex
CREATE INDEX "idx_princi_voice_status" ON "princi_voice_videos"("status");

-- CreateIndex
CREATE INDEX "idx_princi_voice_user" ON "princi_voice_videos"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "torch_categories_slug_key" ON "torch_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "wellness_categories_slug_key" ON "wellness_categories"("slug");

-- CreateIndex
CREATE INDEX "idx_user_roles_role_id" ON "user_roles"("role_id");

-- CreateIndex
CREATE INDEX "idx_user_roles_user_id" ON "user_roles"("user_id");

-- CreateIndex
CREATE INDEX "idx_users_active" ON "users"("is_active");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "award_votes" ADD CONSTRAINT "award_votes_award_id_fkey" FOREIGN KEY ("award_id") REFERENCES "princi_awards"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "award_votes" ADD CONSTRAINT "award_votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "catalyst_enrollments" ADD CONSTRAINT "catalyst_enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "catalyst_enrollments" ADD CONSTRAINT "catalyst_enrollments_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "princi_catalyst_workshops"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "circle_forum_members" ADD CONSTRAINT "circle_forum_members_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "princi_circle_forums"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "circle_forum_members" ADD CONSTRAINT "circle_forum_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "edge_certificates" ADD CONSTRAINT "edge_certificates_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "princi_edge_events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "edge_certificates" ADD CONSTRAINT "edge_certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "edge_registrations" ADD CONSTRAINT "edge_registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "princi_edge_events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "edge_registrations" ADD CONSTRAINT "edge_registrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_discussion_replies" ADD CONSTRAINT "hub_discussion_replies_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "hub_discussions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_discussion_replies" ADD CONSTRAINT "hub_discussion_replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_discussions" ADD CONSTRAINT "hub_discussions_hub_id_fkey" FOREIGN KEY ("hub_id") REFERENCES "hubs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_discussions" ADD CONSTRAINT "hub_discussions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_event_registrations" ADD CONSTRAINT "hub_event_registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "hub_events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_event_registrations" ADD CONSTRAINT "hub_event_registrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_events" ADD CONSTRAINT "hub_events_hub_id_fkey" FOREIGN KEY ("hub_id") REFERENCES "hubs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_events" ADD CONSTRAINT "hub_events_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_members" ADD CONSTRAINT "hub_members_hub_id_fkey" FOREIGN KEY ("hub_id") REFERENCES "hubs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_members" ADD CONSTRAINT "hub_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hubs" ADD CONSTRAINT "hubs_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mentorship_connections" ADD CONSTRAINT "mentorship_connections_mentee_id_fkey" FOREIGN KEY ("mentee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mentorship_connections" ADD CONSTRAINT "mentorship_connections_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mentorship_connections" ADD CONSTRAINT "mentorship_connections_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "mentorship_programs"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mentorship_profiles" ADD CONSTRAINT "mentorship_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mentorship_sessions" ADD CONSTRAINT "mentorship_sessions_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "mentorship_connections"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perk_redemptions" ADD CONSTRAINT "perk_redemptions_perk_id_fkey" FOREIGN KEY ("perk_id") REFERENCES "princi_perks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perk_redemptions" ADD CONSTRAINT "perk_redemptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_awards" ADD CONSTRAINT "princi_awards_award_category_id_fkey" FOREIGN KEY ("award_category_id") REFERENCES "award_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_awards" ADD CONSTRAINT "princi_awards_award_cycle_id_fkey" FOREIGN KEY ("award_cycle_id") REFERENCES "award_cycles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_awards" ADD CONSTRAINT "princi_awards_nominator_id_fkey" FOREIGN KEY ("nominator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_awards" ADD CONSTRAINT "princi_awards_nominee_id_fkey" FOREIGN KEY ("nominee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_care_resources" ADD CONSTRAINT "princi_care_resources_wellness_category_id_fkey" FOREIGN KEY ("wellness_category_id") REFERENCES "wellness_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_circle_replies" ADD CONSTRAINT "princi_circle_replies_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "princi_circle_replies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_circle_replies" ADD CONSTRAINT "princi_circle_replies_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "princi_circle_threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_circle_replies" ADD CONSTRAINT "princi_circle_replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_circle_threads" ADD CONSTRAINT "princi_circle_threads_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "princi_circle_forums"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_circle_threads" ADD CONSTRAINT "princi_circle_threads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_fest" ADD CONSTRAINT "princi_fest_recipient_user_id_fkey" FOREIGN KEY ("recipient_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_fest" ADD CONSTRAINT "princi_fest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_fest_comments" ADD CONSTRAINT "princi_fest_comments_fest_id_fkey" FOREIGN KEY ("fest_id") REFERENCES "princi_fest"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_fest_comments" ADD CONSTRAINT "princi_fest_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_flash" ADD CONSTRAINT "princi_flash_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_flash_comments" ADD CONSTRAINT "princi_flash_comments_flash_id_fkey" FOREIGN KEY ("flash_id") REFERENCES "princi_flash"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_flash_comments" ADD CONSTRAINT "princi_flash_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_moments" ADD CONSTRAINT "princi_moments_occasion_id_fkey" FOREIGN KEY ("occasion_id") REFERENCES "occasions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_moments" ADD CONSTRAINT "princi_moments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_moments_comments" ADD CONSTRAINT "princi_moments_comments_moment_id_fkey" FOREIGN KEY ("moment_id") REFERENCES "princi_moments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_moments_comments" ADD CONSTRAINT "princi_moments_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_moments_likes" ADD CONSTRAINT "princi_moments_likes_moment_id_fkey" FOREIGN KEY ("moment_id") REFERENCES "princi_moments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_moments_likes" ADD CONSTRAINT "princi_moments_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_passions" ADD CONSTRAINT "princi_passions_passion_category_id_fkey" FOREIGN KEY ("passion_category_id") REFERENCES "passion_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_passions" ADD CONSTRAINT "princi_passions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_passions_comments" ADD CONSTRAINT "princi_passions_comments_passion_id_fkey" FOREIGN KEY ("passion_id") REFERENCES "princi_passions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_passions_comments" ADD CONSTRAINT "princi_passions_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_perks" ADD CONSTRAINT "princi_perks_perk_category_id_fkey" FOREIGN KEY ("perk_category_id") REFERENCES "perk_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_perks" ADD CONSTRAINT "princi_perks_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_categories" ADD CONSTRAINT "princi_post_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_categories" ADD CONSTRAINT "princi_post_categories_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "princi_posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_comments" ADD CONSTRAINT "princi_post_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "princi_post_comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_comments" ADD CONSTRAINT "princi_post_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "princi_posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_comments" ADD CONSTRAINT "princi_post_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_likes" ADD CONSTRAINT "princi_post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "princi_posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_likes" ADD CONSTRAINT "princi_post_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_tags" ADD CONSTRAINT "princi_post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "princi_posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_post_tags" ADD CONSTRAINT "princi_post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_posts" ADD CONSTRAINT "princi_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_serve_initiatives" ADD CONSTRAINT "princi_serve_initiatives_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_talks" ADD CONSTRAINT "princi_talks_interviewee_id_fkey" FOREIGN KEY ("interviewee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_talks" ADD CONSTRAINT "princi_talks_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_talks_comments" ADD CONSTRAINT "princi_talks_comments_talk_id_fkey" FOREIGN KEY ("talk_id") REFERENCES "princi_talks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_talks_comments" ADD CONSTRAINT "princi_talks_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_torch_messages" ADD CONSTRAINT "princi_torch_messages_torch_category_id_fkey" FOREIGN KEY ("torch_category_id") REFERENCES "torch_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_voice_categories" ADD CONSTRAINT "princi_voice_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_voice_categories" ADD CONSTRAINT "princi_voice_categories_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "princi_voice_videos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_voice_comments" ADD CONSTRAINT "princi_voice_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_voice_comments" ADD CONSTRAINT "princi_voice_comments_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "princi_voice_videos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_voice_likes" ADD CONSTRAINT "princi_voice_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_voice_likes" ADD CONSTRAINT "princi_voice_likes_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "princi_voice_videos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "princi_voice_videos" ADD CONSTRAINT "princi_voice_videos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quest_answers" ADD CONSTRAINT "quest_answers_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quest_answers" ADD CONSTRAINT "quest_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quest_questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quest_answers" ADD CONSTRAINT "quest_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quest_participants" ADD CONSTRAINT "quest_participants_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quest_participants" ADD CONSTRAINT "quest_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quest_questions" ADD CONSTRAINT "quest_questions_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "school_course_modules" ADD CONSTRAINT "school_course_modules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "school_courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "school_enrollments" ADD CONSTRAINT "school_enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "school_courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "school_enrollments" ADD CONSTRAINT "school_enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "serve_comments" ADD CONSTRAINT "serve_comments_initiative_id_fkey" FOREIGN KEY ("initiative_id") REFERENCES "princi_serve_initiatives"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "serve_comments" ADD CONSTRAINT "serve_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "serve_initiative_updates" ADD CONSTRAINT "serve_initiative_updates_initiative_id_fkey" FOREIGN KEY ("initiative_id") REFERENCES "princi_serve_initiatives"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "serve_initiative_updates" ADD CONSTRAINT "serve_initiative_updates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sponsored_content" ADD CONSTRAINT "sponsored_content_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "torch_saved_messages" ADD CONSTRAINT "torch_saved_messages_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "princi_torch_messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "torch_saved_messages" ADD CONSTRAINT "torch_saved_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wellness_challenge_participants" ADD CONSTRAINT "wellness_challenge_participants_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "wellness_challenges"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wellness_challenge_participants" ADD CONSTRAINT "wellness_challenge_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
