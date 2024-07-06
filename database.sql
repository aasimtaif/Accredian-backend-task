CREATE TABLE "User" (
    "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "number" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "coins" DECIMAL DEFAULT 0,
    "referral" VARCHAR(255) UNIQUE DEFAULT "",
    "purchaseList" TEXT,
    "notifications" TEXT
);

CREATE TABLE "PurchaseItem" (
    "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    "courseId" INT NOT NULL,
    "price" DECIMAL NOT NULL,
    "usedReferral" VARCHAR(255) DEFAULT "",
    "userId" INT NOT NULL,
    "Timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("courseId") REFERENCES "Course" ("id"),
    FOREIGN KEY ("userId") REFERENCES "User" ("id")
);

CREATE TABLE "Course" (
    "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL NOT NULL,
    "referralDiscount" DECIMAL NOT NULL
);

CREATE TABLE "Notification" (
    "id" INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    "seen" BOOLEAN DEFAULT FALSE,
    "opened" BOOLEAN DEFAULT FALSE,
    "message" TEXT,
    "userId" INT NOT NULL,
    "TimeStamp" DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User" ("id")
);