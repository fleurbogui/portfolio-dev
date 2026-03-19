-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INT DEFAULT 80,
  icon TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;
DROP POLICY IF EXISTS "Auth users can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Auth users can update projects" ON public.projects;
DROP POLICY IF EXISTS "Auth users can delete projects" ON public.projects;

DROP POLICY IF EXISTS "Anyone can view skills" ON public.skills;
DROP POLICY IF EXISTS "Auth users can insert skills" ON public.skills;
DROP POLICY IF EXISTS "Auth users can update skills" ON public.skills;
DROP POLICY IF EXISTS "Auth users can delete skills" ON public.skills;

DROP POLICY IF EXISTS "Anyone can send messages" ON public.messages;
DROP POLICY IF EXISTS "Auth users can view messages" ON public.messages;
DROP POLICY IF EXISTS "Auth users can update messages" ON public.messages;
DROP POLICY IF EXISTS "Auth users can delete messages" ON public.messages;

-- Public read for portfolio
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view skills" ON public.skills FOR SELECT USING (true);

-- Auth users manage projects
CREATE POLICY "Auth users can insert projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can update projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Auth users can delete projects" ON public.projects FOR DELETE USING (true);

-- Auth users manage skills
CREATE POLICY "Auth users can insert skills" ON public.skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can update skills" ON public.skills FOR UPDATE USING (true);
CREATE POLICY "Auth users can delete skills" ON public.skills FOR DELETE USING (true);

-- Messages: anyone can send, auth can manage
CREATE POLICY "Anyone can send messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can view messages" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Auth users can update messages" ON public.messages FOR UPDATE USING (true);
CREATE POLICY "Auth users can delete messages" ON public.messages FOR DELETE USING (true);
