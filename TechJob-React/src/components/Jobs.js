import React, { useState, useEffect } from 'react'

function Jobs() {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8080/api/tech/job/posts";
        const response = await fetch(url, {
            method: "GET"
        });
        const json = await response.json();
        // console.log(json)
        setData(json);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container">
            <div className="row gap-3 py-5">
                {data.map((e) => (
                    <div key={e._id}>
                        <div className="card mb-2 me-2">
                            <div className="card-body">
                                <h5 className="card-title">{e.profile}</h5>
                                <p className="card-text">Responsiblities : {e.desc}</p>
                                <p className="card-text">Expreience : {e.exp}</p>
                                <div className="d-flex flex-wrap">
                                    Skills :
                                    {e.skills.map((skill, index) => (
                                        <span key={index} class="badge rounded-pill text-bg-dark px-4 py-2 me-2">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Jobs