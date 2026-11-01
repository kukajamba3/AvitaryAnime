import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.startsWith('postgres://') || process.env.DATABASE_URL?.startsWith('postgresql://') ? { rejectUnauthorized: false } : undefined,
});

async function main() {
  if (!process.env.DATABASE_URL) {
    console.warn('WARNING: DATABASE_URL is not set. Skipping migration.');
    process.exit(0);
  }

  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        nickname VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        avatar_url TEXT,
        banner_url TEXT,
        bio TEXT DEFAULT '',
        role VARCHAR(20) DEFAULT 'user',
        email_confirmed BOOLEAN DEFAULT FALSE,
        email_confirmation_token VARCHAR(255),
        email_confirmation_sent_at TIMESTAMP,
        password_reset_token VARCHAR(255),
        password_reset_expires_at TIMESTAMP,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        token VARCHAR(255) PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_anime_lists (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        anime_id INTEGER NOT NULL,
        anime_alias VARCHAR(255),
        anime_title TEXT NOT NULL,
        anime_poster TEXT,
        anime_year INTEGER,
        anime_type VARCHAR(64),
        episodes_total INTEGER,
        status VARCHAR(32) NOT NULL,
        is_favorite BOOLEAN DEFAULT FALSE,
        score INTEGER,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, anime_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS watch_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        anime_id INTEGER NOT NULL,
        anime_alias VARCHAR(255),
        anime_title TEXT NOT NULL,
        anime_poster TEXT,
        episode_ordinal INTEGER NOT NULL,
        episode_name TEXT,
        progress_seconds INTEGER DEFAULT 0,
        duration_seconds INTEGER DEFAULT 0,
        watched_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, anime_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS anime_comments (
        id SERIAL PRIMARY KEY,
        anime_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        parent_id INTEGER REFERENCES anime_comments(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        likes_count INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS comment_likes (
        comment_id INTEGER NOT NULL REFERENCES anime_comments(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY(comment_id, user_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        actor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        type VARCHAR(64) NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        link TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS anime_catalog (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        alias TEXT,
        year INTEGER,
        type VARCHAR(64),
        genres TEXT[],
        description TEXT,
        rating REAL,
        episodes_total INTEGER,
        poster_url TEXT,
        alias_slug VARCHAR(255) UNIQUE
      );
    `);

    // Seed catalog
    const seedData = await import('../lib/catalog-seed-data.js');
    for (const item of seedData.default) {
      await client.query(`
        INSERT INTO anime_catalog (id, title, alias, year, type, genres, description, rating, episodes_total, poster_url, alias_slug)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          alias = EXCLUDED.alias,
          year = EXCLUDED.year,
          type = EXCLUDED.type,
          genres = EXCLUDED.genres,
          description = EXCLUDED.description,
          rating = EXCLUDED.rating,
          episodes_total = EXCLUDED.episodes_total,
          poster_url = EXCLUDED.poster_url,
          alias_slug = EXCLUDED.alias_slug;
      `, [
        item.id, item.title, item.alias, item.year, item.type, item.genres,
        item.description, item.rating, item.episodes_total, item.poster_url, item.alias_slug
      ]);
    }

    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    client.release();
  }
}

main().catch(console.error);
