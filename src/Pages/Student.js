import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

class Student extends Component {

    state = {
        students: [],
        loading:true,
    }

    
    async componentDidMount() {

        const res = await axios.get('http://localhost:8000/api/students');
        // console.log(res);

        if(res.data.status === 200)
        {
            this.setState({
                students: res.data.students,
                loading: false
            })
        }
    }

    deleteStudent = async (e, id) => {

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        thisClicked.innerText = "Deleting";

        const res = await axios.delete(`http://localhost:8000/api/delete-student/${id}`);
        if(res.data.status === 200)
        {
            Swal.fire({
                title: 'Deleted!',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'Ok!'
            })

            thisClicked.closest("tr").remove();
            console.log(res.data.message);
        }
    }


    render() {

        var student_HTML_TABLE = "";

        if(this.state.loading)
        {
            student_HTML_TABLE = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>
        }
        else
        {
            student_HTML_TABLE = this.state.students.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                            <Link to={`edit-student/${item.id}`} className="btn btn-success btn-sm">Edit</Link>    
                        </td>
                        <td>
                            <button type="button" onClick={(e) => this.deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Student List
                                    <Link to={'add-student'} className="btn btn-primary btn-sm float-end">Add Student</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Course</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTML_TABLE}                            
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Student;