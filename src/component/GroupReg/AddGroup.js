import React, { useEffect,useState } from "react";
import {  Button, Grid, Paper } from "@mui/material";
import axios from "axios";
// import Background from './../../images/Group/group_background_image.png';
import { Link, useNavigate } from 'react-router-dom';

const paperStyle={backgroundColor: "#bbd9f7", padding:50, height:'auto', width:700, margin:'-30px auto'};
// const textStyle={ height:'auto', width:400,textAlign: "right"};
const btnStyle={margin:'20px 0'};
const text={fontFamily: "Cursive"};
const fromun = {margin:'30px auto'};

 function AddGroup(){

    // const [person1, setPerson1] = useState("");
    const [person2, setPerson2] = useState("");
    const [person3, setPerson3] = useState("");
    const [person4, setPerson4] = useState("");
    const [panelMember, setPanelMember] = useState("");

    
    const [username, setusername] = useState([]);

    function sendData(e){
        e.preventDefault();

        
        const newGroup={

            person1 :  username,
            person2, 
            person3,
            person4,
            panelMember
        }
        
        axios.post("http://localhost:4500/groups/add",newGroup).then(()=>{
        alert("Group Added")
        
    }).catch((err)=>{
        alert(err)
    })
        
    }


    
    useEffect(()=>{
        const loggedInUser = localStorage.getItem("username");
        // const loggedInUserId = localStorage.getItem("userId");

        if (!loggedInUser){
        window.location = "/signin"
        }else{
            const username = (JSON.parse(loggedInUser)).toUpperCase();
            setusername(username);

        }

        
    },[])



    return(
        <Grid >
            <Link to={`/dashboard/Group`} style={{ textDecoration: 'none'}}><Button class="btn btn-outline-success" style={{margin:'50px 0px 0px 50px'}} size="small" color="primary">
            registered groups
            </Button></Link>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Group Registration Form</h2>
        </Grid>
        <div>
            <form onSubmit={sendData}>
            
            
                <div style={fromun} >
                
                    <label style={text} for="name" >Leader(1) IT Number  :</label>
                
                    {/* <label >{username}</label> */}
                    <input     id="person1"  value={username} maxlength="10" className="form-control"/>
                  
                </div>
            
            
                <div style={fromun}>
                
                    <label style={text} for="name" >2nd person IT Number  :</label>
                
                
                
                    <input  type="text"  id="person2" maxlength="10" placeholder="Enter IT number" pattern="IT[0-9]+$" title="IT should only contain upercase letters. e.g. IT12345678" required className="form-control"
                    onChange={(e)=>{

                        setPerson2(e.target.value);

                    }}/>
                
                </div>
            
            
                <div style={fromun}>
                    <label style={text} for="name">3rd person IT Number  :</label>
                    <input  type="text"  id="person3" maxlength="10" placeholder="Enter IT number" pattern="IT[0-9]+$" title="IT should only contain upercase letters. e.g. IT12345678" required className="form-control"
                    onChange={(e)=>{

                        setPerson3(e.target.value);

                    }}/>
                    
                </div>
            
            
                <div style={fromun}>
                    <label style={text} for="name">4th person IT Number  :</label>
                    <input  type="text"  id="person4" maxlength="10" placeholder="Enter IT number" pattern="IT[0-9]+$" title="IT should only contain upercase letters. e.g. IT12345678" required className="form-control"
                    onChange={(e)=>{

                        setPerson4(e.target.value);

                    }}/>
                    
                </div>
               
                <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Submit</Button>
            
            </form>
        </div>
        </Paper>
    </Grid>

    )


}

export default AddGroup;