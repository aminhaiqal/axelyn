/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the `AgentMemory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Execution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LLMCall` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LLMModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LLMProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LearningMetric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Node` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trigger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkflowLearning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkflowVersion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `business_id` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Workflow` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('RETAIL', 'RESTAURANT', 'SERVICES', 'ECOMMERCE', 'EDUCATION', 'HEALTHCARE', 'OTHER');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('THUMBS_UP', 'THUMBS_DOWN', 'EDIT', 'SKIP');

-- CreateEnum
CREATE TYPE "IntentCategory" AS ENUM ('INQUIRY', 'BOOKING', 'ORDER', 'SUPPORT', 'GREETING', 'PRICING', 'AVAILABILITY', 'LOCATION', 'OTHER');

-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('ACTIVE', 'WAITING_HUMAN', 'RESOLVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'MALAY', 'MANGLISH');

-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('TRIGGER', 'RESPONSE', 'INTENT_DETECTION', 'KNOWLEDGE_RETRIEVAL', 'LLM_CALL', 'SENTIMENT_ANALYSIS', 'ENTITY_EXTRACTION', 'CONDITION', 'SWITCH', 'LOOP', 'WAIT', 'VARIABLE_SET', 'VARIABLE_GET', 'DATA_TRANSFORM', 'API_CALL', 'DATABASE_QUERY', 'WEBHOOK', 'CHECK_AVAILABILITY', 'CALCULATE_PRICE', 'VALIDATE_INPUT', 'ESCALATE_TO_HUMAN', 'NOTIFY_STAFF');

-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "WorkflowSource" AS ENUM ('AI_GENERATED', 'USER_BUILT', 'TEMPLATE', 'HYBRID');

-- DropForeignKey
ALTER TABLE "public"."AgentMemory" DROP CONSTRAINT "AgentMemory_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Execution" DROP CONSTRAINT "Execution_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Execution" DROP CONSTRAINT "Execution_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_executionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_workflowLearningId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LLMCall" DROP CONSTRAINT "LLMCall_executionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LLMCall" DROP CONSTRAINT "LLMCall_llmModelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LLMModel" DROP CONSTRAINT "LLMModel_providerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Node" DROP CONSTRAINT "Node_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TrainingEvent" DROP CONSTRAINT "TrainingEvent_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trigger" DROP CONSTRAINT "Trigger_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Workflow" DROP CONSTRAINT "Workflow_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkflowLearning" DROP CONSTRAINT "WorkflowLearning_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkflowVersion" DROP CONSTRAINT "WorkflowVersion_workflowId_fkey";

-- AlterTable
ALTER TABLE "Workflow" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "avg_execution_time" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "business_id" TEXT NOT NULL,
ADD COLUMN     "canvas_data" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "execution_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "generation_model" TEXT NOT NULL DEFAULT 'claude-sonnet-4-5',
ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "source" "WorkflowSource" NOT NULL DEFAULT 'AI_GENERATED',
ADD COLUMN     "status" "WorkflowStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "success_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "thumbs_down" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "thumbs_up" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_feedback" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "trigger_conditions" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "trigger_type" TEXT NOT NULL DEFAULT 'whatsapp_message',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_prompt" TEXT,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "public"."AgentMemory";

-- DropTable
DROP TABLE "public"."Execution";

-- DropTable
DROP TABLE "public"."Feedback";

-- DropTable
DROP TABLE "public"."LLMCall";

-- DropTable
DROP TABLE "public"."LLMModel";

-- DropTable
DROP TABLE "public"."LLMProvider";

-- DropTable
DROP TABLE "public"."LearningMetric";

-- DropTable
DROP TABLE "public"."Node";

-- DropTable
DROP TABLE "public"."TrainingEvent";

-- DropTable
DROP TABLE "public"."Trigger";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."WorkflowLearning";

-- DropTable
DROP TABLE "public"."WorkflowVersion";

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "business_type" "BusinessType" NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "description" TEXT,
    "operating_hours" JSONB NOT NULL DEFAULT '{}',
    "location" TEXT,
    "website" TEXT,
    "brand_voice" TEXT NOT NULL DEFAULT 'professional and friendly',
    "default_language" "Language" NOT NULL DEFAULT 'MANGLISH',
    "confidence_threshold" DOUBLE PRECISION NOT NULL DEFAULT 0.7,
    "success_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "total_conversations" INTEGER NOT NULL DEFAULT 0,
    "total_feedback" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeBase" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "keywords" JSONB NOT NULL DEFAULT '[]',
    "language" "Language" NOT NULL DEFAULT 'MANGLISH',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "success_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "embedding" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "name" TEXT,
    "preferred_language" "Language" NOT NULL DEFAULT 'MANGLISH',
    "total_conversations" INTEGER NOT NULL DEFAULT 0,
    "last_contacted" TIMESTAMP(3),
    "preferences" JSONB NOT NULL DEFAULT '{}',
    "past_orders" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "status" "ConversationStatus" NOT NULL DEFAULT 'ACTIVE',
    "detected_language" "Language" NOT NULL DEFAULT 'MANGLISH',
    "current_intent" "IntentCategory",
    "context_summary" TEXT NOT NULL DEFAULT '',
    "current_node_id" TEXT,
    "workflow_variables" JSONB NOT NULL DEFAULT '{}',
    "message_count" INTEGER NOT NULL DEFAULT 0,
    "ai_handled_count" INTEGER NOT NULL DEFAULT 0,
    "human_handoff" BOOLEAN NOT NULL DEFAULT false,
    "avg_confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_message_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "detected_language" "Language" NOT NULL DEFAULT 'MANGLISH',
    "detected_intent" "IntentCategory",
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "knowledge_used" JSONB NOT NULL DEFAULT '[]',
    "response_pattern_id" TEXT,
    "workflow_node_id" TEXT,
    "feedback" "FeedbackType",
    "feedback_note" TEXT,
    "edited_content" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowNode" (
    "id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "node_type" "NodeType" NOT NULL,
    "description" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "position_x" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "position_y" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "ui_metadata" JSONB NOT NULL DEFAULT '{}',
    "next_nodes" JSONB NOT NULL DEFAULT '[]',
    "conditional_paths" JSONB NOT NULL DEFAULT '{}',
    "execution_count" INTEGER NOT NULL DEFAULT 0,
    "avg_execution_time" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "error_count" INTEGER NOT NULL DEFAULT 0,
    "feedback_score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowEdge" (
    "id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "from_node_id" TEXT NOT NULL,
    "to_node_id" TEXT NOT NULL,
    "condition" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "label" TEXT,
    "traversal_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowEdge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowExecution" (
    "id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "message_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'running',
    "current_node_id" TEXT,
    "nodes_executed" JSONB NOT NULL DEFAULT '[]',
    "execution_times" JSONB NOT NULL DEFAULT '{}',
    "variables" JSONB NOT NULL DEFAULT '{}',
    "final_output" TEXT,
    "errors" JSONB NOT NULL DEFAULT '[]',
    "total_execution_time" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "WorkflowExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "business_types" JSONB NOT NULL DEFAULT '[]',
    "template_workflow" JSONB NOT NULL,
    "required_integrations" JSONB NOT NULL DEFAULT '[]',
    "thumbnail_url" TEXT,
    "example_conversations" JSONB NOT NULL DEFAULT '[]',
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowGenerationRequest" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "user_prompt" TEXT NOT NULL,
    "business_context" JSONB NOT NULL DEFAULT '{}',
    "generated_workflow_id" TEXT,
    "generation_status" TEXT NOT NULL DEFAULT 'pending',
    "model_used" TEXT NOT NULL DEFAULT 'claude-sonnet-4-5',
    "prompt_tokens" INTEGER NOT NULL DEFAULT 0,
    "completion_tokens" INTEGER NOT NULL DEFAULT 0,
    "claude_thinking" TEXT,
    "suggested_nodes" JSONB NOT NULL DEFAULT '[]',
    "suggested_connections" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "WorkflowGenerationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowModification" (
    "id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "modification_type" TEXT NOT NULL,
    "user_id" TEXT,
    "source" TEXT NOT NULL DEFAULT 'user',
    "before_state" JSONB NOT NULL DEFAULT '{}',
    "after_state" JSONB NOT NULL DEFAULT '{}',
    "ai_suggestion_reason" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowModification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsePattern" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "workflow_id" TEXT,
    "workflow_node_id" TEXT,
    "intent" "IntentCategory" NOT NULL,
    "trigger_keywords" JSONB NOT NULL DEFAULT '[]',
    "context_required" JSONB NOT NULL DEFAULT '[]',
    "response_template" TEXT NOT NULL,
    "example_responses" JSONB NOT NULL DEFAULT '[]',
    "times_used" INTEGER NOT NULL DEFAULT 0,
    "thumbs_up" INTEGER NOT NULL DEFAULT 0,
    "thumbs_down" INTEGER NOT NULL DEFAULT 0,
    "success_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "confidence_score" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "parent_pattern_id" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used" TIMESTAMP(3),

    CONSTRAINT "ResponsePattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningEvent" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "workflow_node_id" TEXT,
    "response_pattern_id" TEXT,
    "feedback_type" "FeedbackType" NOT NULL,
    "original_response" TEXT NOT NULL,
    "edited_response" TEXT,
    "workflow_modification_id" TEXT,
    "confidence_change" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "new_pattern_created" BOOLEAN NOT NULL DEFAULT false,
    "pattern_updated" BOOLEAN NOT NULL DEFAULT false,
    "node_config_updated" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LearningEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowSuggestion" (
    "id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "suggestion_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "proposed_changes" JSONB NOT NULL DEFAULT '{}',
    "based_on_feedback_count" INTEGER NOT NULL DEFAULT 0,
    "based_on_error_pattern" TEXT,
    "expected_improvement" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "applied_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyMetrics" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "week_start" TIMESTAMP(3) NOT NULL,
    "total_conversations" INTEGER NOT NULL DEFAULT 0,
    "total_messages" INTEGER NOT NULL DEFAULT 0,
    "unique_customers" INTEGER NOT NULL DEFAULT 0,
    "success_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avg_confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "human_handoffs" INTEGER NOT NULL DEFAULT 0,
    "thumbs_up" INTEGER NOT NULL DEFAULT 0,
    "thumbs_down" INTEGER NOT NULL DEFAULT 0,
    "edits" INTEGER NOT NULL DEFAULT 0,
    "new_patterns_learned" INTEGER NOT NULL DEFAULT 0,
    "patterns_improved" INTEGER NOT NULL DEFAULT 0,
    "workflows_modified" INTEGER NOT NULL DEFAULT 0,
    "top_intents" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "WeeklyMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowMetrics" (
    "id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "time_period" TEXT NOT NULL,
    "period_start" TIMESTAMP(3) NOT NULL,
    "total_executions" INTEGER NOT NULL DEFAULT 0,
    "successful_executions" INTEGER NOT NULL DEFAULT 0,
    "failed_executions" INTEGER NOT NULL DEFAULT 0,
    "avg_execution_time" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "thumbs_up" INTEGER NOT NULL DEFAULT 0,
    "thumbs_down" INTEGER NOT NULL DEFAULT 0,
    "satisfaction_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "slowest_nodes" JSONB NOT NULL DEFAULT '[]',
    "error_prone_nodes" JSONB NOT NULL DEFAULT '[]',
    "improvements_applied" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WorkflowMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "used_in_workflows" JSONB NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_tested" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowNode" ADD CONSTRAINT "WorkflowNode_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowEdge" ADD CONSTRAINT "WorkflowEdge_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowExecution" ADD CONSTRAINT "WorkflowExecution_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowGenerationRequest" ADD CONSTRAINT "WorkflowGenerationRequest_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowModification" ADD CONSTRAINT "WorkflowModification_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsePattern" ADD CONSTRAINT "ResponsePattern_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsePattern" ADD CONSTRAINT "ResponsePattern_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsePattern" ADD CONSTRAINT "ResponsePattern_workflow_node_id_fkey" FOREIGN KEY ("workflow_node_id") REFERENCES "WorkflowNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningEvent" ADD CONSTRAINT "LearningEvent_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningEvent" ADD CONSTRAINT "LearningEvent_workflow_node_id_fkey" FOREIGN KEY ("workflow_node_id") REFERENCES "WorkflowNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningEvent" ADD CONSTRAINT "LearningEvent_response_pattern_id_fkey" FOREIGN KEY ("response_pattern_id") REFERENCES "ResponsePattern"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowSuggestion" ADD CONSTRAINT "WorkflowSuggestion_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowSuggestion" ADD CONSTRAINT "WorkflowSuggestion_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyMetrics" ADD CONSTRAINT "WeeklyMetrics_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowMetrics" ADD CONSTRAINT "WorkflowMetrics_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
