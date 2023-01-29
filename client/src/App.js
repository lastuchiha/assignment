import './App.css';
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from './pages/signup';
import Profile from './pages/profile';
import Redirect from "./helpers/redirect";
import { AuthContextProvider } from "./contexts/authcontext";
import Protected from './helpers/protected';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Protected><p>Home</p></Protected>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/users/:username' element={<Profile />} />
        <Route path='*' element={<p>Page not found</p>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
