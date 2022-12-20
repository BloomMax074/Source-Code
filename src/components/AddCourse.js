import React from 'react';

const AddCourse = () => {
    return (
        <addcourse>
            <div className="add-course">
            <form>
                    <h1>Course Details</h1>
                    <form>
                        <div className="form-control">
                            <label for="course-id" id="course-id">
                                Course ID
                            </label>
                            <input type="int"
                                id="Course-id" 
                                placeholder="Enter Course ID" />
                        </div>
                        <div className="form-control">
			                <label for="name" id="label-name">
				                Name
			                </label>
			                <input type="text"
				                id="name"
				                placeholder="Enter Course Name" />
		                </div>
                        <div className="form-control">
			                <label for="description" id="label-description">
				                Description
			                </label>
			                <input type="text"
				                id="description"
				                placeholder="Enter Course Description" />
		                </div>
                        <table>
                            <tr>
                                <td>
                                    <input className="add-course-button" type={"button"} value="ADD COURSE"></input>
                                </td>
                            </tr>
                        </table>
                    </form>
            </form>
            </div>
        </addcourse>
    )
}

export default AddCourse