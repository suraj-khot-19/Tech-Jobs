import { ToastContainer } from "react-toastify";
import Hire from "./components/Hire";
import Home from "./components/Home";
import Jobs from './components/Jobs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  //states
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [headToTop, setHeadToTop] = useState("");

  // Fetch job data from API
  const fetchData = async () => {
    try {
      const url = "http://localhost:8080/api/tech/job/posts";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "rgba(33,33,33,0.9)", color: "white" }}>
      <Router>
        <ToastContainer position="top-center" autoClose={4000} limit={2} hideProgressBar={false} pauseOnFocusLoss draggable="mouse" pauseOnHover theme="dark"
        />
        <Navbar data={data} setData={setData} searchKey={searchKey} setSearchKey={setSearchKey} setHeadToTop={setHeadToTop} fetchData={fetchData} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/jobs" element={<Jobs data={data} setData={setData} searchKey={searchKey} setSearchKey={setSearchKey} headToTop={headToTop} setHeadToTop={setHeadToTop} fetchData={fetchData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
