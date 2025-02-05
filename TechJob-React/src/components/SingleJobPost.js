import React, { useState } from 'react'

function SingleJobPost({ job }) {
    const [hover, sethover] = useState(false);

    return (
        <div>
            {/* card */}
            <div className="card mb-2 me-2 position-relative"
                onMouseEnter={() => sethover(true)}
                onMouseLeave={() => sethover(false)}>

                {/* btn top */}
                <span className="me-2 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light" style={{ color: "black" }}>
                    Tech Job
                </span>

                {/* delete & edit btn */}
                {
                    hover && <div className='me-2 mb-2 position-absolute bottom-0 end-0'>
                        <div className="d-flex justify-content-end align-items-center">
                            <button type="button" className="btn btn-outline-info me-2 px-4"> <img height="20px" width="20px" src="https://img.icons8.com/?size=100&id=86374&format=png&color=000000" alt="edit" /> Edit</button>
                            <button type="button" className="btn btn-outline-danger"><img height="20px" width="20px"  src="https://img.icons8.com/?size=100&id=FgOBVsURv5ar&format=png&color=000000" alt="Delete" />Delete</button>
                        </div>
                    </div>
                }
                {/* card-body */}
                <div className="card-body">
                    <h5 className="card-title">{job.profile}</h5>
                    <p className="card-text"><span className='fw-bold'>Responsiblities : </span>{job.desc}</p>
                    <p className="card-text"><span className='fw-bold '>Expreience : </span>{job.exp}</p>

                    {/* skills section */}
                    <div className="d-flex flex-wrap gap-3">
                        Skills :
                        {job.skills.map((skill, index) => (
                            <span key={index} className="badge rounded-pill text-bg-dark px-4 py-2">{skill}</span>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SingleJobPost