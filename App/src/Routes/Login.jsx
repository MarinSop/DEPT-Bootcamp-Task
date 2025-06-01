import { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMsg, setErrorMsg] = useState();

    const handleSubmit = async (f) => {
        f.preventDefault();
        setErrorMsg();
        
        try
        {
            const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email, password})
            })

            if(!response.ok)
            {
                const error = await response.json();
                throw new Error(error.errors[0].message);
            }

            const data = await response.json();
            login(data.data);
            navigate("/");

        }
        catch(err)
        {
            console.log(err.message);
            setErrorMsg(err.message);
        }

    }

    return (
        <div className="login-form">
            <p>{errorMsg}</p>
            <form onSubmit={handleSubmit}>
                <label >Email</label>
                <input 
                    type="email"
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                    required/>

                <label>Password</label>
                <input 
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    required/>
                <button>Login</button>
            </form>
        </div>
    );

}

export default Login;