import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../styles/RecipeListPage.module.css';
import RecipeTile from '../components/RecipeTile.jsx';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('pizza');
  const [dataFetched, setDataFetched] = useState(false);
  const [nextpage, setNextpage] = useState({});

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/${query}`);
    setRecipes(data.hits);
    setDataFetched(true);
    setNextpage(data._links.next);
  };

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setQuery(input);
    setInput('');
  };

  const nextpageHandler = async () => {
    const { data } = await axios.get(nextpage.href);
    setRecipes(data.hits);
    setNextpage(data._links.next);
    setDataFetched(true);
  };

  return (
    <main className={styles.container}>
      <NavBar />
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          className={styles.inputForm}
          type="text"
          placeholder="pizza"
          value={input}
          onChange={changeHandler}
        />
        <button className={styles.buttonSearch} type="submit">
          Search
        </button>
      </form>
      {!dataFetched ? (
        <div className={styles.textLoader}>
          Hungry yet? Your recipe list is on its way!
        </div>
      ) : (
        <section className={styles.recipeTiles}>
          {recipes.map((item) => {
            return <RecipeTile item={item} />;
          })}
        </section>
      )}
      <section className={styles.pagination}>
        <span className={styles.buttonPage} onClick={nextpageHandler}>
          Next &#8594;
        </span>
      </section>
      <Footer />
    </main>
  );
};

export default RecipeListPage;
