import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

class AddStudent extends Component {
    state = {
        name: '',
        course: '',
        email: '',
        phone: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveStudent = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:8000/api/add-student', this.state);

        if(res.data.status === 200)
        {
            // console.log(res.data.message);
            Swal.fire({
                title: 'Success!',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'Ok!'
            });
            this.setState({
                name: '',
                course: '',
                email: '',
                phone: '',
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Student
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>

                            <div className="card-body">
                                <form onSubmit={this.saveStudent}>

                                    <div className="form-group mb-3">
                                        <label>Student Name</label>
                                        <input type="text" className="form-control" name="name" onChange={this.handleInput} value={this.state.name}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student email</label>
                                        <input type="text" className="form-control" name="email" onChange={this.handleInput} value={this.state.email}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student course</label>
                                        <input type="text" className="form-control" name="course" onChange={this.handleInput} value={this.state.course}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" className="form-control" name="phone" onChange={this.handleInput} value={this.state.phone}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Student</button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddStudent;

