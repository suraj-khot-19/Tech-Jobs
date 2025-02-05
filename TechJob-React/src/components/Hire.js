import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleFeild from "./SingleFeild";
import {  toast } from 'react-toastify';

function Hire() {
    const navigate = useNavigate();

    let arr = ["Java", "Spring Boot", "SQL", "Hibernate", "MongoDB", "React", "HTML/CSS", "JavaScript"];

    const [data, setData] = useState({
        profile: "", exp: 1, skills: [], disc: "",
    });

    const [loading, setloading] = useState(false)

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
        setloading(true);

        try {
            const url = "http://localhost:8080/api/tech/job/new/post";
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (res.status === 200) {
                toast.success("Job post added successfully! ");
            } else {
                toast.error("Failed to add job post.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the job post.");
        } finally {
            setTimeout(() => {
                setloading(false);
                navigate("/");
            }, 1500);
        }
    };


    return (
        <>
            <div className="container" style={{ height: "100vh" }} >

                {/* Loading Overlay */}
                {loading && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light" style={{ opacity: 0.8, zIndex: 1050 }}>
                        <span className="fs-4 fw-bold" style={{ color: "black" }}>Loading...</span>
                    </div>
                )}

                <h1 className="text-center py-4">💻 Tech Job 💸</h1>

                <form onSubmit={handleSub}>
                    {/* Profile */}
                    <SingleFeild title="Profile" handleOnChange={handleOnChange} value={data.profile} name="profile" />

                    {/* Description */}
                    <SingleFeild title="Description" handleOnChange={handleOnChange} value={data.disc} name="disc" />


                    {/* Experience */}
                    <SingleFeild title="Experience" handleOnChange={handleOnChange} value={data.exp} name="exp" />


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
