const express = require('express');
const router = express.Router();
const {
  getAllBrews,
  getBrewById,
  createBrew,
  updateBrew,
  deleteBrew
} = require('../controllers/brewController');

// GET /api/brews - Get all brews (with optional method filter
router.get('/', getAllBrews);

// GET /api/brews/:id - Get single brew by ID
router.get('/:id', getBrewById);

// POST /api/brews - Create new brew
router.post('/', createBrew);

// PUT /api/brews/:id - Update brew
router.put('/:id', updateBrew);

// DELETE /api/brews/:id - Delete brew
router.delete('/:id', deleteBrew);

module.exports = router;