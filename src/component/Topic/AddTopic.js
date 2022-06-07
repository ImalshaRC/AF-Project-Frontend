import React, { useEffect,useState } from "react";
import {  Button, Grid, Paper } from "@mui/material";
import axios from "axios";
// import Background from './../../images/Group/group_background_image.png';
import { Link, useNavigate } from 'react-router-dom';

const paperStyle={backgroundColor: "#FFB47F", padding:50, height:'auto', width:700, margin:'20px auto'};
// const textStyle={ height:'auto', width:400,textAlign: "right"};
const btnStyle={margin:'20px 0'};
const text={fontFamily: "Cursive"};
const fromun = {margin:'30px auto'};

 function AddTopic(){

    const [topic, setTopic] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [supervisorOpinion, setSupervisorOpinion] = useState("pending");
    const [finalDecision, setFinalDecision] = useState("pending");
    const [document, setDocument] = useState("");
    const [coSupervisor, setCoSupervisor] = useState("");
    const [coSupervisorOpinion, setCoSupervisorOpinion] = useState("pending");


    
    const [username, setusername] = useState([]);

    function sendData(e){
        e.preventDefault();

        
        const newTopic={

            person1 :  username,
            topic, 
            supervisor,
            supervisorOpinion,
            finalDecision,
            document,
            coSupervisor,
            coSupervisorOpinion
        }

        // console.log(newTopic)
        
        axios.post("http://localhost:4500/topic/add",newTopic).then(()=>{
        alert("Topic Added")
        
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
        <Grid style={{backgroundColor: "#FFF5EE"}} >
            {/* <Link to={`/dashboard/Group`} style={{ textDecoration: 'none'}}><Button class="btn btn-outline-success" style={{margin:'50px 0px 0px 50px'}} size="small" color="primary">
            registered groups
            </Button></Link> */}
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'  >
          <h2 style={{color: "#143468"}} >Topic Registration</h2>
        </Grid>
        <div>
            <form onSubmit={sendData}>
                <div style={fromun} >
                    <label style={text} for="name" >Leader(1) IT Number  :</label>
                    {/* <label >{username}</label> */}
                    <input     id="person1"  value={username} maxlength="10" className="form-control"/>
                </div>
            
            
                <div style={fromun}>
                
                    <label style={text} for="name" >Topic  :</label>
                    <input  type="text"  id="person2"  placeholder="Enter "   required className="form-control"
                    onChange={(e)=>{
                        setTopic(e.target.value);
                    }}/>
                </div>
            
            
                <div style={fromun}>
                    <label style={text} for="name">Supervisor  :</label>
                    <input  type="text"  id="person3"  placeholder="Enter "   required className="form-control"
                    onChange={(e)=>{

                        setSupervisor(e.target.value);

                    }}/>
                    
                </div>
            
            
                
                    
               
                <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Submit</Button>
            
            </form>
        </div>
        </Paper>
    </Grid>

    )


}

export default AddTopic;