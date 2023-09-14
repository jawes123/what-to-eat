import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/Recipe';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {

  return (
    <>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/profile" element={<Profile />} />
       </Routes>
    </>
  );
};

export default App;
