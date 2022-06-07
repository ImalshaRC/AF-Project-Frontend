import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
// import bcrypt from "bcryptjs/dist/bcrypt";

import AppLogo from './../../images/SignIn&SignUp/lwre.png';
import Logo from './../../images/SignIn&SignUp/sliit_logo.png';

const paperStyle={padding:20, height:'auto', width:300, margin:'20px auto'};
const paperStyle2={padding:10};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};
const typoStyle={align:'center'};
const bottomText={margin:'10px 0px 10px 0px'}
const bottomTextOr={margin:'10px 0px 10px 0px', fontSize:'50px'}

const SignIn=()=>{

  const [input,setInput] = useState({
    
  });
  
  const handleChange = (e) =>{
    setInput({...input,[e.target.name]:e.target.value});
    
  }

  const handleSubmit = (e) =>{

    e.preventDefault();

    // input.password = bcrypt.hashSync(input.password,'$2a$10$CwTycUXWue0Thq9StjUM0u')
    // input.password = hashedPassword;
    
    // console.log(input);
  }

  const googleSignIn = (e) =>{
    // console.log("Google Sign In");
  }

  return(
    <Grid>
      <Paper elevation={10} style={paperStyle2}>
        <div align="left">
        <img src={AppLogo} alt="Logo" />
        </div>
        </Paper>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <img src={Logo} alt="Logo" />
          <h2>Sign In </h2>
        </Grid>
        <form onSubmit={handleSubmit}>
        <TextField label="Enter SLIIT Email Address" type="email" name="email" fullWidth required style={textStyle} value={input.email} onChange={handleChange} />
        <TextField label="Password"  type="password" name="password" fullWidth required style={textStyle} value={input.password} onChange={handleChange}/>
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Sign In</Button>
        </form>
        <div align='center' style={bottomText}>
          <div  className={typoStyle}>
        <Typography>
          <Link href="#">
          Forgot Password?
          </Link>
        </Typography>
        </div>
        </div>
        <div align='center'style={bottomText}>
        <Typography>Don't you have an account?
          <Link href="signup">
            Sign Up
          </Link>
        </Typography>
        </div>
        <div align='center'style={bottomTextOr}>
        <Typography> Or </Typography>
        </div>
        <div align="center">
        <GoogleButton fullWidth type="light" label="Continue with Google" onClick={googleSignIn}/>
        </div>
        
      </Paper>
    </Grid>
  );
}


export default SignIn;