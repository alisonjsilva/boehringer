-- Add DELETE policy for ranking table
CREATE POLICY "Anyone can delete ranking" ON ranking
  FOR DELETE USING (true); 