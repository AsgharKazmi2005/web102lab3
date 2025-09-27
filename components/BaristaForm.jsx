import React, { useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "../src/drinks.json"

const BaristaForm = () => {
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  // The drink currently shown and the true recipe for it
  const [currentDrink, setCurrentDrink] = useState("");
  const [trueRecipe, setTrueRecipe] = useState({});

  // correctness markers for visual feedback ("", "correct", "wrong")
  const [correct_temp, setCheckedTemperature] = useState("");
  const [correct_milk, setCheckedMilk] = useState("");
  const [correct_syrup, setCheckedSyrup] = useState("");
  const [correct_blended, setCheckedBlended] = useState("");

  // pick a random drink and set state
  const getNextDrink = () => {
    if (!drinksJson || !drinksJson.drinks || drinksJson.drinks.length === 0) {
      setCurrentDrink("No drinks available");
      setTrueRecipe({});
      return;
    }
    const randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    const chosen = drinksJson.drinks[randomDrinkIndex];
    setCurrentDrink(chosen.name);
    setTrueRecipe(chosen.ingredients || {});
  };

  const onNewDrink = () => {
    // clear inputs & correctness markers and get a new drink
    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    });
    setCheckedTemperature("");
    setCheckedMilk("");
    setCheckedSyrup("");
    setCheckedBlended("");
    getNextDrink();
  };

  const onCheckAnswer = (e) => {
    e?.preventDefault?.(); // in case it's triggered as form submission
    // If there's no trueRecipe, just return
    if (!trueRecipe || Object.keys(trueRecipe).length === 0) {
      alert("Click New Drink to start the quiz!");
      return;
    }

    // Compare each field, set 'correct' or 'wrong'
    if (trueRecipe.temp !== inputs["temperature"]) {
      setCheckedTemperature("wrong");
    } else {
      setCheckedTemperature("correct");
    }

    if (trueRecipe.milk !== inputs["milk"]) {
      setCheckedMilk("wrong");
    } else {
      setCheckedMilk("correct");
    }

    if (trueRecipe.syrup !== inputs["syrup"]) {
      setCheckedSyrup("wrong");
    } else {
      setCheckedSyrup("correct");
    }

    if (trueRecipe.blended !== inputs["blended"]) {
      setCheckedBlended("wrong");
    } else {
      setCheckedBlended("correct");
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Hi, I'd like to order a:</h2>

      <div className="drink-container">
        <h2 className="mini-header">{currentDrink || "— click 🔄 for a drink"}</h2>
        <button className="button newdrink" onClick={onNewDrink} title="New Drink">
          🔄
        </button>
      </div>

      <form className="container" onSubmit={(e) => e.preventDefault()}>
        {/* Temperature */}
        <div className="mini-container">
          <h3>Temperature</h3>
          <div className={`answer-space ${correct_temp}`}>
            {inputs["temperature"] || "—"}
          </div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="temperature"
            choices={ingredients["temperature"]}
            currentVal={inputs["temperature"]}
          />
        </div>

        {/* Milk */}
        <div className="mini-container">
          <h3>Milk</h3>
          <div className={`answer-space ${correct_milk}`}>
            {inputs["milk"] || "—"}
          </div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="milk"
            choices={ingredients["milk"]}
            currentVal={inputs["milk"]}
          />
        </div>

        {/* Syrup */}
        <div className="mini-container">
          <h3>Syrup</h3>
          <div className={`answer-space ${correct_syrup}`}>
            {inputs["syrup"] || "—"}
          </div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="syrup"
            choices={ingredients["syrup"]}
            currentVal={inputs["syrup"]}
          />
        </div>

        {/* Blended */}
        <div className="mini-container">
          <h3>Blended</h3>
          <div className={`answer-space ${correct_blended}`}>
            {inputs["blended"] || "—"}
          </div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="blended"
            choices={ingredients["blended"]}
            currentVal={inputs["blended"]}
          />
        </div>
      </form>

      <div className="controls">
        <button
          className="button submit"
          onClick={onCheckAnswer}
        >
          Check Answer
        </button>

        <button
          className="button submit"
          onClick={onNewDrink}
        >
          New Drink
        </button>
      </div>
    </div>
  );
};

export default BaristaForm;
