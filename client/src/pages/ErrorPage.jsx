import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/ErrorPage.module.css';
import Footer from '../components/Footer';

const ErrorPage = () => {
  return (
    <main className={styles.container}>
      <img
        className={styles.imgDisplay}
        src="http://localhost:3000/src/assets/images/error-page-img.svg"
      ></img>
      <div className={styles.text}>
        The page you're looking for does not exist
      </div>
      <Link to="/" className={styles.linkTo}>
        <div className={styles.text}>Browse recipes now</div>
      </Link>
      <Footer />
    </main>
  );
};

export default ErrorPage;
