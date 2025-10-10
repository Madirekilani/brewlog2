import React from "react";

export default function BrewLog({ brews, onEdit }) {
  const ratingColor = (r) => {
    if (r >= 4) return "green";
    if (r === 3) return "orange";
    return "red";
  };

  if (!brews || brews.length === 0) {
    return <p>No brews logged yet.</p>;
  }

  return (
    <div className="brew-log-list">
      {brews.map((brew) => (
        <div key={brew.id} className="brew-item">
          <div className="rating-circle" style={{ backgroundColor: ratingColor(brew.rating) }}>
            {brew.rating}
          </div>
          <div className="brew-details">
            <strong>{brew.bean}</strong>
            <div className="tags">
              <span>{brew.method}</span>
              <span>☕ {brew.coffee_grams}g</span>
              <span>💧 {brew.water_grams}g</span>
            </div>
          </div>
          <button className="edit-icon" onClick={() => onEdit(brew)}>✎</button>
        </div>
      ))}
    </div>
  );
}