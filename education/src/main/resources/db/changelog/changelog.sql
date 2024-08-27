--liquibase formatted sql
CREATE TABLE "Subject" (
                           subject_id INT PRIMARY KEY,
                           subject_name VARCHAR(255),
                           status INT,
                           training_duration INT,
                           training_program_id INT
);
--changeset namlh:1
-- Create tables in the new database
CREATE TABLE "Student" (
                           "student_id" SERIAL PRIMARY KEY,
                           "full_name" TEXT,
                           "date_of_birth" DATE,
                           "address" TEXT,
                           "email" TEXT,
                           "phone_number" VARCHAR(20),
                           "password" TEXT,
                           "source" TEXT,
                           "campaign_id" INTEGER,
                           "facebook_link" TEXT,
                           "note" TEXT,
                           "learning_goal" TEXT,
                           "program_id" INTEGER
);

CREATE TABLE "Course" (
                          "course_id" SERIAL PRIMARY KEY,
                          "course_name" TEXT
);

CREATE TABLE "Training_Program" (
                                    "program_id" SERIAL PRIMARY KEY,
                                    "program_name" TEXT,
                                    "course_id" INTEGER,
                                    "tuition_fee" INTEGER,
                                    "status" BOOLEAN,
                                    "training_duration" INTEGER
);

DROP TABLE IF EXISTS "Subject";

CREATE TABLE "Subject" (
                           "subject_id" SERIAL PRIMARY KEY,
                           "subject_name" TEXT,
                           "status" INTEGER,
                           "training_duration" INTEGER,
                           "training_program_id" INTEGER
);

CREATE TABLE "Class" (
                         "class_id" SERIAL PRIMARY KEY,
                         "class_name" TEXT,
                         "class_size" INTEGER,
                         "program_id" INTEGER,
                         "start_date" DATE,
                         "end_date" DATE
);

CREATE TABLE "Class_Member" (
                                "id" SERIAL PRIMARY KEY,
                                "student_id" INTEGER,
                                "class_id" INTEGER,
                                "status" TEXT
);

CREATE TABLE "Attendance" (
                              "id" SERIAL PRIMARY KEY,
                              "class_id" INTEGER,
                              "student_id" INTEGER,
                              "attendance_date" DATE,
                              "status" TEXT,
                              "note" TEXT,
                              "staff_id" INTEGER,
                              "subject_id" INTEGER
);

CREATE TABLE "Class_Schedule" (
                                  "id" SERIAL PRIMARY KEY,
                                  "subject_id" INTEGER,
                                  "time" TEXT,
                                  "start_time" DATE,
                                  "end_time" DATE,
                                  "class_id" INTEGER,
                                  "classroom" TEXT,
                                  "staff_id" INTEGER
);

CREATE TABLE "Exam_Schedule" (
                                 "id" SERIAL PRIMARY KEY,
                                 "subject_id" INTEGER,
                                 "class_id" INTEGER,
                                 "exam_date" DATE,
                                 "exam_link" TEXT
);

CREATE TABLE "Grades" (
                          "id" SERIAL PRIMARY KEY,
                          "student_id" INTEGER,
                          "exam_schedule_id" INTEGER,
                          "grade" INTEGER,
                          "status" TEXT
);

CREATE TABLE "Student_Status" (
                                  "id" SERIAL PRIMARY KEY,
                                  "status" TEXT
);

CREATE TABLE "Leave_of_Absence" (
                                    "id" SERIAL PRIMARY KEY,
                                    "student_id" INTEGER,
                                    "start_date" DATE,
                                    "end_date" DATE,
                                    "status" INTEGER,
                                    "subject_id" INTEGER
);

CREATE TABLE "Campaign" (
                            "campaign_id" SERIAL PRIMARY KEY,
                            "campaign_name" TEXT,
                            "start_date" DATE,
                            "end_date" DATE
);

CREATE TABLE "Care_History" (
                                "id" SERIAL PRIMARY KEY,
                                "student_id" INTEGER,
                                "staff_id" INTEGER,
                                "update_time" TIMESTAMP,
                                "note" TEXT,
                                "status_id" INTEGER
);

CREATE TABLE "Tuition" (
                           "id" SERIAL PRIMARY KEY,
                           "student_id" INTEGER,
                           "program_id" INTEGER,
                           "amount" DOUBLE PRECISION,
                           "payment_method" TEXT,
                           "payment_date" DATE,
                           "status" INTEGER,
                           "note" TEXT
);

CREATE TABLE "Debt" (
                        "id" SERIAL PRIMARY KEY,
                        "tuition_id" INTEGER,
                        "remaining_amount" DOUBLE PRECISION,
                        "next_payment_date" DATE,
                        "staff_id" INTEGER
);

-- Add indexes where necessary
CREATE INDEX idx_student_id ON "Class_Member" ("student_id");

CREATE INDEX idx_program_id ON "Class" ("program_id");

CREATE INDEX idx_class_id ON "Attendance" ("class_id");

CREATE INDEX idx_student_id_attendance ON "Attendance" ("student_id");

CREATE INDEX idx_subject_id_class_schedule ON "Class_Schedule" ("subject_id");

CREATE INDEX idx_class_id_class_schedule ON "Class_Schedule" ("class_id");

CREATE INDEX idx_subject_id_exam_schedule ON "Exam_Schedule" ("subject_id");

CREATE INDEX idx_class_id_exam_schedule ON "Exam_Schedule" ("class_id");

CREATE INDEX idx_student_id_grades ON "Grades" ("student_id");

CREATE INDEX idx_exam_schedule_id_grades ON "Grades" ("exam_schedule_id");
-- Add foreign key constraints
ALTER TABLE "Training_Program"
    ADD CONSTRAINT fk_course_id
        FOREIGN KEY ("course_id") REFERENCES "Course" ("course_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Class"
    ADD CONSTRAINT fk_program_id
        FOREIGN KEY ("program_id") REFERENCES "Training_Program" ("program_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Class_Member"
    ADD CONSTRAINT fk_student_id
        FOREIGN KEY ("student_id") REFERENCES "Student" ("student_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Attendance"
    ADD CONSTRAINT fk_class_id
        FOREIGN KEY ("class_id") REFERENCES "Class" ("class_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Attendance"
    ADD CONSTRAINT fk_student_id_attendance
        FOREIGN KEY ("student_id") REFERENCES "Student" ("student_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Class_Schedule"
    ADD CONSTRAINT fk_subject_id_class_schedule
        FOREIGN KEY ("subject_id") REFERENCES "Subject" ("subject_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Class_Schedule"
    ADD CONSTRAINT fk_class_id_class_schedule
        FOREIGN KEY ("class_id") REFERENCES "Class" ("class_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Exam_Schedule"
    ADD CONSTRAINT fk_subject_id_exam_schedule
        FOREIGN KEY ("subject_id") REFERENCES "Subject" ("subject_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Exam_Schedule"
    ADD CONSTRAINT fk_class_id_exam_schedule
        FOREIGN KEY ("class_id") REFERENCES "Class" ("class_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Grades"
    ADD CONSTRAINT fk_student_id_grades
        FOREIGN KEY ("student_id") REFERENCES "Student" ("student_id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "Grades"
    ADD CONSTRAINT fk_exam_schedule_id_grades
        FOREIGN KEY ("exam_schedule_id") REFERENCES "Exam_Schedule" ("id")
            ON UPDATE NO ACTION ON DELETE NO ACTION;

INSERT INTO "Student" ("student_id", "full_name", "date_of_birth", "address", "email", "phone_number", "password", "source", "campaign_id", "facebook_link", "note", "learning_goal", "program_id")
VALUES
    (1, 'Nguyen Van A', '1990-01-01', '123 Example St, Hanoi', 'nguyenvana@example.com', '0123456789', 'password123', 'Online', 1, 'facebook.com/nguyenvana', 'Note for A', 'Learning programming', 101),
    (2, 'Le Thi B', '1992-02-02', '456 Sample Ave, Ho Chi Minh City', 'lethib@example.com', '0987654321', 'password456', 'Offline', 2, 'facebook.com/lethib', 'Note for B', 'Career advancement', 102);

INSERT INTO "Course" ("course_id", "course_name")
VALUES
    (1, '2024'),
    (2, '2025');

INSERT INTO "Training_Program" ("program_id", "program_name", "course_id", "tuition_fee", "status", "training_duration")
VALUES
    (1, 'Full Stack Development', 1, 10000, TRUE, 6),
    (2, 'Data Science', 2, 12000, TRUE, 6);

INSERT INTO "Subject" ("subject_id", "subject_name", "status", "training_duration", "training_program_id")
VALUES
    (1, 'Programming Fundamentals', 1, 60, 1),
    (2, 'Advanced Data Analysis', 1, 60, 2),
    (3, 'Database Systems', 1, 45, 1),
    (4, 'Web Development Basics', 1, 30, 3),
    (5, 'Machine Learning', 1, 90, 4),
    (6, 'Artificial Intelligence', 1, 75, 4),
    (7, 'Network Security', 1, 60, 2),
    (8, 'Cloud Computing', 1, 45, 3),
    (9, 'Software Engineering', 1, 90, 1),
    (10, 'Human-Computer Interaction', 1, 60, 2),
    (11, 'Cybersecurity Fundamentals', 1, 60, 2),
    (12, 'Digital Marketing', 1, 30, 3),
    (13, 'Data Structures and Algorithms', 1, 90, 1),
    (14, 'Operating Systems', 1, 45, 1),
    (15, 'Computer Networks', 1, 75, 2),
    (16, 'Mobile App Development', 1, 90, 3),
    (17, 'Cloud Services', 1, 60, 3),
    (18, 'Big Data Analytics', 1, 90, 4),
    (19, 'Ethical Hacking', 1, 60, 2),
    (20, 'Web Security', 1, 45, 2),
    (21, 'Blockchain Technology', 1, 75, 4),
    (22, 'DevOps Practices', 1, 60, 3),
    (23, 'AI in Healthcare', 1, 90, 4),
    (24, 'Software Testing', 1, 45, 1),
    (25, 'Data Science', 1, 90, 4),
    (26, 'Computer Vision', 1, 75, 4),
    (27, 'Algorithm Design', 1, 60, 1),
    (28, 'UI/UX Design', 1, 30, 3),
    (29, 'Database Administration', 1, 60, 1),
    (30, 'Systems Analysis', 1, 45, 2),
    (31, 'Information Retrieval', 1, 75, 4),
    (32, 'Game Development', 1, 90, 3),
    (33, 'Augmented Reality', 1, 60, 4),
    (34, 'Virtual Reality', 1, 75, 4),
    (35, 'Computer Graphics', 1, 90, 3),
    (36, 'Data Privacy', 1, 60, 2),
    (37, 'Software Architecture', 1, 90, 1),
    (38, 'Human-Robot Interaction', 1, 75, 4),
    (39, 'Bioinformatics', 1, 60, 4),
    (40, 'Information Systems', 1, 45, 1),
    (41, 'Network Administration', 1, 75, 2),
    (42, 'IT Project Management', 1, 60, 3),
    (43, 'Knowledge Management', 1, 90, 2),
    (44, 'E-commerce Systems', 1, 60, 3),
    (45, 'Robotics', 1, 75, 4),
    (46, 'Geographic Information Systems', 1, 60, 4),
    (47, 'Web Design', 1, 45, 3),
    (48, 'Virtual Machines', 1, 60, 1),
    (49, 'Cloud Security', 1, 75, 4),
    (50, 'Digital Forensics', 1, 90, 2);

INSERT INTO "Class" ("class_id", "class_name", "class_size", "program_id", "start_date", "end_date")
VALUES
    (1, 'Class A', 30, 1, '2024-03-01', '2024-08-31'),
    (2, 'Class B', 25, 2, '2024-04-01', '2024-09-30');


INSERT INTO "Class_Member" ("id", "student_id", "class_id", "status")
VALUES
    (1, 1, 1, 'Active'),
    (2, 2, 2, 'Active');

INSERT INTO "Attendance" ("id", "class_id", "student_id", "attendance_date", "status", "note", "staff_id", "subject_id")
VALUES
    (1, 1, 1, '2024-05-01', 'Present', 'No issues', 1, 1),
    (2, 2, 2, '2024-05-01', 'Absent', 'Sick leave', 2, 2);


INSERT INTO "Class_Schedule" ("id", "subject_id", "time", "start_time", "end_time", "class_id", "classroom", "staff_id")
VALUES
    (1, 1, '09:00-11:00', '2024-03-01', '2024-08-31', 1, 'Room 101', 1),
    (2, 2, '11:00-13:00', '2024-04-01', '2024-09-30', 2, 'Room 102', 2);


INSERT INTO "Exam_Schedule" ("id", "subject_id", "class_id", "exam_date", "exam_link")
VALUES
    (1, 1, 1, '2024-08-01', 'link_to_exam1.com'),
    (2, 2, 2, '2024-09-01', 'link_to_exam2.com');


INSERT INTO "Grades" ("id", "student_id", "exam_schedule_id", "grade", "status")
VALUES
    (1, 1, 1, 85, 'Passed'),
    (2, 2, 2, 90, 'Passed');


INSERT INTO "Student_Status" ("id", "status")
VALUES
    (1, 'Active'),
    (2, 'Inactive');


INSERT INTO "Leave_of_Absence" ("id", "student_id", "start_date", "end_date", "status", "subject_id")
VALUES
    (1, 1, '2024-06-01', '2024-07-01', 1, 1),
    (2, 2, '2024-06-01', '2024-07-01', 0, 2);


INSERT INTO "Campaign" ("campaign_id", "campaign_name", "start_date", "end_date")
VALUES
    (1, 'Summer Promotion', '2024-05-01', '2024-08-01'),
    (2, 'Winter Special', '2024-11-01', '2025-02-01');


INSERT INTO "Care_History" ("id", "student_id", "staff_id", "update_time", "note", "status_id")
VALUES
    (1, 1, 1, '2024-05-15 10:00:00', 'Follow-up call completed', 1),
    (2, 2, 2, '2024-05-15 11:00:00', 'Email sent', 1);

INSERT INTO "Tuition" ("id", "student_id", "program_id", "amount", "payment_method", "payment_date", "status", "note")
VALUES
    (1, 1, 1, 10000, 'Bank Transfer', '2024-03-15', 1, 'Paid in full'),
    (2, 2, 2, 12000, 'Credit Card', '2024-04-15', 1, 'Paid in full');


INSERT INTO "Debt" ("id", "tuition_id", "remaining_amount", "next_payment_date", "staff_id")
VALUES
    (1, 1, 0, '2024-09-01', 1),
    (2, 2, 0, '2024-10-01', 2);

--changeset namlh:2
ALTER TABLE "Student"
DROP COLUMN "password",
    ADD COLUMN "account_id" INTEGER;
CREATE TABLE "Account" (
                           "account_id" SERIAL PRIMARY KEY,
                           "username" TEXT UNIQUE,
                           "password" TEXT,
                           "role" VARCHAR(50) DEFAULT 'USER',
                           "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "Student"
    ADD CONSTRAINT fk_account_id
        FOREIGN KEY ("account_id") REFERENCES "Account" ("account_id")
            ON DELETE SET NULL ON UPDATE CASCADE;
