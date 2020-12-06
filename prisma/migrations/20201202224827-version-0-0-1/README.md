# Migration `20201202224827-version-0-0-1`

This migration has been generated at 12/2/2020, 10:48:27 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `AuthUser` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) DEFAULT '',
    `active` BOOLEAN NOT NULL DEFAULT false,
    `code` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('REGISTERED', 'USER', 'ADMIN', 'MASTER') NOT NULL DEFAULT 'REGISTERED',
UNIQUE INDEX `AuthUser.username_unique`(`username`),
UNIQUE INDEX `AuthUser.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201202224827-version-0-0-1
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,29 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+enum AuthRole {
+  REGISTERED
+  USER
+  ADMIN
+  MASTER
+}
+
+model AuthUser {
+  id                Int @id                   @default(autoincrement())
+  username          String                    @unique()
+  email             String                    @unique()
+  password          String?                   @default("")
+  active            Boolean                   @default(false)
+  code              String                    @default("")
+  createdAt         DateTime                  @default(now())
+  role              AuthRole                  @default(REGISTERED)
+}
```


