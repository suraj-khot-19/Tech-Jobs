import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import SingleJobPost from './SingleJobPost';
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
                data.length === 0 ?
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
                                <SingleJobPost job={e} key={e.id} />
                            ))}
                        </div>
                    </div>
            }
        </>
    )
}

export default Jobs