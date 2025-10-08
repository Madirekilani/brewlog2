const pool = require('../config/database');


const getAllBrews = async (req, res) => {
  try {
    const { method } = req.query; 
    
    let query = 'SELECT * FROM brews ORDER BY created_at DESC';
    let params = [];
    
   
    if (method) {
      query = 'SELECT * FROM brews WHERE method = $1 ORDER BY created_at DESC';
      params = [method];
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting brews:', error);
    res.status(500).json({ error: 'Failed to fetch brews' });
  }
};

const getBrewById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM brews WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Brew not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error getting brew:', error);
    res.status(500).json({ error: 'Failed to fetch brew' });
  }
};


const createBrew = async (req, res) => {
  try {
    const { bean, method, coffee_grams, water_grams, rating, tasting_notes } = req.body;
    
    
    if (!bean || !method || !coffee_grams || !water_grams || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const result = await pool.query(
      `INSERT INTO brews (bean, method, coffee_grams, water_grams, rating, tasting_notes) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [bean, method, coffee_grams, water_grams, rating, tasting_notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating brew:', error);
    res.status(500).json({ error: 'Failed to create brew' });
  }
};


const updateBrew = async (req, res) => {
  try {
    const { id } = req.params;
    const { bean, method, coffee_grams, water_grams, rating, tasting_notes } = req.body;
    
    
    if (!bean || !method || !coffee_grams || !water_grams || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const result = await pool.query(
      `UPDATE brews 
       SET bean = $1, method = $2, coffee_grams = $3, water_grams = $4, 
           rating = $5, tasting_notes = $6, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $7 
       RETURNING *`,
      [bean, method, coffee_grams, water_grams, rating, tasting_notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Brew not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating brew:', error);
    res.status(500).json({ error: 'Failed to update brew' });
  }
};


const deleteBrew = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM brews WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Brew not found' });
    }
    
    res.json({ message: 'Brew deleted successfully' });
  } catch (error) {
    console.error('Error deleting brew:', error);
    res.status(500).json({ error: 'Failed to delete brew' });
  }
};

module.exports = {
  getAllBrews,
  getBrewById,
  createBrew,
  updateBrew,
  deleteBrew
};