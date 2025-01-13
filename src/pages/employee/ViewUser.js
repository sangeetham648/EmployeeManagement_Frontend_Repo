import { Form,Button } from "react-bootstrap";
import "./User.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

const ViewUser = () =>{

    const {id} = useParams();

    const [formData, setFormData] = useState({
        fName:"",
        lName:"",
        emailId:"",
        department:""
    });


    useEffect(() =>{
        const fetchEmployee = async() =>{
            try{
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data=await response.json();
                setFormData(data);
            }catch(error){
                console.log("Fetching error", error.message);
            }
        }
        fetchEmployee();
    },[id]);

    return(
        <>
            <div className="center-form">
                <h1>View Employee</h1>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="fName"
                            placeholder="Enter first name"
                            defaultValue={formData.fName}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="lName"
                            placeholder="Enter last name"
                            defaultValue={formData.lName}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="email"
                            name="emailId"
                            placeholder="Enter email id"
                            defaultValue={formData.emailId}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="department"
                            placeholder="Enter department"
                            defaultValue={formData.department}
                        />
                    </Form.Group>

                    <Button varing="primary" type="" as={Link} to="/" className="w-100">Go to Employee details</Button>

                </Form>
            </div>
        </>
    )
}

export default ViewUser;