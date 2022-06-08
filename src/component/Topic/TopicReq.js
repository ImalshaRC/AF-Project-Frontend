import React, {useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from "@mui/material";

export default function TopicReq(){

    const [topic, setTopics] = useState([]);
    const [listOfTopic, setListOfTopic] = useState([]);

    useEffect(()=> {
        function getTopic(){
            axios.get("https://af-project-backend.azurewebsites.net/topic/get-topic/" + JSON.parse(localStorage.getItem("username")).toUpperCase())
            .then((res)=>{
                setListOfTopic(res.data);
                // console.log(res.data)
            }).catch((err)=>{
               alert(err.massage);
            })
        }
        getTopic();
    }, [])
    return(
        <div className="container">
            <h2 style={{ margin:'20px auto 0px 10px ' }} >Youer Topic Requests -------------------------------------------------------</h2>

                    
                

                    {listOfTopic.map((val)=>{
                        return <div>  
                            <table  style={{ height: 50, width: '1000px', margin:'30px ' }} >
                                <td style={{height: '50px',   textAlign: 'center', backgroundColor: "yellow"}} >
                                    

                                <Link to={`/dashboard/supTopicView/${val._id}`} style={{ textDecoration: 'none'}}>
                                    <Button type="button" style={{  fontFamily: 'Cursive'}} >
                                        The topic of "{val.topic}" is a request from {val.person1} for your({val.supervisor}) supervision.
                                    </Button>
                                </Link>
                                     
                                </td>
                                <td>
                                    
                                </td>
                            </table>
                            </div>
                    })}
                
        </div>
    )

}