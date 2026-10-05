/*
# Create palette_views table (single-tenant, no auth)

1. New Tables
- `palette_views`
  - `id` (uuid, primary key)
  - `palette_key` (text, not null) — a stable key identifying the palette (name + category hash or similar)
  - `views` (integer, not null, default 1) — cumulative view count
  - `updated_at` (timestamptz, default now())
2. Security
- Enable RLS on `palette_views`.
- Allow anon + authenticated to read, insert, and update (public view counter).
3. Indexes
- Unique index on `palette_key` so each palette has one row.
*/

CREATE TABLE IF NOT EXISTS palette_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  palette_key text NOT NULL,
  views integer NOT NULL DEFAULT 1,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE palette_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_palette_views" ON palette_views;
CREATE POLICY "anon_select_palette_views" ON palette_views FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_palette_views" ON palette_views;
CREATE POLICY "anon_insert_palette_views" ON palette_views FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_palette_views" ON palette_views;
CREATE POLICY "anon_update_palette_views" ON palette_views FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

CREATE UNIQUE INDEX IF NOT EXISTS idx_palette_views_key ON palette_views (palette_key);
