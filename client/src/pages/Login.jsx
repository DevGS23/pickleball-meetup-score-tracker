import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && (
          <div className="text-red-600 mb-4">
            Login failed
          </div>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-600 hover:text-blue-800">
            Go to Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;