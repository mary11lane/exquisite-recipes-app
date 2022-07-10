import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RecipeListPage from '../pages/RecipeListPage.jsx';
import RecipePage from '../pages/RecipePage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';

const RoutesComponent = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  );
};

export default RoutesComponent;
