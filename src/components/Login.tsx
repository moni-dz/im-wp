'use client';

import { useState, useEffect } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  // null initial state
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  
  // default values after mount
  useEffect(() => {
    setEmail('example@example.com');
    setPassword('example');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  // does nawt render d form until initial values are set
  if (email === null || password === null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-950">LOGO</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-600">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-950 transition-colors"
          >
            sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;