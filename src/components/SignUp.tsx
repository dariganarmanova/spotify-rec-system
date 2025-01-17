import React, {useState} from "react";
import axios from 'axios';
import './main.css'
import { useNavigate } from "react-router-dom";

interface SignUpProp {
    username: string;
    email: string;
    password: string;
}

const SignUp = () => {  
    const [username,setUsername] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            const newUser: SignUpProp = {
                username,
                password,
                email
            }
            const response = await axios.post("http://localhost:8080/api/signup", newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert("Sign In successful")
                navigate('/spoti');
                //const token = response.data.token;
                //localStorage.setItem("token",token);
            } else {
                console.log("Some error")
            }
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div className="containerAuth">
            <form onSubmit={handleSubmit}>
                <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} type="email"/>
                <input placeholder = 'name' value={username} type="text" onChange={(e) => setUsername(e.target.value)}/> 
                <input placeholder='password' value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Sign Up</button>
            </form>

        </div>
    )
}

export default SignUp;
