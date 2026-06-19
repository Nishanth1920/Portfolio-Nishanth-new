-- Run this SQL in your Supabase SQL Editor

-- Existing tables
CREATE TABLE IF NOT EXISTS personal_info (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Nishanth M',
  title TEXT NOT NULL DEFAULT 'Software Engineer',
  avatar_url TEXT DEFAULT 'https://avatars.githubusercontent.com/u/121602108?v=4',
  tagline TEXT DEFAULT 'Code is my tool. Solving problems is my craft.',
  bio TEXT[] DEFAULT '{}',
  location TEXT DEFAULT '',
  email TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  github TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  twitter TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'backend',
  level INTEGER NOT NULL DEFAULT 80,
  "order" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL DEFAULT '',
  description TEXT[] DEFAULT '{}',
  tech TEXT[] DEFAULT '{}',
  "order" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  tech TEXT[] DEFAULT '{}',
  live_url TEXT DEFAULT '#',
  github_url TEXT DEFAULT '#',
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0
);

-- New: site_texts for all editable text content
CREATE TABLE IF NOT EXISTS site_texts (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  type TEXT DEFAULT 'text',
  UNIQUE(section, key)
);

-- Seed personal info
INSERT INTO personal_info (name, title, tagline, email, github, linkedin, location)
VALUES (
  'Nishanth M',
  'Software Engineer',
  'Code is my tool. Solving problems is my craft.',
  'nicknishanth100@gmail.com',
  'https://github.com/Nishanth1920',
  'https://linkedin.com/in/nishanth-m-3a39112b5',
  'Kanyakumari, India'
) ON CONFLICT (id) DO NOTHING;

-- Seed site texts (all hardcoded text from components)
INSERT INTO site_texts (section, key, value, type) VALUES
-- Navbar
('navbar', 'links', '[{"label":"Home","href":"#hero"},{"label":"About","href":"#about"},{"label":"Skills","href":"#skills"},{"label":"Work","href":"#experience"},{"label":"Projects","href":"#projects"},{"label":"Contact","href":"#contact"}]', 'list'),

-- Hero
('hero', 'marquee_items', '["API Integration","System Design","Product Building","Workflow Automation","Scalable Architecture","Payment Integrations","Database Optimization","SaaS Development","Performance Engineering"]', 'list'),
('hero', 'stats', '[{"label":"Yrs Exp","value":"4+"},{"label":"Projects","value":"15+"},{"label":"Clients","value":"20+"}]', 'list'),
('hero', 'view_work_btn', 'View My Work', 'text'),
('hero', 'get_in_touch_btn', 'Get in Touch', 'text'),

-- About
('about', 'label', 'About Me', 'text'),
('about', 'title', 'Turning complex problems into elegant scalable solutions', 'text'),
('about', 'highlights', '[{"title":"Clean Architecture","desc":"Writing maintainable, scalable code that stands up to production demands."},{"title":"Performance First","desc":"Optimized for speed with sub-100ms response times and best-in-class Lighthouse scores."},{"title":"End to End Delivery","desc":"From concept to deployment — owning the full lifecycle of every project."}]', 'list'),
('about', 'resume_btn', 'Download Resume', 'text'),
('about', 'linkedin_btn', 'LinkedIn', 'text'),
('about', 'side_text', 'Transforming ideas into scalable software solutions.', 'text'),

-- Skills
('skills', 'label', 'Expertise', 'text'),
('skills', 'title', 'Technical proficiency', 'text'),

-- Experience
('experience', 'label', 'Experience', 'text'),
('experience', 'title', 'Where I''ve worked', 'text'),
('experience', 'subtitle', 'A track record of delivering impact across diverse teams and technologies.', 'text'),

-- Projects
('projects', 'label', 'Projects', 'text'),
('projects', 'title', 'Featured work', 'text'),
('projects', 'subtitle', 'Real-world projects showcasing architecture, performance, and user experience.', 'text'),

-- Contact
('contact', 'label', 'Contact', 'text'),
('contact', 'title', 'Let''s work together', 'text'),
('contact', 'subtitle', 'Have a project in mind? I''d love to hear about it. Send me a message and I''ll get back to you promptly.', 'text'),
('contact', 'info_heading', 'Contact Information', 'text'),

-- Footer
('footer', 'copyright', '© All rights reserved.', 'text'),

-- Colors (dark theme)
('colors', 'dark_accent_primary', '#6366f1', 'color'),
('colors', 'dark_accent_secondary', '#06b6d4', 'color'),
('colors', 'dark_accent_tertiary', '#8b5cf6', 'color'),

-- Colors (light theme)
('colors', 'light_accent_primary', '#4f46e5', 'color'),
('colors', 'light_accent_secondary', '#0891b2', 'color'),
('colors', 'light_accent_tertiary', '#7c3aed', 'color')
ON CONFLICT (section, key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_texts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first (safe to re-run)
DROP POLICY IF EXISTS "Allow public read" ON personal_info;
DROP POLICY IF EXISTS "Allow public read" ON skills;
DROP POLICY IF EXISTS "Allow public read" ON experiences;
DROP POLICY IF EXISTS "Allow public read" ON projects;
DROP POLICY IF EXISTS "Allow public read" ON site_texts;
DROP POLICY IF EXISTS "Allow authenticated all" ON personal_info;
DROP POLICY IF EXISTS "Allow authenticated all" ON skills;
DROP POLICY IF EXISTS "Allow authenticated all" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated all" ON projects;
DROP POLICY IF EXISTS "Allow authenticated all" ON site_texts;

-- Allow public read access
CREATE POLICY "Allow public read" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON site_texts FOR SELECT USING (true);

-- Allow authenticated users full access
CREATE POLICY "Allow authenticated all" ON personal_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated all" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated all" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated all" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated all" ON site_texts FOR ALL USING (auth.role() = 'authenticated');
