import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import HomeFeed from './HomeFeed';
import { AuthContext } from './context/AuthContext';
import Register from './Register';

const App = () => {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if (!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }
  return (
    <Router>
      <Routes>
        <Route path='/'/>
        <Route index element={
        <ProtectedRoute>
          <HomeFeed/>
        </ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;