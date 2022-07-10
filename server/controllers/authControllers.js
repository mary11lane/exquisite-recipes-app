import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ id }, 'lanesb', {
    expiresIn: '30d',
  });
};

const errorHandler = (err) => {
  let errors = { email: '', password: '' };

  console.log(err);
  if (err.message === 'incorrect email' || 'incorrect password') {
    errors.email = 'Incorrect email/password';
  }

  if (err.code === 11000) {
    errors.email = 'Email is already registered';
    return errors;
  }

  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = errorHandler(err);
    res.json({ errors, created: false });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = errorHandler(err);
    res.json({ errors, created: false });
  }
};
