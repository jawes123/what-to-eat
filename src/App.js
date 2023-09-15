import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/Recipe';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './auth/protected-route';

function App() {

  return (
    <>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={
            <ProtectedRoute redirectTo="/">
              <Home/>
            </ProtectedRoute>
            } 
          />
          <Route path="/recipe" element={
            <ProtectedRoute redirectTo="/">
              <RecipePage/>
            </ProtectedRoute>
            } 
          />
          <Route path="/profile" element={
            <ProtectedRoute redirectTo="/">
              <Profile/>
            </ProtectedRoute>
            } 
          />
          {/* <Route path="/recipe" element={<RecipePage />} />
          <Route path="/profile" element={<Profile />} /> */}
       </Routes>
    </>
  );
};



export default App;
