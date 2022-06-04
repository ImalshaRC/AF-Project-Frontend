import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import Logo from './../../images/SignIn&SignUp/sliit_logo.png';
import axios from 'axios';
import LoginNav from "../SignInNav/LoginNav";


const paperStyle={padding:20, height:'auto', width:300, margin:'20px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};
const bottomText={margin:'10px 0px 10px 0px'};
const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
                  backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
                };

const SignUp=()=>{

  const navigate = useNavigate();

  const [credentials,setCredentials] = useState({
    email:'',
    password:'',
    cpassword:''
  });

  const [error,setError] = useState("")
  
  const handleChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value});}

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!(credentials.password===credentials.cpassword)){
      alert("Error in password");
    }else{
      try{
        const user = {
          "email":credentials.email,
          "password":credentials.password
        }
        console.log(user);

        await axios.post("http://localhost:4500/user/add",user).then(() => {
          alert("please check your email");
          navigate('/signin');
        })
        
        
      }catch(error){
        console.log(error)
        if(
          error.response &&
          error.response.status >=400 &&
          error.response.status <=500
        ){
          setError(error.response.data.message);
        }
      }
    }
  }


  return(
    <Grid>
      <LoginNav/>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <img src={Logo} alt="Logo" />
          <h2>Sign Up </h2>
        </Grid>
        <form onSubmit={handleSubmit}>
        <TextField label="Enter SLIIT Email Address" type="email" name="email" fullWidth required style={textStyle} value={credentials.email} onChange={handleChange} />
        <TextField label="Password"  type="password" name="password" fullWidth required style={textStyle} value={credentials.password} onChange={handleChange}/>
        <TextField label="Confirm Password"  type="password" name="cpassword" fullWidth required style={textStyle} value={credentials.cpassword} onChange={handleChange}/>
        {error && <div style={errorMsg}>{error}</div>}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Sign Up</Button>
        </form>
        <div align='center' style={bottomText}>
        <Typography>Do you have an account?
          <Link href="signin">
            Sign In
          </Link>
        </Typography>
        </div>
      </Paper>
    </Grid>
  );
}


export default SignUp;