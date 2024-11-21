-- Create resume_versions table
CREATE TABLE resume_versions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    job_description TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS (Row Level Security) policies
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own resume versions
CREATE POLICY "Users can view their own resumes"
    ON resume_versions
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own resume versions
CREATE POLICY "Users can create their own resumes"
    ON resume_versions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own resume versions
CREATE POLICY "Users can update their own resumes"
    ON resume_versions
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own resume versions
CREATE POLICY "Users can delete their own resumes"
    ON resume_versions
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resume_versions_updated_at
    BEFORE UPDATE
    ON resume_versions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
