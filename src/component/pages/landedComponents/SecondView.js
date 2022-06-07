import  {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import {  Button, Grid, TextField } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';


const btnStyle={margin:'8px 0'};
const textStyle={margin:'0px 0px 12px 0px'};
const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"};;


const SecondView = () => {
    
    const [credentials,setCredentials] = useState({password:''});
    const [error,setError] = useState("");

    const token = localStorage.getItem("userToken")

    credentials.token = token

    const handleChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
    
    const navigate = useNavigate();

    const onClickSubmit = async(e) =>{
        e.preventDefault();
        try{
        const {data:res} = await axios.post("http://localhost:4500/auth/checkpw",credentials);
        localStorage.setItem("userId",JSON.stringify(res.userId));
        const username = res.userEmail.split('@')[0];
        localStorage.setItem("username",JSON.stringify(username));

        if(localStorage.getItem("username")){
            // localStorage.clear("userToken");
            navigate('/dashboard/editprofile');
        }
        
        }catch(error){
            if(
              error.response &&
              error.response.status >=400 &&
              error.response.status <=500
            ){
              setError(error.response.data.message);
            }
          }
    }

    return(
    <div>
        <form onSubmit={onClickSubmit}>
            <Grid align='center'>
             <h2>Enter your password to continue</h2>
             <TextField label="Enter password" type="password" name="password" fullWidth required style={textStyle} value={credentials.password} onChange={handleChange} />
            </Grid>

      <div>
          
      </div>

      {error && <div style={errorMsg}>{error}</div>}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Next<NavigateNextIcon/></Button>
        </form>
        </div>

    )
}

export default SecondView;