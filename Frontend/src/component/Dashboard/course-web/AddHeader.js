import React, { useEffect, useState } from "react";
import axios from 'axios';
// import { Link, useHistory, useParams } from 'react-router-dom';

export default function AddHeader() {

    // let history = useHistory();

    const [putWeb, setPutWeb] = useState({
        header: "", 
        content: ""
    });

    const { header, content } = putWeb;

    const onInputChange = e => {
        setPutWeb({...putWeb, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        if(true){
            await axios.post('http://localhost:5000/web/add/', putWeb).then(() => {
                alert("web Added Successfully");
            }).catch((err) => {
                alert(err);
            })
            // history.push("/web");
        }                  
    }

    return(
        
        <>
            
            <div class="product-include">
            
                <form onSubmit={e => onSubmit(e)}>

                    <table class="payment-table">
                        <tr>
                            <td>
                                Header
                                <input type="text" name="header" value={header} placeholder="Enter Header" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Content
                                <textarea name="content" rows="7" cols="40" value={content} placeholder="Enter Content" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>                        
                        
                    </table><br/>

                    <>
                        <table>
                            <tr>
                                <td>
                                    <button type = "submit" onclick="" class="button">Add Header</button>
                                </td>
                            </tr>
                        </table>
                    </> 
                </form>
            </div>
        </>
    );
}