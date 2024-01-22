import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './views/Login';
import Registration from "./views/Registration";
import Dashboard from "./views/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
