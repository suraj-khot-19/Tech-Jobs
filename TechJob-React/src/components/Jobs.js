import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import i from '../assets/tech.png'
function Jobs() {
    // state
    const [data, setData] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [headToTop, setHeadToTop] = useState("")

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

    // Effect
    useEffect(() => {
        fetchData();
    }, []);

    // Handle search functionality
    const handelOnClick = async (e) => {
        e.preventDefault();
        if (!searchKey.trim()) return;

        try {
            setHeadToTop(searchKey);

            const url = `http://localhost:8080/api/tech/job/posts/search/${searchKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Search failed");
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <>
            {/* navbar */}
            <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <img src={i} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                        <Link class="navbar-brand ms-3" to="/">Tech Job</Link>
                    </div>


                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchKey} name='key' onChange={(e) => {
                            setSearchKey(e.target.value)
                        }} />
                        <button class="btn btn-outline-warning" type="submit" onClick={handelOnClick}>Search</button>
                    </form>
                </div>
            </nav>

            {
                headToTop &&
                <div className='ms-3 my-2'>
                <span>
                    Search result for <span className='font-weight-bold h5 text-decoration-underline'>{searchKey}</span>
                </span>
            </div>
            
            }
            {/* if no job or job */}
            {
                data.length == 0 ?
                    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                        <div>
                            <h1>No Job Found!</h1>
                        </div>
                    </div>

                    // if jobs
                    :
                    <div className="container">
                        <div className="row gap-3 py-2">
                            {data.map((e) => (
                                <div key={e.id}>

                                    {/* card */}
                                    <div className="card mb-2 me-2 position-relative">

                                        {/* btn top */}
                                        <span className="me-2 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light" style={{ color: "black" }}>
                                            Tech Job
                                        </span>

                                        {/* card-body */}
                                        <div className="card-body">
                                            <h5 className="card-title">{e.profile}</h5>
                                            <p className="card-text">Responsiblities : {e.desc}</p>
                                            <p className="card-text">Expreience : {e.exp}</p>

                                            {/* skills section */}
                                            <div className="d-flex flex-wrap gap-3">
                                                Skills :
                                                {e.skills.map((skill, index) => (
                                                    <span key={index} className="badge rounded-pill text-bg-dark px-4 py-2">{skill}</span>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            }
        </>
    )
}

export default Jobs