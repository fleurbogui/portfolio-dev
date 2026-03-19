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
  level INT DEFAULT 80 CHECK (level >= 0 AND level <= 100),
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

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public read access for projects and skills (portfolio is public)
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view skills" ON public.skills FOR SELECT USING (true);

-- Only authenticated users can manage projects
CREATE POLICY "Auth users can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update projects" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete projects" ON public.projects FOR DELETE TO authenticated USING (true);

-- Only authenticated users can manage skills
CREATE POLICY "Auth users can insert skills" ON public.skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update skills" ON public.skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete skills" ON public.skills FOR DELETE TO authenticated USING (true);

-- Anyone can insert messages (contact form) but only auth users can read/manage
CREATE POLICY "Anyone can send messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can view messages" ON public.messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth users can update messages" ON public.messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete messages" ON public.messages FOR DELETE TO authenticated USING (true);
