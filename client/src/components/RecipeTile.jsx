import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/RecipeTile.module.css';

const RecipeTile = ({ item }) => {
  const uniqueId = uuidv4();
  const parseUri = (uri) => {
    const prefix = '#recipe_';
    const index = uri.indexOf(prefix);
    let recipeId = uri.substr(index).substring(prefix.length);
    return recipeId;
  };
  return (
    <main key={uniqueId} className={styles.tileRecipe}>
      <Link to={`/recipes/${parseUri(item.recipe.uri)}`}>
        <img src={item.recipe.image} className={styles.image}></img>
        <div className={styles.text}> {item.recipe.label}</div>
        <div className={styles.text}>C02e: {item.recipe.co2EmissionsClass}</div>
      </Link>
    </main>
  );
};

export default RecipeTile;
