import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

import styles from '../styles/Login.module.css';
import Footer from '../components/Footer';

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const errorHandler = (error) =>
    toast.error(error, {
      position: 'bottom-center',
      hideProgressBar: true,
      autoClose: 3000,
    });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/login',
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) errorHandler(email);
          else if (password) errorHandler(password);
        } else {
          navigate('/recipes');
        }
      }
    } catch (err) {}
  };

  return (
    <main className={styles.container}>
      <ToastContainer />
      <div className={styles.text}>LOGIN</div>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={changeHandler}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={changeHandler}
        ></input>
        <button>LOGIN</button>
        <div className={styles.signup}>
          No account yet?{' '}
          <span>
            <Link to="/signup">SIGNUP</Link>
          </span>
        </div>
      </form>
      <Footer />
    </main>
  );
};

export default LoginPage;
