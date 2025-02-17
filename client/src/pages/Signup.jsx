import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    skillLevel: 'Beginner'
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          skillLevel: formState.skillLevel,
        },
      });
      const token = mutationResponse.data.addUser.token;
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
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
          <input
            name="username"
            type="text"
            id="username"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="skillLevel" className="block text-gray-700 mb-2">Skill Level</label>
          <select
            name="skillLevel"
            id="skillLevel"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Signup
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Go to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;