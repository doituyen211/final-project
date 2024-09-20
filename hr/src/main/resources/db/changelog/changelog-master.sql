-- liquibase formatted sql

-- changeset department:1
CREATE TABLE department
(
    id              SERIAL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    "description"   VARCHAR(255),
    "status"        BIT,
    create_at       TIMESTAMP,
    update_at       TIMESTAMP
);

-- changeset position:1
CREATE TABLE "position"
(
    id            SERIAL PRIMARY KEY,
    "status"      SMALLINT,
    position_name VARCHAR(255) NOT NULL,
    create_at     TIMESTAMP,
    update_at     TIMESTAMP,
    department_id INTEGER      NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id)
);

-- changeset employee:1
CREATE TABLE employee
(
    id            SERIAL PRIMARY KEY,
    employee_code VARCHAR(20) NOT NULL,
    employee_name VARCHAR(50),
    date_of_birth TIMESTAMP,
    gender        SMALLINT,
    citizen_id    VARCHAR(50),
    address       VARCHAR(255),
    email         VARCHAR(50),
    "password"    VARCHAR(255),
    phone_number  VARCHAR(50),
    image         VARCHAR(255),
    "status"      SMALLINT,
    create_at     TIMESTAMP,
    update_at     TIMESTAMP,
    position_id   INTEGER     NOT NULL,
    department_id INTEGER     NOT NULL,
    FOREIGN KEY (position_id) REFERENCES "position" (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

-- changeset role:1
CREATE TABLE role
(
    role_id   SERIAL PRIMARY KEY,
    role_code VARCHAR(50) NOT NULL,
    "status"  SMALLINT
);

-- changeset employee_role:1
CREATE TABLE employee_role
(
    employee_id INTEGER NOT NULL,
    role_id     INTEGER NOT NULL,
    PRIMARY KEY (employee_id, role_id),
    FOREIGN KEY (employee_id) REFERENCES employee (id),
    FOREIGN KEY (role_id) REFERENCES role (role_id)
);

-- changeset contract:1
CREATE TABLE contract
(
    id                SERIAL PRIMARY KEY,
    contract_code     VARCHAR(20) NOT NULL,
    contract_category VARCHAR(50),
    content_contract  VARCHAR(255),
    salary            FLOAT(4),
    date_start        TIMESTAMP,
    date_end          TIMESTAMP,
    "status"          SMALLINT,
    create_at         TIMESTAMP,
    update_at         TIMESTAMP,
    employee_id       INTEGER     NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

-- changeset insurance:1
CREATE TABLE insurance
(
    id                 SERIAL PRIMARY KEY,
    insurance_number   VARCHAR(50)  NOT NULL,
    insurance_category VARCHAR(10)  NOT NULL,
    provider_address   VARCHAR(255) NOT NULL,
    provider_date      TIMESTAMP,
    expiry_date        TIMESTAMP,
    clinic             VARCHAR(255),
    "status"           BIT,
    create_at          TIMESTAMP,
    update_at          TIMESTAMP,
    employee_id        INTEGER      NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

-- changeset qualification:1
CREATE TABLE qualification
(
    id                 SERIAL PRIMARY KEY,
    qualification_name VARCHAR(50) NOT NULL,
    expiry_date        TIMESTAMP,
    "status"           SMALLINT,
    create_at          TIMESTAMP,
    update_at          TIMESTAMP,
    employee_id        INTEGER     NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

-- changeset allowance:1
CREATE TABLE allowance
(
    id                 SERIAL PRIMARY KEY,
    allowance_category VARCHAR(50) NOT NULL,
    allowance_salary   FLOAT(4)    NOT NULL,
    "status"           SMALLINT,
    create_at          TIMESTAMP,
    update_at          TIMESTAMP,
    position_id        INTEGER     NOT NULL,
    FOREIGN KEY (position_id) REFERENCES "position" (id)
);

-- changeset salary:1
CREATE TABLE salary
(
    id                   SERIAL PRIMARY KEY,
    contract_id          INTEGER  NOT NULL,
    overtime_id          INTEGER  NOT NULL,
    allowance_id         INTEGER  NOT NULL,
    salary_advance_id    INTEGER  NOT NULL,
    reward_discipline_id INTEGER  NOT NULL,
    time_off_id          INTEGER  NOT NULL,
    salary               FLOAT(4) NOT NULL,
    "status"             SMALLINT,
    create_at            TIMESTAMP,
    update_at            TIMESTAMP,
    employee_id          INTEGER  NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

-- changeset holiday:1
CREATE TABLE holiday
(
    id           SERIAL PRIMARY KEY,
    holiday_date TIMESTAMP NOT NULL,
    "status"     SMALLINT,
    create_at    TIMESTAMP,
    update_at    TIMESTAMP
);

-- changeset time_tracking:1
CREATE TABLE time_tracking
(
    id                 SERIAL PRIMARY KEY,
    time_tracking_date TIMESTAMP NOT NULL,
    salary_id          INTEGER   NOT NULL,
    holiday_id         INTEGER   NOT NULL,
    time_in            TIME      NOT NULL,
    "time_out"         TIME      NOT NULL,
    "status"           SMALLINT,
    create_at          TIMESTAMP,
    update_at          TIMESTAMP,
    employee_id        INTEGER   NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id),
    FOREIGN KEY (holiday_id) REFERENCES holiday (id)
);

-- changeset overtime:1
CREATE TABLE overtime
(
    id              SERIAL PRIMARY KEY,
    overtime_date   TIMESTAMP NOT NULL,
    hours           FLOAT(4),
    overtime_salary FLOAT(4),
    multiplier      FLOAT(4),
    "status"        SMALLINT,
    create_at       TIMESTAMP,
    update_at       TIMESTAMP,
    employee_id     INTEGER   NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

-- changeset salary_advance:1
CREATE TABLE salary_advance
(
    id                  SERIAL PRIMARY KEY,
    salary_advance_date TIMESTAMP NOT NULL,
    money               FLOAT(4),
    "status"            SMALLINT,
    create_at           TIMESTAMP,
    update_at           TIMESTAMP,
    employee_id         INTEGER   NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

-- changeset time_off:1
CREATE TABLE time_off
(
    id          SERIAL PRIMARY KEY,
    date_start  TIMESTAMP,
    date_end    TIMESTAMP,
    day_number  INTEGER,
    "status"    SMALLINT,
    create_at   TIMESTAMP,
    update_at   TIMESTAMP,
    employee_id INTEGER NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

-- changeset reward_discipline:1
CREATE TABLE reward_discipline
(
    id            SERIAL PRIMARY KEY,
    content       TEXT      NOT NULL,
    decision_date TIMESTAMP NOT NULL,
    money         FLOAT(4),
    category      VARCHAR(50),
    "status"      SMALLINT,
    create_at     TIMESTAMP,
    update_at     TIMESTAMP,
    salary_id     INTEGER   NOT NULL,
    FOREIGN KEY (salary_id) REFERENCES salary (id)
);

-- changeset work_process:1
CREATE TABLE work_process
(
    id                   SERIAL PRIMARY KEY,
    time_off             INTEGER   NOT NULL,
    work_date            TIMESTAMP NOT NULL,
    "status"             SMALLINT,
    create_at            TIMESTAMP,
    update_at            TIMESTAMP,
    employee_id          INTEGER   NOT NULL,
    reward_discipline_id INTEGER   NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee (id),
    FOREIGN KEY (reward_discipline_id) REFERENCES reward_discipline (id)
);
-- changeset contract:2
ALTER TABLE contract
    ALTER COLUMN content_contract TYPE TEXT;
-- changeset qualification:2
ALTER TABLE qualification
    ADD COLUMN image VARCHAR(255);

-- changeset reward_discipline:3
ALTER TABLE reward_discipline
    ADD COLUMN IF NOT EXISTS rd_images VARCHAR(255);

-- changeset salary:4
ALTER TABLE salary ALTER COLUMN contract_id DROP NOT NULL;
-- changeset reward_discipline:5
ALTER TABLE salary ALTER COLUMN overtime_id DROP NOT NULL;
ALTER TABLE salary ALTER COLUMN allowance_id DROP NOT NULL;
ALTER TABLE salary ALTER COLUMN salary_advance_id DROP NOT NULL;
ALTER TABLE salary ALTER COLUMN reward_discipline_id DROP NOT NULL;
ALTER TABLE salary ALTER COLUMN time_off_id DROP NOT NULL;