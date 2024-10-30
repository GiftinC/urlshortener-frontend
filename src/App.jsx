import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetConfirmation from './components/ResetConfirmation.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import Register from './components/Register.jsx';
import UrlShortener from "./components/urlShortener.jsx";
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-confirmation" element={<ResetConfirmation />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div><h1>Please Check your URL</h1></div>} />
        <Route path="/url-shortener" element={<UrlShortener />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
