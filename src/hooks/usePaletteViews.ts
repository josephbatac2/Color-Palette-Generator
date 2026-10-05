import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

type ViewCounts = Record<string, number>;

const CACHE_KEY = 'palette_view_counts';
const BATCH_KEY = 'palette_view_batch';
const BATCH_FLUSH_DELAY = 5000;

function loadCachedCounts(): ViewCounts {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCachedCounts(counts: ViewCounts) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(counts));
  } catch {
    // ignore quota errors
  }
}

function loadBatch(): string[] {
  try {
    const raw = sessionStorage.getItem(BATCH_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBatch(keys: string[]) {
  try {
    sessionStorage.setItem(BATCH_KEY, JSON.stringify(keys));
  } catch {
    // ignore
  }
}

function makePaletteKey(name: string, category: string): string {
  return `${category}:${name}`.toLowerCase().replace(/[^a-z0-9:-]/g, '');
}

export function usePaletteViews() {
  const [viewCounts, setViewCounts] = useState<ViewCounts>(loadCachedCounts);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchCounts() {
      const { data, error } = await supabase
        .from('palette_views')
        .select('palette_key, views');

      if (error || !data || cancelled) {
        setLoaded(true);
        return;
      }

      const counts: ViewCounts = {};
      for (const row of data) {
        counts[row.palette_key] = row.views;
      }

      if (!cancelled) {
        setViewCounts(counts);
        saveCachedCounts(counts);
        setLoaded(true);
      }
    }

    fetchCounts();
    return () => { cancelled = true; };
  }, []);

  const recordView = useCallback((name: string, category: string) => {
    const key = makePaletteKey(name, category);

    // Optimistic local increment
    setViewCounts(prev => {
      const next = { ...prev, [key]: (prev[key] || 0) + 1 };
      saveCachedCounts(next);
      return next;
    });

    // Queue for batch upsert
    const batch = loadBatch();
    if (!batch.includes(key)) {
      batch.push(key);
      saveBatch(batch);
    }
  }, []);

  // Batch flush — upsert accumulated view increments
  useEffect(() => {
    if (!loaded) return;

    const flush = async () => {
      const batch = loadBatch();
      if (batch.length === 0) return;

      saveBatch([]);

      for (const key of batch) {
        const { data: existing } = await supabase
          .from('palette_views')
          .select('views')
          .eq('palette_key', key)
          .maybeSingle();

        if (existing) {
          await supabase
            .from('palette_views')
            .update({ views: existing.views + 1, updated_at: new Date().toISOString() })
            .eq('palette_key', key);
        } else {
          await supabase
            .from('palette_views')
            .insert({ palette_key: key, views: 1 });
        }
      }
    };

    const interval = setInterval(flush, BATCH_FLUSH_DELAY);
    return () => clearInterval(interval);
  }, [loaded]);

  return { viewCounts, recordView, loaded };
}

export { makePaletteKey };
