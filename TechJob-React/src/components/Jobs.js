import React, { useState, useEffect } from 'react'
import SingleJobPost from './SingleJobPost';
import { toast } from 'react-toastify';
function Jobs({ data, searchKey, fetchData, headToTop }) {
    // state
    const [loading, setloading] = useState(true);

    // Effect
    useEffect(() => {
        fetchData();
    }, []);

    //initial loading
    setTimeout(() => {
        setloading(false);
    }, 800);

    // handel delete functionality
    const handelDelete = async (id) => {
        if (!id) return;
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
                    headToTop && (
                        <div className='ms-3 my-2'>
                            <span>
                                Search result for <span className='font-weight-bold h5 text-decoration-underline'>{searchKey}</span>
                            </span>
                        </div>
                    )}

                {/* if no job or job */}
                {
                    data.length === 0 ?
                        (
                            <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                <div>
                                    <h1>No Job Found!</h1>
                                </div>
                            </div>
                        ) : (
                            <div className="container ">
                                <div className="row gap-3 py-2">
                                    {data.map((e) => (
                                        <SingleJobPost job={e} key={e.id} handelDelete={handelDelete} />
                                    ))}
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default Jobs