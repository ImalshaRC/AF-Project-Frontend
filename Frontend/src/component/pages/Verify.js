import axios from "axios";
import {React, useEffect} from "react";
import {  useParams } from 'react-router-dom';

const Verify = () => {

    const { token } = useParams();

    useEffect(() => {            
        try{
            axios.post('http://localhost:4500/auth/verify/' + token).then(() => {
                // console.log("Success");
                localStorage.setItem("userToken",token)
                window.location.href = "/landedpage/firstView";
            }) 
        }
        catch(err){
            // console.log("Failed");
            console.log(err)
        }            
    })

    return(
        <div>
            <h1>Verifying...</h1>
        </div>
    )
}

export default Verify;