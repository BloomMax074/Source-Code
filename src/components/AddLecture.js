import React from 'react';

const AddLecture = () => {
    return (
        <addlecture>
            <div className="add-lecture">
            <form>
                    <h1>Lecture Details</h1>
                    <form>
                        <div className="form-control">
                            <label for="lecture-id" id="label-lecture-id">
                                Lecture ID
                            </label>
                            <input type="int"
                                id="lecture-id" 
                                placeholder="Enter Lecture ID" />
                        </div>
                        <div className="form-control">
			                <label for="name" id="label-name">
				                Name
			                </label>
			                <input type="text"
				                id="name"
				                placeholder="Enter Lecture Name" />
		                </div>
                        <div className="form-control">
			                <label for="description" id="label-description">
				                Description
			                </label>
			                <input type="text"
				                id="description"
				                placeholder="Enter Lecture Description" />
		                </div>
                        <input className="add-lecture-button" type={"button"} value="ADD LECTURE"></input>
                    </form>
            </form>
            </div>
        </addlecture>
    )
}

export default AddLecture