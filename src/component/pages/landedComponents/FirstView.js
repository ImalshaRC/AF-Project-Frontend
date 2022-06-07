import React from 'react';
import { useNavigate} from 'react-router-dom';
import {  Button, Grid, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const btnStyle={margin:'8px 0'};

const FirstView = () => {
    
    const navigate = useNavigate();

    const onClickNext = () =>{
        navigate('/landedpage/passwordCheck');
    }

    return(
    <div>
            <Grid align='center'>
             <h2>Thanks for connecting with us.</h2>
             <Typography>Your Account has successfully verified </Typography>
        </Grid>

      <div>
          
      </div>

        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} onClick={onClickNext}>Next<NavigateNextIcon/></Button>
        </div>

    )
}

export default FirstView;