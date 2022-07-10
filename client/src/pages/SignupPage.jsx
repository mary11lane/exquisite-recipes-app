import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import styles from '../styles/Signup.module.css';
import Footer from '../components/Footer';

const SignupPage = () => {
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
        'http://localhost:5000/signup',
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
      <div className={styles.text}>SIGNUP</div>
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
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={changeHandler}
        ></input>
        <button>SIGNUP</button>
        <div className={styles.login}>
          Already have an account?{' '}
          <span>
            <Link to="/login">LOGIN</Link>
          </span>
        </div>
      </form>
      <Footer />
    </main>
  );
};

export default SignupPage;
