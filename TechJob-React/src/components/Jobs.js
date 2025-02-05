import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import SingleJobPost from './SingleJobPost';
import { toast } from 'react-toastify';
function Jobs() {
    // state
    const [data, setData] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [headToTop, setHeadToTop] = useState("");
    const [loading, setloading] = useState(true);

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

    //initial loading
    setTimeout(() => {
        setloading(false);
    }, 1200);

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

    // handel delete functionality
    const handelDelete = async (id) => {
        if (!id) {
            return;
        }
        try {
            setloading(true);
            const url = `http://localhost:8080/api/tech/job/delete/${id}`;

            const response = await fetch(url, {
                method: "DELETE",
            });

            if (response.status === 200) {
                toast.success("Job deleted successfully!");
                setTimeout(() => {
                    fetchData(); // Refresh job list
                }, 500);
            } else {
                toast.error("Job post not deleted, please try again latter!")
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setTimeout(() => {
                setloading(false);
            }, 500);
        }
    }
    return (
        <>

            {/* navbar */}
            <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <Link className="navbar-brand ms-3" to="/">Tech Job</Link>
                    </div>


                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchKey} name='key' onChange={(e) => {
                            setSearchKey(e.target.value)
                        }} />
                        <button disabled={searchKey.length < 2} className="btn btn-outline-warning" type="submit" onClick={handelOnClick}>Search</button>
                    </form>
                </div>
            </nav>

            {/* all data */}
            <div className='container' style={{ minHeight: "calc(100vh - 57px)" }} >

                {/* Loading Overlay */}
                {loading && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light" style={{ opacity: 0.8, zIndex: 1050 }}>
                        <span className="fs-4 fw-bold" style={{ color: "black" }}>Loading...</span>
                    </div>
                )}

                {/* search indicator */}
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
                        <div className="container ">
                            <div className="row gap-3 py-2">
                                {data.map((e) => (
                                    <SingleJobPost job={e} key={e.id} handelDelete={handelDelete} />
                                ))}
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default Jobs