import React from "react"

const AddSession = () => {
    return (
        <addsession>
            <div className="add-session">
                <form>
                    <h1>Session Details</h1>
                    <form>
                        <div className="form-control">
			                <label for="name" id="label-name">
				                Name
			                </label>
			                <input type="text"
				                id="name"
				                placeholder="Enter Session Name" />
		                </div>
                        <div className="form-control">
			                <label for="description" id="label-description">
				                Description
			                </label>
			                <input type="text"
				                id="description"
				                placeholder="Enter Session Description" />
		                </div>
                        <div className="form-control">
                            <label for="lecture-id" id="lecture-id">
                                Lecture ID
                            </label>
                            <input type="int"
                                id="lecture-id" 
                                placeholder="Enter Lecture ID" />
                        </div>
                        <div className="form-control">
                            <label for="time" id="label-start-time">
                                Start Time
                            </label>
                            <input type="time"
                                id="time"
                                placeholder="Session Start Time" 
                                min="7:00" max="17:00" required/>
                        </div>
                        <div className="form-control">
                            <label for="time" id="label-end-time">
                                End Time
                            </label>
                            <input type="time"
                                id="time"
                                placeholder="Session End Time" 
                                min="7:00" max="17:00" required/>
                        </div>
                        <table>
                            <tr>
                                <td>
                                    <input className="add-session-button" type={"button"} value="ADD SESSION"></input>
                                </td>
                            </tr>
                        </table>
                    </form>
                </form>
            </div>
        </addsession>
    )
}

export default AddSession
