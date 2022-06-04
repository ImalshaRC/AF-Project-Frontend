import React from 'react';
import {   Grid, Paper} from "@mui/material";
import { Route, Routes } from "react-router-dom";

import FirstView from './landedComponents/FirstView';
import SecondView from './landedComponents/SecondView';


const paperStyle={padding:20, height:'auto', width:300, margin:'20px auto'};

const LandedPage = () => {

    return(
    <div>
        <Grid>
            <Paper elevation={10} style={paperStyle}>

        
            <Routes>
        <Route path="/firstView" element={<FirstView />}/>
        <Route path="/passwordCheck" element={<SecondView />}/>
        </Routes>

      </Paper>
    </Grid>
        </div>

    )
}

export default LandedPage;