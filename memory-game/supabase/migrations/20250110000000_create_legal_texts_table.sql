-- Create legal_texts table
CREATE TABLE legal_texts (
  id SERIAL PRIMARY KEY,
  day INTEGER NOT NULL UNIQUE,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE legal_texts ENABLE ROW LEVEL SECURITY;

-- Create policies for legal_texts table
CREATE POLICY "Anyone can read legal_texts" ON legal_texts
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert legal_texts" ON legal_texts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update legal_texts" ON legal_texts
  FOR UPDATE USING (true);

-- Create index for better performance
CREATE INDEX idx_legal_texts_day ON legal_texts(day);

-- Insert initial legal texts
INSERT INTO legal_texts (day, text) VALUES 
(1, 'Senvelgo® contains velagliflozin (sodium-glucose co-transporter 2 [SGLT-2] inhibitor). Semintra® contains telmisartan. UK(GB): POM-V. Prescription decisions are for the person issuing the prescription alone. Further information available in the SPCs or from Boehringer Ingelheim Animal Health UK Ltd., RG12 8YS, UK. UK(GB) Tel: 01344 746959 (sales) or 01344 746957 (technical). Email: vetenquiries@boehringer-ingel-heim.com. Senvelgo® and Semintra® are registered trademarks of Boehringer Ingelheim Vetmedica GmbH, used under licence. ©2025 Boehringer Ingelheim Animal Health UK Ltd. All rights reserved. Date of preparation: Jun 2029. 0FFEL-0002-2023. Use Medicines Responsibly.'),
(2, 'Dummy legal text for day 2. This is placeholder content that will be updated later with appropriate legal information.'),
(3, 'Dummy legal text for day 3. This is placeholder content that will be updated later with appropriate legal information.'); 