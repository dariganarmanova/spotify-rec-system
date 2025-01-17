import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './main.css'

interface LogInProps {
    username: string;
    password: string;
}

const LogIn: React.FC = () => {
    const [username,setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault(); 
        try{
            const logIn: LogInProps = {
                username, 
                password
            }
            const result = await axios.post('http://localhost:8080/api/login', logIn, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (result.status === 200) {
                navigate('/spoti');
                const token = result.data.token;
                localStorage.setItem("token", token)
                console.log(token)
            }
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div className = "containerAuthLog">
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogIn;