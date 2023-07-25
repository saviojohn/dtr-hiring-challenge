import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Home } from "./components/Home";
import { Business } from "./components/Business";
import { User } from "./components/User";
import { Sales } from "./components/sales";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
