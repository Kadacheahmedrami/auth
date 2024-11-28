'use client';
import { useState } from 'react';
import { redirect } from "next/navigation"; // Import redirect





const AuthPage = () => {





  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');

  async function login(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password  }),
      
      });
  
      const data = await response.json();
      console.log('Success:', data.message);
     window.location.href="/"

    } catch (error) {
      console.error('Network error:', error);
    }
  }
  

  async function signup(username : string,email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,email,password}),
        
      });
  
      const data = await response.json();
      console.log('Success:', data.message);
      window.location.href="/"

    } catch (error) {
      console.error('Network error:', error);
    }
  }
  

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
   
      login(email, password);
    } else {

      
      signup(name,email,password);
    }
  };

  return (
   <div className='back'>
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
   </div>
   
  );
};

export default AuthPage;
function setResponseMessage(message: any) {
  throw new Error('Function not implemented.');
}

