import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from './utils/apollo';

// Import pages (we'll create these next)
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Meetups from './pages/Meetups';
import Profile from './pages/Profile';
import CreateMeetup from './pages/CreateMeetup';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/meetups" element={<Meetups />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-meetup" element={<CreateMeetup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;