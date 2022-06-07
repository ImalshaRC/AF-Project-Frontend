import React, { useEffect,useState } from "react";
import {  Button, Grid, Paper } from "@mui/material";
import axios from "axios";
// import Background from './../../images/Group/group_background_image.png';
import { Link, useNavigate, useParams } from 'react-router-dom';

const paperStyle={backgroundColor: "#FFB47F", padding:50, height:'auto', width:700, margin:'20px auto'};
// const textStyle={ height:'auto', width:400,textAlign: "right"};
const btnStyle={margin:'20px 0'};
const text={fontFamily: "Cursive"};
const fromun = {margin:'30px auto'};

 function CoTopicUpdate(){
    const { id } = useParams();

    const [oneTopic, setOneTopic] = useState({
        person1: "",
        topic: "", 
        coSupervisor: "",
        coSupervisorOpinion: ""
    });

    const { person1, topic, coSupervisor, coSupervisorOpinion } = oneTopic;

    const onInputChange = e => {
        setOneTopic({...oneTopic, [e.target.name]: e.target.value});
    }

    useEffect(()=> {  
        const loggedInUser = localStorage.getItem("username");

        if (!loggedInUser){
        window.location = "/signin"
        }else{
            const username = (JSON.parse(loggedInUser)).toUpperCase();
            // setusername(username);
        }
        
        getTopic();
    }, [])

    function getTopic(){
        axios.get("http://localhost:4500/topic/spesific-topic/" + id)
        .then((res)=>{
            setOneTopic(res.data);
            // console.log(res.data)
        }).catch((err)=>{
           alert(err.massage);
        })
    }

    function sendData(e){  
        e.preventDefault();
  
        axios.put('http://localhost:4500/topic/up-co-opinion/' + id, oneTopic).then(() => {
            alert("Updated Successfully");
            window.location = ("/dashboard/Co_Topic_reqests");
          }).catch((err)=>{
              alert(err);
          })
      }

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
                    <label style={text} for="name" >Student ID</label>
                    <input name="person1" value={person1} maxlength="10" className="form-control"/>
                </div>           
            
                <div style={fromun}>                
                    <label style={text} for="name" >Topic</label>
                    <input type="text" name="topic" value={topic} placeholder="Enter" required className="form-control"/>
                </div>           
            
                <div style={fromun}>
                    <label style={text} for="name">Supervisor</label>
                    <input  type="text" name="coSupervisor" value={coSupervisor} placeholder="Enter " required className="form-control"/>                    
                </div>

                <div style={fromun}>
                    <label style={text} for="name">Co-Supervisor Opinion</label>
                    <select name="coSupervisorOpinion" value={coSupervisorOpinion} onChange={onInputChange} className="form-control">
                        <option>Select Opinion</option>
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                    </select>
                </div>

                <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Submit</Button>
            
            </form>
        </div>
        </Paper>
    </Grid>

    )


}

export default CoTopicUpdate;