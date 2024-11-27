'use client';
import { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with', email, password);
    } else {
      console.log('Signing up with', email, password);
    }
  };

  return (
   
    <div className="wrapper">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
      {isLogin ? <></> :
             <div className="input-box">
             <input
               type="name"
               placeholder="name"
               value={name}
               onChange={(e) => setname(e.target.value)}
               required
             />
           </div>
      }
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
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit" className="btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <div className="register-link">
        <p>
          {isLogin
            ? "Don't have an account? "
            : 'Already have an account? '}
          <a onClick={toggleForm}>
            {isLogin ? 'Sign Up' : 'Login'}
          </a>
        </p>
      </div>
   
    </div>
  );
};

export default AuthPage;
