import React from 'react'
import i from "../assets/image.png"

function Home() {
    return (
        <div 
            style={{ 
                backgroundImage: `url(${i})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                height: '100vh', 
                width: '100vw',
                backgroundColor:'rgba(10,10,10,10,0.1)'
            }}
        >
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center p-4 my-auto" style={{ height: '100vh' }}>
                    <button type="button" className="m-3 btn btn btn-warning btn-lg" style={{ width: '150px' }}>Post Job</button>
                    <button type="button" className="m-3 btn btn-warning btn-lg" style={{ width: '150px' }}>View Jobs</button>
                </div>
            </div>
        </div>
    )
}

export default Home
