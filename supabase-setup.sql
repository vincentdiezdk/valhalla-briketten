-- =============================================
-- Valhalla-Briketten: Supabase Database Setup
-- Kør dette i Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =============================================

-- 1. METRICS (singleton row, id=1)
CREATE TABLE IF NOT EXISTS metrics (
  id INTEGER PRIMARY KEY CHECK (id = 1) DEFAULT 1,
  rainwater_liters REAL DEFAULT 0,
  coffee_kg REAL DEFAULT 0,
  sawdust_kg REAL DEFAULT 0,
  paper_kg REAL DEFAULT 0,
  briquettes_produced INTEGER DEFAULT 0,
  briquettes_drying INTEGER DEFAULT 0,
  briquettes_ready INTEGER DEFAULT 0,
  scouts_involved INTEGER DEFAULT 0,
  max_temp_celsius REAL DEFAULT 0,
  fastest_boil_minutes REAL DEFAULT 0,
  longest_burn_minutes REAL DEFAULT 0,
  briquette_goal INTEGER DEFAULT 1000,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FACTS
CREATE TABLE IF NOT EXISTS facts (
  id SERIAL PRIMARY KEY,
  icon TEXT DEFAULT '☕',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  priority INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BRANCHES
CREATE TABLE IF NOT EXISTS branches (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age_group TEXT,
  role_title TEXT,
  description TEXT,
  scouts_count INTEGER DEFAULT 0,
  briquettes_count INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Nybegynder',
  icon TEXT DEFAULT '🔍',
  sort_order INTEGER DEFAULT 0
);

-- 4. PARTNERS
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  description TEXT,
  logo_url TEXT DEFAULT '',
  website_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- 5. TIMELINE EVENTS
CREATE TABLE IF NOT EXISTS timeline_events (
  id SERIAL PRIMARY KEY,
  event_date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '📌',
  completed BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0
);

-- 6. NEWS
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT,
  image_url TEXT DEFAULT '',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- 7. GAME LOGS
CREATE TABLE IF NOT EXISTS game_logs (
  id SERIAL PRIMARY KEY,
  game_type TEXT NOT NULL,
  score REAL DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SETTINGS (key-value store)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- Anon kan læse alt, men kun skrive via service_role
-- For admin-panel og Google Sheet brug: service_role key
-- =============================================

-- Enable RLS on all tables
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ for all tables (anon can SELECT)
CREATE POLICY "Public read metrics" ON metrics FOR SELECT USING (true);
CREATE POLICY "Public read facts" ON facts FOR SELECT USING (true);
CREATE POLICY "Public read branches" ON branches FOR SELECT USING (true);
CREATE POLICY "Public read partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Public read timeline" ON timeline_events FOR SELECT USING (true);
CREATE POLICY "Public read news" ON news FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

-- PUBLIC INSERT for game_logs only (visitors can log game scores)
CREATE POLICY "Public read game_logs" ON game_logs FOR SELECT USING (true);
CREATE POLICY "Public insert game_logs" ON game_logs FOR INSERT WITH CHECK (true);

-- SERVICE ROLE full access (admin panel + Google Sheet sync)
-- service_role bypasses RLS by default, so no extra policies needed

-- =============================================
-- SEED DATA
-- =============================================

-- Metrics (singleton)
INSERT INTO metrics (id, rainwater_liters, coffee_kg, sawdust_kg, paper_kg,
  briquettes_produced, briquettes_drying, briquettes_ready,
  scouts_involved, max_temp_celsius, fastest_boil_minutes,
  longest_burn_minutes, briquette_goal)
VALUES (1, 0, 0, 0, 0, 0, 0, 0, 45, 0, 0, 0, 1000)
ON CONFLICT (id) DO NOTHING;

-- Facts
INSERT INTO facts (icon, title, description, category, priority) VALUES
  ('☕', '6-15 millioner ton', 'Globalt produceres 6–15 mio. ton brugte kaffegrums om året. En stor del ender som affald.', 'global', 1),
  ('🗑️', '75% ender som affald', 'Ca. 75% af brugte kaffegrums ender på lossepladsen eller i forbrænding.', 'waste', 2),
  ('🌡️', 'Metan × 28', 'Kaffegrums på lossepladser frigiver metan – en drivhusgas 28 gange kraftigere end CO₂.', 'climate', 3),
  ('🇩🇰', '30.000+ ton i Danmark', 'Danmarks kaffeimport skaber over 30.000 ton brugt kaffegrums årligt. Meget lidt genanvendes.', 'denmark', 4),
  ('🔥', '20-30% højere brændværdi', 'Briketter med kaffegrums brænder bedre og længere end rene savsmuldsbriketter.', 'briquette', 5),
  ('♻️', '100% affaldsmaterialer', 'Alle vores råmaterialer er affald: kaffegrums, savsmuld, regnvand og genbrugspapir.', 'sustainability', 6),
  ('📋', 'Født af udviklingsplanen', 'Projektet udspringer af Valhalla-gruppens udviklingsplan med fokus på genanvendelse.', 'valhalla', 7),
  ('🏕️', 'Spejdernes Lejr 2026', 'Projektet hænger sammen med SL 2026-temaet ''Alle ind i fællesskabet'' og DDS'' bæredygtighedslinje.', 'sl2026', 8);

-- Branches
INSERT INTO branches (name, age_group, role_title, description, scouts_count, briquettes_count, level, icon, sort_order) VALUES
  ('Mikro', '6-8 år', 'Indsamler regnvand', 'Mikrospejderne samler regnvand og lærer om vandets rolle i briketproduktionen. De mærker, at naturen giver os alt, hvad vi har brug for.', 12, 0, 'Nybegynder', '🔍', 1),
  ('Mini', '8-10 år', 'Solovn', 'Minispejderne bygger og bruger solovne til at tørre briketter. De lærer om solenergi og tålmodighed.', 10, 0, 'Nybegynder', '☀️', 2),
  ('Junior', '10-12 år', 'Presser og form', 'Juniorerne er vores producenter. De står for blanding, presning og formgivning af briketter.', 14, 0, 'Nybegynder', '⚙️', 3),
  ('Trup', '12-16 år', 'Forsker i materialerne', 'Tropspejderne forsker i materialesammensætning, tester brændværdi og optimerer opskriften.', 11, 0, 'Nybegynder', '🔬', 4),
  ('Klan', '16-25 år', 'Koordinerende og PR', 'Klanen koordinerer projektet, driver PR, planlægger Spejdernes Lejr-stand og samarbejder med partnere.', 8, 0, 'Nybegynder', '🌍', 5);

-- Partners
INSERT INTO partners (name, role, description, logo_url, website_url, sort_order) VALUES
  ('BIPED / Aarhus Kommune', 'EU-projektpartner', 'EU Horizon Europe-projekt: Positive Energy Districts i Brabrand', '', 'https://www.aarhus.dk', 1),
  ('Aarhus Universitet', 'Forskningspartner', 'Studiegruppe der skriver afhandling om projektet', '', 'https://www.au.dk', 2),
  ('Brabrand Fineringscentral', 'Råmaterialeleverandør', 'Lokal leverandør af savsmuld – deres affald bliver vores råmateriale', '', '', 3),
  ('Valhalla Gruppe / DDS', 'Projektgruppe', 'Spejdergruppen bag projektet – De Danske Spejdere i Brabrand', '', 'https://valhallagruppe.dk', 4),
  ('Inspirationspartnere', 'Inspiration', 'Grounded Cups, ØNSK Kaffesymbiose m.fl.', '', '', 5);

-- Timeline Events
INSERT INTO timeline_events (event_date, title, description, icon, completed, sort_order) VALUES
  ('Februar 2026', 'Godkendelse på ASE-møde', 'Projektet blev officielt godkendt af Valhalla Gruppes ledelse og ASE-mødet.', '✅', TRUE, 1),
  ('Marts 2026', 'Fondsansøgninger & møde med BIPED/AU', 'Vi sender ansøgninger til fonde og afholder opstartsmøde med BIPED-projektet og Aarhus Universitet.', '📝', FALSE, 2),
  ('April 2026', 'Første Valhalla-briket! 🔥', 'Vi presser, tørrer og tester vores allerførste rigtige Valhalla-briket.', '🔥', FALSE, 3),
  ('Maj–juni 2026', 'Fuld produktion', 'Alle grene er i gang – vi producerer mod målet om 1000 briketter.', '⚙️', FALSE, 4),
  ('Juni 2026', 'Sankt Hans med egne briketter', 'Valhalla Gruppe fejrer Sankt Hans med bål tændt af vores egne briketter!', '🌙', FALSE, 5),
  ('Juli 2026', 'Spejdernes Lejr 2026 + stand', 'Vi præsenterer projektet på Spejdernes Lejr 2026 og viser verden, hvad Valhalla Gruppe kan.', '🏕️', FALSE, 6);

-- News
INSERT INTO news (title, slug, content, image_url, published_at) VALUES
  ('Projektet er officielt godkendt!', 'projekt-godkendt', 'Vi er glade for at kunne meddele, at Valhalla-Briketten projektet er blevet officielt godkendt på vores ASE-møde i februar 2026.', '', '2026-02-15 10:00:00+01'),
  ('Savsmuld fra Brabrand Fineringscentral', 'savsmuld-aftale', 'Vi har indgået aftale med Brabrand Fineringscentral om levering af savsmuld. Deres affald bliver vores råmateriale!', '', '2026-02-20 14:00:00+01'),
  ('BIPED-møde booket til marts', 'biped-mode', 'Vi har booket et opstartsmøde med BIPED-projektet og en studiegruppe fra Aarhus Universitet.', '', '2026-02-25 09:00:00+01');

-- Settings
INSERT INTO settings (key, value) VALUES
  ('next_milestone', 'Første Valhalla-briket i april!'),
  ('briquette_goal', '1000'),
  ('site_title', 'Valhalla-Briketten'),
  ('current_phase', 'Planlægning og forberedelse')
ON CONFLICT (key) DO NOTHING;
