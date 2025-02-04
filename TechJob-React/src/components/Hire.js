import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hire() {
    const navigate = useNavigate();

    let arr = ["Java", "Spring Boot", "SQL", "Hibernate", "MongoDB", "React", "HTML/CSS", "JavaScript"];

    const [data, setData] = useState({
        profile: "", exp: 1, skills: [], disc: "",
    });

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setData((prevData) => ({
                ...prevData,
                skills: checked
                    ? [...prevData.skills, name]
                    : prevData.skills.filter((skill) => skill !== name),
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSub = async (e) => {
        e.preventDefault();
        // console.log(data);
        const url = "http://localhost:8080/api/tech/job/new/post";

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const json = await response.json();
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };


    return (
        <>
            <div className="container" style={{height:"100vh"}} >
                <form onSubmit={handleSub}>
                    {/* Profile */}
                    <div className="row mb-4">
                        <label htmlFor="profile" className="col-sm-2 col-form-label">Profile</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="profile" name="profile" value={data.profile} onChange={handleOnChange} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="row mb-4">
                        <label htmlFor="desc" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" id="desc" name="disc" value={data.disc} onChange={handleOnChange} rows={3} />
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="row mb-4">
                        <label htmlFor="exp" className="col-sm-2 col-form-label">Experience</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="exp" name="exp" value={data.exp} min="0" onChange={handleOnChange} />
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="row mb-4">
                        <label className="col-sm-2 col-form-label">Skills</label>
                        <div className="col-sm-10">
                            {arr.map((skill, index) => (
                                <div className="form-check" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`skill-${index}`}
                                        name={skill}
                                        checked={data.skills.includes(skill)}
                                        onChange={handleOnChange}
                                    />
                                    <label className="form-check-label" htmlFor={`skill-${index}`}>
                                        {skill}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="form-check mb-4">
                        <input className="form-check-input" type="checkbox" id="terms" required />
                        <label className="form-check-label" htmlFor="terms">
                            Accept terms and conditions*
                        </label>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <button disabled={data.profile.trim() === "" || data.disc.trim() === "" || data.skills.length === 0}
                            type="submit" className="btn btn-primary btn-lg px-4 py-2">
                            Post
                        </button>
                        <button onClick={() => navigate("/")} className="btn btn-primary btn-lg px-4 py-2">
                            ←  Back
                        </button>
                    </div>

                </form>

            </div>
        </>
    );
}

export default Hire;
