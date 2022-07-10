import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/login');
      } else {
        const { data } = await axios.post(
          'http://localhost:5000',
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookies('jwt');
          navigate('login');
        }
        return;
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookies]);

  const logout = () => {
    removeCookies('jwt');
    navigate('/login');
  };

  return (
    <main className={styles.containerNav}>
      <Link to="/recipes">
        <section className={styles.logo}>Exquisite</section>
      </Link>
      <section className={styles.nav}>
        <Link to="/profile">
          <div>Profile</div>
        </Link>
        <div onClick={logout}>Logout</div>
        <ToastContainer />
      </section>
    </main>
  );
};

export default NavBar;
