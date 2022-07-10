import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/LandingPage.module.css';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <main className={styles.container}>
      <section className={styles.containerImage}>
        <img
          className={styles.imageLanding}
          src="src/assets/images/exquisite-landing-img.jpg"
        />
      </section>
      <section className={styles.containerLogoButtons}>
        <Logo />
        <div className={styles.buttons}>
          <Link to="/login">
            <span className={styles.login}>Login</span>
          </Link>
          <Link to="/signup">
            <span className={styles.signup}>Signup</span>
          </Link>
        </div>

        <Footer />
        <div id="edamam-badge" data-color="transparent"></div>
      </section>
    </main>
  );
};

export default LandingPage;
