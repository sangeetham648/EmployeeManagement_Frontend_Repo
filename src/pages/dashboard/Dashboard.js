import { Container, Col, Row, Table, Button} from "react-bootstrap";
import "./Dashboard.css"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const Dashboard = () =>{

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchEmployees = async() =>{
           
            try{
                const response = await fetch("http://localhost:8080/api/allEmployees");
                const data=await response.json();
                setEmployees(data);
            }catch(error){
                console.log("Get error", error.message);
            }
        }
        fetchEmployees();
    },[]);

    const handleDelete = async (employeeId) =>{
        try{
            const response = await fetch(`http://localhost:8080/api/deleteEmployee/${employeeId}`,{
                method: "DELETE",
            });
            if(response.ok){
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee)=> employee.id !== employeeId)
                )
            }
            console.log(`Employee with ID ${employeeId} deleted successfully`);
        }catch(error){
            console.log("Delete error", error.message);
        }
    }

    const handleUpdate = (employeeId) =>{
        navigate(`/employee/${employeeId}`);
    }

    const handleView = (employeeId) =>{
        navigate(`/viewEmployee/${employeeId}`);
    }

    return(
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1>Employees Details</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Id</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee)=>
                                    <tr key={employee.id}>
                                        <td>{employee.fName}</td>
                                        <td>{employee.lName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={()=> handleUpdate(employee.id)}>Edit</Button>{"   "}
                                            <Button variant="outline-danger" onClick={()=> handleDelete(employee.id)}>Delete</Button>{"   "}
                                            <Button variant="outline-primary" onClick={()=> handleView(employee.id)}>View</Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;