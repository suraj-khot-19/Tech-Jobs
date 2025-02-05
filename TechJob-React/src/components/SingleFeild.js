import React from 'react'

function SingleFeild({ title, handleOnChange, value, name }) {
    return (
        <div className="row mb-4">
            <label htmlFor={name} className="col-sm-2 col-form-label">{title}</label>
            <div className="col-sm-10">
                {
                    name === "desc" ?
                        <textarea type="text" className="form-control" id="desc" name={name} value={value} onChange={handleOnChange} rows={3} />
                        :
                        <input type={`${name === 'exp' ? "number" : "text"}`} className="form-control" id="profile" name={name} value={value} onChange={handleOnChange} />
                }
            </div>
        </div>
    )
}

export default SingleFeild