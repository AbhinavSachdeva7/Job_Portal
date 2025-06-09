CREATE TYPE user_status AS ENUM ( 'Active', 'Inactive', 'PendingProfile', 'Suspended', 'Deleted');
CREATE TYPE user_role AS ENUM ('candidate', 'recruiter', 'admin');
CREATE TYPE job_status AS ENUM ('active', 'closed', 'draft');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected');


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'candidate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status user_status
);

CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255),
    company VARCHAR(255),
    description TEXT[],
    location VARCHAR(255),
    pay VARCHAR(255),
    status job_status DEFAULT 'active'
);

-- User Profile Table (for candidates)
CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    phone_number VARCHAR(20),
    address TEXT,
    education TEXT,
    experience TEXT,
    skills TEXT[],
    resume_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Applications Table
CREATE TABLE job_applications (
    application_id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(job_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    status application_status DEFAULT 'PendingProfile',  -- Pending, Accepted, Rejected
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, user_id)  -- Prevent multiple applications
);

-- Companies Table (for job posters)
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Add these indexes for better query performance
CREATE INDEX idx_jobs_user_id ON jobs (user_id);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_companies_user_id ON companies(user_id);