'use client';
import { useState } from 'react';
import { redirect } from "next/navigation";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function login(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Ensure cookies are included with the request
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message || 'Login failed');
        return;
      }
  
      const data = await response.json();
  
      // Log success message from server
      console.log('Success:', data.message);
  
      // Redirect to homepage or protected route after login
      window.location.href = "/";
    } catch (error) {
      console.error('Network error:', error);
      console.log('An error occurred. Please try again.');
    }
  }
  

  async function signup(username: string, email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log('Success:', data.message);

      // After successful signup, redirect to login page
      if (response.ok) {
        console.log('Signup successful, please log in');
        setIsLogin(true);  // Switch to the login form
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      signup(name, email, password);
    }
  };

  return (
    <div className='back'>
      <div className="wrapper">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          {isLogin ? null : (
            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="register-link">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <a onClick={toggleForm}>{isLogin ? 'Sign Up' : 'Login'}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
