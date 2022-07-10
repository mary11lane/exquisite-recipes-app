import React from 'react';

import styles from '../styles/Logo.module.css';

const Logo = () => {
  return (
    <main>
      <div className={styles.logoMain}>Exquisite</div>
      <div className={styles.logoSub}>recipes</div>
    </main>
  );
};

export default Logo;
