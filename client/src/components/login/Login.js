import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser, loginrUser } from "../../JS/actions/userAction";
import "./Login.css";

const Login = () => {
const history=  useHistory()
  const [name, setName] = useState("");
  const [pseduo, setPseduo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    if (name && pseduo && email && password) {
      dispatch(registerUser({ name, pseduo, email, password },history)) ;
      
    }
    e.preventDefault();
  };
  const handleSubmit2 = (e)=>{
    if ( email && password) {
      dispatch(loginrUser({email, password },history));
    }
    e.preventDefault();
  }

  return (
    <div>
      <div className="corps">
        <div className="main">
          <input className="input" type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form onSubmit={handleSubmit}>
              <label className ="label" htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input className="input"
                type="text"
                name="txt"
                placeholder="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input className="input"
                type="text"
                name="txt"
                placeholder="Pseduo"
                required
                onChange={(e) => setPseduo(e.target.value)}
              />
              <input className="input"
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="button" type="submit">Sign up</button>
            </form>
          </div>
          <div className="login">
            <form onSubmit= {handleSubmit2}>
              <label className ="label" htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input className="input" type="email" name="email" placeholder="Email" required  onChange={(e) => setEmail(e.target.value)} />
              <input className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="button" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
