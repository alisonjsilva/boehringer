-- Create ranking table
CREATE TABLE ranking (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  userid INTEGER REFERENCES users(id) ON DELETE CASCADE,
  moves INTEGER NOT NULL,
  time INTEGER,
  day INTEGER DEFAULT 1,
  ranking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE ranking ENABLE ROW LEVEL SECURITY;

-- Create policies for ranking table
CREATE POLICY "Anyone can read ranking" ON ranking
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert ranking" ON ranking
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_ranking_userid ON ranking(userid);
CREATE INDEX idx_ranking_day ON ranking(day);
CREATE INDEX idx_ranking_moves_time ON ranking(moves, time);
CREATE INDEX idx_ranking_date ON ranking(ranking_date);
