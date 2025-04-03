import { Form,Button } from "react-bootstrap";
import "./User.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostUser = () =>{

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

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(formData);

        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addEmployee`,{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            });

            const data=await response.json();
            console.log("Employee created: ", data);
            navigate("/");
        }catch(error){
            console.log("Post error", error.message);
        }
    }

    return(
        <>
            <div className="center-form">
                <h1>Add New Employee</h1>
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

                    <Button varing="primary" type="sumbit" className="w-100">Add Employee</Button>

                </Form>
            </div>
        </>
    )
}

export default PostUser;