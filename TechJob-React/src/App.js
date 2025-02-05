import { ToastContainer } from "react-toastify";
import Hire from "./components/Hire";
import Home from "./components/Home";
import Jobs from './components/Jobs';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div style={{ backgroundColor: "rgba(33,33,33,0.9)", color: "white" }}>
      <Router>
        <ToastContainer position="top-center" autoClose={4000} limit={2} hideProgressBar={false}  pauseOnFocusLoss draggable="mouse" pauseOnHover theme="dark"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
