import axios from 'axios';
import 'dotenv/config';

const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

export const getRecipes = async (req, res) => {
  const { recipes } = req.params;
  try {
    const { data } = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${recipes}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(
      `https://api.edamam.com/api/recipes/v2/${id}?type=public&beta=true&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    res.status(200).json(data.recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
