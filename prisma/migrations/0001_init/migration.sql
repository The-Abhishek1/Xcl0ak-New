-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Exploit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT,
    "language" TEXT NOT NULL DEFAULT 'other',
    "type" TEXT NOT NULL,
    "os" TEXT[],
    "cveId" TEXT,
    "authorAlias" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "difficulty" TEXT NOT NULL DEFAULT 'intermediate',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "dnaRisk" DOUBLE PRECISION,
    "dnaPayload" TEXT,
    "fileUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reviewNote" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exploit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExploitVote" (
    "id" TEXT NOT NULL,
    "exploitId" TEXT NOT NULL,
    "userAlias" TEXT NOT NULL,
    "direction" TEXT NOT NULL,

    CONSTRAINT "ExploitVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "exploitId" TEXT NOT NULL,
    "parentId" TEXT,
    "authorAlias" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVECache" (
    "id" TEXT NOT NULL,
    "cveId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cvssScore" DOUBLE PRECISION NOT NULL,
    "cvssVector" TEXT,
    "severity" TEXT NOT NULL,
    "vendor" TEXT,
    "product" TEXT,
    "affectedVersions" TEXT[],
    "patchAvailable" BOOLEAN NOT NULL DEFAULT false,
    "exploitableNow" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CVECache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreatEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "srcCountry" TEXT NOT NULL,
    "dstCountry" TEXT NOT NULL,
    "srcLat" DOUBLE PRECISION NOT NULL,
    "srcLng" DOUBLE PRECISION NOT NULL,
    "dstLat" DOUBLE PRECISION NOT NULL,
    "dstLng" DOUBLE PRECISION NOT NULL,
    "severity" INTEGER NOT NULL,
    "details" TEXT,
    "sourceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThreatEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "country" TEXT,
    "summary" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "fp" TEXT NOT NULL,
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "badges" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CTFChallenge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "description" TEXT NOT NULL,
    "flagHash" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "fileUrl" TEXT,
    "hints" TEXT[],
    "expiresAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "authorAlias" TEXT NOT NULL DEFAULT 'anonymous',
    "reviewNote" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CTFChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CTFSolve" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "userAlias" TEXT NOT NULL,
    "solvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CTFSolve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'free',
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'message',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userAlias" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exploit_slug_key" ON "Exploit"("slug");

-- CreateIndex
CREATE INDEX "Exploit_status_idx" ON "Exploit"("status");

-- CreateIndex
CREATE INDEX "Exploit_score_idx" ON "Exploit"("score" DESC);

-- CreateIndex
CREATE INDEX "Exploit_type_idx" ON "Exploit"("type");

-- CreateIndex
CREATE INDEX "Exploit_cveId_idx" ON "Exploit"("cveId");

-- CreateIndex
CREATE UNIQUE INDEX "ExploitVote_exploitId_userAlias_key" ON "ExploitVote"("exploitId", "userAlias");

-- CreateIndex
CREATE UNIQUE INDEX "CVECache_cveId_key" ON "CVECache"("cveId");

-- CreateIndex
CREATE INDEX "CVECache_severity_idx" ON "CVECache"("severity");

-- CreateIndex
CREATE INDEX "CVECache_cvssScore_idx" ON "CVECache"("cvssScore" DESC);

-- CreateIndex
CREATE INDEX "ThreatEvent_createdAt_idx" ON "ThreatEvent"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "NewsArticle_url_key" ON "NewsArticle"("url");

-- CreateIndex
CREATE INDEX "NewsArticle_publishedAt_idx" ON "NewsArticle"("publishedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "User_alias_key" ON "User"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "User_fp_key" ON "User"("fp");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_alias_key" ON "AdminUser"("alias");

-- CreateIndex
CREATE INDEX "CTFChallenge_status_idx" ON "CTFChallenge"("status");

-- CreateIndex
CREATE UNIQUE INDEX "CTFSolve_challengeId_userAlias_key" ON "CTFSolve"("challengeId", "userAlias");

-- CreateIndex
CREATE INDEX "ChatMessage_room_createdAt_idx" ON "ChatMessage"("room", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Notification_userAlias_createdAt_idx" ON "Notification"("userAlias", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Notification_userAlias_read_idx" ON "Notification"("userAlias", "read");

-- AddForeignKey
ALTER TABLE "ExploitVote" ADD CONSTRAINT "ExploitVote_exploitId_fkey" FOREIGN KEY ("exploitId") REFERENCES "Exploit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_exploitId_fkey" FOREIGN KEY ("exploitId") REFERENCES "Exploit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CTFSolve" ADD CONSTRAINT "CTFSolve_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "CTFChallenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

