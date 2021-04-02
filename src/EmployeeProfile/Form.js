import React, { Component } from 'react'
import avatar from '../Image/avatar.png'

const initialState = {
    name: "",
    nameErr: "",
    designation: "",
    desgErr: "",
    PhoneNumber: [{ type: "", phone: "" },],
    skill_row: [{ skill: "" }],
    dob: ""
}

export class Form extends Component {

    constructor(props) {
        super(props)

        this.state = initialState;

        this.getData = this.getData.bind(this);

    }

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox ? event.target.checked : event.target.value
        });
    };

    validate = () => {
        let nameErr = "";
        let desgErr = "";
        if (!this.state.name) {
            nameErr = "Please Enter Name.It Cannat remain empty";
        }
        else if (this.state.name.length < 3) {
            nameErr = "Length of name is incorrect. There should be atleast 3 letter";
        }
        else if (!this.state.name.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
            nameErr = "There should only Letters"
        }

        if (!this.state.designation) {
            desgErr = "Please enter Designation";
        }
        else if (!this.state.designation.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
            desgErr = "There should only Letters"
        }

        if (nameErr || desgErr) {
            this.setState({ nameErr, desgErr });
            return false;
        }

        return true;
    };


    addSkills() {
        this.setState({ skill_row: [...this.state.skill_row, ""] })

    }

    handlerow(e, index) {
        this.state.skill_row[index] = e.target.value
        this.setState({ skill_row: this.state.skill_row })
    }

    removeSkill(index) {
        this.state.skill_row.splice(index, 1);
        this.setState({ skill_row: this.state.skill_row });
    }

    handlePhone(e, index) {
        this.state.PhoneNumber[index][e.target.name] = e.target.value
        this.setState({ PhoneNumber: this.state.PhoneNumber })
    }

    addNumber() {

        this.setState({ PhoneNumber: [...this.state.PhoneNumber, { type: "", phone: "" }] })
    }

    removeNumber(index) {
        this.state.PhoneNumber.splice(index, 1);
        this.setState({ PhoneNumber: this.state.PhoneNumber });
    }

    Submit = event => {
        event.preventDefault();

        if (this.validate()) {

            let TotalData = []

            let obj = this.state
            if (localStorage.getItem('mydata')) {
                TotalData = JSON.parse(localStorage.getItem('mydata'))

            }
            TotalData.push(obj)
            localStorage.setItem('mydata', JSON.stringify(TotalData))

            alert("Employees Details Saved Successfully")
            //clear form
            this.setState(initialState);


        }
    }

    getData() {
        let data = localStorage.getItem('mydata');
        data = JSON.parse(data);

        return data
    }

    render() {
        const allEmp = this.getData()
        return (
            <div>
                <div>
                    <h1>Employee's Details</h1>
                    <h3>Please enter your Personal Details</h3>
                </div>
                <div class="container">

                    <div className="avatar">
                        <div className="profile">
                            <img src={avatar} />
                        </div>
                        <div><h3>Employee Name</h3></div>
                    </div>
                    <div className="allFields">
                        <div className="input2">
                            <div>
                                <label className="label">Name:</label>
                                <div>
                                    <input type="text" className="inputbox" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <p style={{ color: "red" }}>{this.state.nameErr}</p>
                            </div>


                            <div>
                                <label className="label">Designation: </label>
                                <div>
                                    <input type="text" name="designation" className="inputbox" placeholder="Designation" value={this.state.designation} onChange={this.handleChange} />

                                </div>
                                <p style={{ color: "red" }}>{this.state.desgErr}</p>
                            </div>
                        </div>

                        <div>
                            <label className="label">Contact Details: </label>
                            <div className="">
                                {this.state.PhoneNumber.map((number, index) => (
                                    <div className="input2" key={index}>
                                        <input type="text" className="inputbox" name="type" placeholder="Type" value={number.type} onChange={this.handleChange, (e) => this.handlePhone(e, index)} />

                                        <input type="Number" className="Numinputbox" name="phone" placeholder="Phone Number" value={number.phone} onChange={this.handleChange, (e) => this.handlePhone(e, index)} />
                                        {/* {this.state.PhoneNumber.length !== 1 && <button onClick={() => this.removeNumber(index)}>Remove</button>} */}



                                        {this.state.PhoneNumber.length !== 1 && <button className="removeBtn" onClick={() => this.removeNumber(index)}>Remove</button>}

                                    </div>
                                ))}
                                <button className="addNewRow" onClick={(e) => this.addNumber(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#00188D">
                                        <path strokeLinecap="round" strokeLinejoin="round" stroke="#c22d2d" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                        <div>
                            <label className="label">Skills: </label>
                            <div>
                                {this.state.skill_row.map((skil, index) =>
                                (
                                    <div key={index}>

                                        <input type="text" className="inputbox" name="skill" placeholder="Enter your Skills" value={skil.skill} onChange={this.handleChange, (e) => this.handlerow(e, index)} />
                                        {this.state.skill_row.length !== 1 &&
                                            <button className="removeBtn" onClick={() => this.removeSkill(index)}>Remove</button>}
                                    </div>
                                )
                                )}

                                <button className="addNewRow" onClick={(e) => this.addSkills(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke="#00188D">
                                        <path strokeLinecap="round" strokeLinejoin="round" stroke="#c22d2d" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                        <div>
                            <label className="label">Date Of Birth: </label>
                            <div>
                                <input type="date" className="inputbox" placeholder="Date of Birth" name="dob" value={this.state.dob} onChange={this.handleChange} />

                            </div>
                        </div>


                        <div class="Btns">
                            <button className="addEmpBtn" onClick={(e) => this.Submit(e)}>Add Employee</button>
                            <button class="addEmpBtn" type="submit" onClick={this.getData}>Show Data</button>

                        </div>
                    </div>

                </div>

                <div className="showData">
                    <table>

                        {allEmp.map(detail => (
                            <tbody>
                                <tr><td>
                                    <p className="dataStyle"> Name : {detail.name}</p></td>
                                </tr>
                                <tr>
                                    <p className="dataStyle">Designation: {detail.designation}</p>
                                </tr>
                                <tr>
                                    {detail.PhoneNumber.map(phoneDetails => (
                                        <tr>
                                            <tr>
                                                <p className="dataStyle">Contact : type - {phoneDetails.type} </p>
                                            </tr>
                                            <tr>
                                                <p className="dataStyle">Phone- {phoneDetails.phone}</p>
                                            </tr>
                                        </tr>
                                    ))}
                                </tr>
                                {/* {detail.skill_row.map((value,index) => (
                                    <p key={index}>{value}</p>
                                ))} */}
                                {/* {detail.skill_row[.map((value ,index) => <p key={index}>{value}</p>])} */}
                                <tr>
                                    <p className="dataStyle">Date Of Birth: {detail.dob}</p>
                                </tr>
                            </tbody>

                        ))}
                    </table>
                </div>
            </div >
        )
    }
}

export default Form

