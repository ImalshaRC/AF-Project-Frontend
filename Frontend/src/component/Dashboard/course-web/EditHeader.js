import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditHeader() {

    let history = useHistory();
    const { id } = useParams();

    const [web, setWeb] = useState({
        header: "", 
        content: ""
    });

    const { header, content } = web;

    const onInputChange = e => {
        setWeb({...web, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        loadHeader();
      }, []);
  
    const loadHeader = async () => {
        const result = await axios.get("http://localhost:5000/web/get/" + id);
        setWeb(result.data);
    }  

    const onSubmit = async e => {
        e.preventDefault();
        if(true){
            await axios.put('http://localhost:5000/web/update/' + id, web).then(() => {
                alert("web Added Successfully");
            }).catch((err) => {
                alert(err);
            })
            history.push("/web");
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
                                    <button type = "submit" onclick="" class="button">Update Header</button>
                                </td>
                            </tr>
                        </table>
                    </> 
                </form>
            </div>
        </>
    );
}