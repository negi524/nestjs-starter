-- CreateTable
CREATE TABLE "employee" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "language" VARCHAR(40) NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "account_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "employee_id" ON "skill"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_name" ON "account"("user_name");

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_ibfk_1" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
