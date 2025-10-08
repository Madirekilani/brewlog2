-- schema.sql

-- Create the brews table
CREATE TABLE IF NOT EXISTS brews (
  id SERIAL PRIMARY KEY,
  bean VARCHAR(255) NOT NULL,          
  method VARCHAR(100) NOT NULL,
  coffee_grams INTEGER NOT NULL CHECK (coffee_grams > 0),  
  water_grams INTEGER NOT NULL CHECK (water_grams > 0),    
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  tasting_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);