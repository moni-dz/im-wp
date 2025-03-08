import { redirect } from 'next/navigation';
import Image from 'next/image';
import logo from '../logo2.png'; 

const Login = () => {
  async function login(formData: FormData) {
    "use server";

    const response = await fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({ username: formData.get('username'), password: formData.get('password') }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      console.log('logged in');
      redirect('/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="text-center mb-8">
        <Image
              src={logo}
              alt="LML Engineering Solutions"
              className="w-32 mx-auto"
              width={128}
              height={40}
              priority
            />        </div>
        
        <form action={login} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm text-gray-600">username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-600">password</label>
            <input
              type="password"
              name="password"
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