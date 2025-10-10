import React, { useState, useEffect } from "react";
import StarRating from './starRating';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function BrewModal({ isOpen, onClose, onSaveSuccess, onDelete, brew, methods }) {
  const [formData, setFormData] = useState({
    bean: "",
    method: "",
    coffee_grams: "",
    water_grams: "",
    rating: 0,
    tasting_notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (brew) {
      setFormData(brew);
    } else {
      setFormData({
        bean: "",
        method: "",
        coffee_grams: "",
        water_grams: "",
        rating: 0,
        tasting_notes: "",
      });
    }
    setErrors({});
  }, [brew, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.bean.trim()) newErrors.bean = "Bean is required";
    if (!formData.method) newErrors.method = "Method is required";
    if (!formData.coffee_grams) newErrors.coffee_grams = "Coffee grams required";
    if (!formData.water_grams) newErrors.water_grams = "Water grams required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);
    const method = brew ? 'PUT' : 'POST';
    const url = brew ? `${API_URL}/brews/${brew.id}` : `${API_URL}/brews`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const savedBrew = await res.json();
      onSaveSuccess(savedBrew);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{brew ? "Edit a brew" : "Add a brew"}</h2>

        <label>Beans:
          <input
            type="text"
            value={formData.bean}
            onChange={(e) => setFormData({ ...formData, bean: e.target.value })}
            style={{ borderColor: errors.bean ? "red" : undefined }}
          />
          {errors.bean && <div style={{ color: "red", fontSize: "0.85rem" }}>{errors.bean}</div>}
        </label>

        <label>Method:
          <select
            value={formData.method}
            onChange={(e) => setFormData({ ...formData, method: e.target.value })}
            style={{ borderColor: errors.method ? "red" : undefined }}
          >
            <option value="">Select a method</option>
            {methods.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {errors.method && <div style={{ color: "red", fontSize: "0.85rem" }}>{errors.method}</div>}
        </label>

        <div className="row">
          <label> Coffee grams:
            <input
              type="number"
              value={formData.coffee_grams}
              onChange={(e) => setFormData({ ...formData, coffee_grams: e.target.value })}
              style={{ borderColor: errors.coffee_grams ? "red" : undefined }}
            />
            {errors.coffee_grams && <div style={{ color: "red", fontSize: "0.85rem" }}>{errors.coffee_grams}</div>}
          </label>

          <label> Water grams:
            <input
              type="number"
              value={formData.water_grams}
              onChange={(e) => setFormData({ ...formData, water_grams: e.target.value })}
              style={{ borderColor: errors.water_grams ? "red" : undefined }}
            />
            {errors.water_grams && <div style={{ color: "red", fontSize: "0.85rem" }}>{errors.water_grams}</div>}
          </label>
        </div>

        <label>Rating (out of 5):
          <StarRating
            rating={formData.rating}
            onRatingChange={(r) => setFormData({ ...formData, rating: r })}
          />
        </label>

        <label>Tasting notes:
          <textarea
            value={formData.tasting_notes}
            onChange={(e) => setFormData({ ...formData, tasting_notes: e.target.value })}
            rows={3}
          />
        </label>

        <div className="modal-buttons">
          {brew && (
            <button className="delete" onClick={onDelete}>Delete</button>
          )}
          <button className="save" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
