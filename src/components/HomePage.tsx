import React, { FormEvent, useState, useEffect } from "react";
import axios from 'axios'

interface Plant {
    name: string;
    location: string; 
    age: number;
    description: string;
    watered: string;
}

const HomePage: React.FC = () => {
    const [input, setInput] = useState<Plant>({
        name: '',
        location: '',
        age: 0,
        description: '',
        watered: ''
    });
    const [data, setData] = useState<Plant[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token")
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/plants", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json',
                    }
                })
                console.log(response.data)
                setData(response.data);
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setInput((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }
    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        console.log(token)
        try {
            const response = await axios.post('http://localhost:8080/api/plant', input, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, 
            })
            console.log(response.data)
            if (response.status === 200) {
                setData(prevData => [...prevData, response.data])
                alert("Your data was successfuly saved")
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Name:
                    <input type="text" name="name" value={input.name} onChange={handleInputChange}/> 
                </label>
                <label>Location:
                    <input type="text" name="location" value={input.location} onChange={handleInputChange}/>
                </label>
                <label>Days since plant was owned:
                    <input type="number" name="age" value={input.age} onChange={handleInputChange}/>
                </label>
                <label>Description:
                    <input type="text" name="description" value={input.description} onChange={handleInputChange}/>

                </label>
                <label>Last watered:
                    <input type="text" name="watered" value={input.watered} onChange={handleInputChange}/>
                </label>
                <button type="submit">Enter</button>
            </form>
            <div>{data.length>0?(
                 <ul>
                    {data.map((item,index) => (
                        <li key={index}>{item.age} {item.description} {item.location}
                        </li>
                    ))}
                </ul>
            ): (
                <p>No data available for now</p> 
            )}</div>           
        </div>
    )
}

export default HomePage;