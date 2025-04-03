import { Form,Button } from "react-bootstrap";
import "./User.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () =>{

    const {id} = useParams();


    const [formData, setFormData] = useState({
        fName:"",
        lName:"",
        emailId:"",
        department:""
    });

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }

    useEffect(() =>{
        const fetchEmployee = async() =>{
            try{
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employee/${id}`);
                const data=await response.json();
                setFormData(data);
            }catch(error){
                console.log("Update fetching error", error.message);
            }
        }
        fetchEmployee();
    },[id]);

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employee/${id}`,{
                method: "PATCH",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            });
            const data=await response.json();
            console.log("Employee updated: ", data);
            navigate("/");

        }catch(error){
            console.log("Update error", error.message);
        }
    }

    return(
        <>
            <div className="center-form">
                <h1>Edit Employee</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="fName"
                            placeholder="Enter first name"
                            value={formData.fName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="lName"
                            placeholder="Enter last name"
                            value={formData.lName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="email"
                            name="emailId"
                            placeholder="Enter email id"
                            value={formData.emailId}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="department"
                            placeholder="Enter department"
                            value={formData.department}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button varing="primary" type="sumbit" className="w-100">Edit Employee</Button>

                </Form>
            </div>
        </>
    )
}

export default UpdateUser;