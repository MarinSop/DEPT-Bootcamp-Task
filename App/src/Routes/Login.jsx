import { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../Components/NavbarComponent";
import './Login.css'

const Login = () => {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMsg, setErrorMsg] = useState('\u00A0');

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
                const errStr = error.errors.map(e => e.message).join(". ");
                throw new Error(errStr);
            }

            const data = await response.json();
            login(data.data);
            navigate("/");

        }
        catch(err)
        {
            setErrorMsg(err.message);
        }

    }

    return (
        <main>
            <NavbarComponent />
            <p className="error-msg">{errorMsg}</p>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input 
                        name="email"
                        type="email"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        required/>

                    <label>Password</label>
                    <input 
                        name="password"
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        required/>
                    <button>Login</button>
                </form>
            </div>
        </main>
    );

}

export default Login;