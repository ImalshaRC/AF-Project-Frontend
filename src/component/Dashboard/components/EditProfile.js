import  {useState} from 'react';
import {  Button, Grid, Paper, TextField } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
// import {  Link,Typography } from "@mui/material";
// import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Input = styled('input')({
  display: 'none',
});

const paperStyle={padding:20, height:'auto', width:300, margin:'20px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};

function EditProfile(){

    // const navigate = useNavigate();

    const [credentials,setCredentials] = useState({email:''});
    const [file,setFile] = useState();
    const [imgChecker,setImgChecker] = useState();

    const handleChange = (e) => {
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleFileChange =(e)=>{
        // console.log(e.target.files);
        setImgChecker(e.target.files.length);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
        // const username = credentials.email.split('@')[0];
        // localStorage.setItem("username",JSON.stringify(username));  
        // localStorage.setItem("userId",JSON.stringify(res.data));
        // navigate('/dashboard',{state:{dataId:res.data}})
      }catch(error){
        console.log(error)
      }
    }


    return(
        <div>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
             <h2>Update Your Data </h2>
        </Grid>

        <form onSubmit={handleSubmit}>

        <Stack alignItems="center">
        <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange}/>
        <IconButton color="primary" aria-label="upload picture" component="span">

        {imgChecker > 0 ? 
        <ReactRoundedImage image={file} roundedSize="6" imageWidth="180" imageHeight="180" hoverColor="#002db3" roundedColor="#3366ff" />
        :
        <PhotoCamera/> }
        </IconButton>

      </label></Stack>

      <div>
          
      </div>
      
        <TextField label="Enter username" type="text" name="email" fullWidth required style={textStyle} value={credentials.email}
         onChange={handleChange} />
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Explore<NavigateNextIcon/></Button>
        </form>
        
      </Paper>
    </Grid>
        </div>
    )
}

export default EditProfile;