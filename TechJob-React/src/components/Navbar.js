import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ searchKey, setSearchKey, setData, setHeadToTop,fetchData }) {
    //react router dom
    const location = useLocation();

    //state
    const [clickedSearch, setClickedSearch] = useState(false);

    // Handle search functionality
    const handelOnClick = async (e) => {
        e.preventDefault();

        setClickedSearch(true);
        try {
            setHeadToTop(searchKey); /// add heading as a search key

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

    // handel clear
    const handelClear = () => {
        setClickedSearch(false); 
        setSearchKey(""); 
        fetchData();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Tech Job</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/hire">Hire</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/jobs">Jobs</Link>
                        </li>
                    </ul>
                    {
                        location.pathname !== '/hire' && location.pathname !== '/'  &&
                        (
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchKey} name="key"
                                    onChange={(e) => setSearchKey(e.target.value)}
                                />
                                {
                                    clickedSearch ?
                                        (
                                            <button className="btn btn-outline-danger" type="submit" onClick={handelClear}>Clear</button>
                                        ) : (
                                            <button disabled={searchKey.length < 2} className="btn btn-outline-warning" type="submit" onClick={handelOnClick}>Search</button>
                                        )
                                }
                            </form>
                        )
                    }
                </div>
            </div>
        </nav >
    )
}
