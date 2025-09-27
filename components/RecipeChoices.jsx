import React from "react";

/**
 * Props:
 * - handleChange: function(e)
 * - label: string (name attribute)
 * - choices: array of strings
 * - currentVal: currently selected value for controlled radio
 */
const RecipeChoices = ({ handleChange, label, choices, currentVal }) => {
  return (
    <div className="radio-buttons">
      {choices &&
        choices.map((choice) => (
          <li key={choice} className="radio-item">
            <input
              id={`${label}-${choice}`}
              value={choice}
              name={label}
              type="radio"
              onChange={handleChange}
              checked={currentVal === choice}
            />
            <label htmlFor={`${label}-${choice}`}> {choice} </label>
          </li>
        ))}
    </div>
  );
};

export default RecipeChoices;
