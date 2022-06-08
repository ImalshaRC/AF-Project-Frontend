import { useEffect,useState } from "react";
import axios from "axios";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Table, Button } from "@mui/material";


// import AdminUserTable from "./AdminUserTable";
import TextField from '@material-ui/core/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

function UserGroup(){
    
    const [Group, setGroup] = useState([]);
    const [username, setusername] = useState([]);

    const [searchText, setSearchText] = useState('');



    const loadGroup = async() => {
        const result = await axios.get('http://localhost:5000/group/get/:id');
        setGroup(result.data.reverse());
    }

    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadGroup();
        }
        else{      
            const filteredData = Group.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setGroup(filteredData);
        }
    }



    const columns = [
        { field: 'person1', headerName: 'Leader (1)', width: 240 },
        { field: 'person2', headerName: 'Person 2', width: 200 },
        { field: 'person3', headerName: 'Person 3', width: 200 },
        { field: 'person4', headerName: 'Person 4', width: 200 },
        {
            headerName:"Panel member",
            field: "Edit",
            width: 150,
            renderCell: (cellValues) => {
              return (
                <div>
                    <Link to={`/dashboard/panelTable/?groupID=${cellValues.row._id}`}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    // updateUpUser(event, cellValues.row.role,cellValues.row._id);
                    // console.log(cellValues.row._id)
                  }}>
                      Add
                </Button></Link>
                </div>
        
              );
            }
          }
    ];



    useEffect(()=>{
        const loggedInUser = localStorage.getItem("username");
        // const userId = JSON.parse(loggedInUser);

        if (!loggedInUser){
        window.location = "/signin"
        }else{
            const username = (JSON.parse(loggedInUser)).toUpperCase();
           setusername(username);
    
        }

            loadGroups()
 
    } ,[]   )

    const loadGroups = () => {
        axios.get(`https://af-project-backend.azurewebsites.net/groups/`)
             .then((res)=>{
                let Group = res.data;
                    setGroup(Group);
                    // console.log(Group)

            }).catch((err)=>{
                    alert(err.message)
            })
    }



    return (
        
        // <div >
            
        //     <hr/>
        //     <h4><center>Groups</center></h4>
        //     <hr/>
        //     <table>
        //     <td>

        //     <Link to={`/dashboard/addgroup`} style={{ textDecoration: 'none'}}><Button class="btn btn-outline-success" style={{margin:'0px 0px 0px 50px'}} size="small" color="primary">
        //     add group
        //     </Button></Link>
        //     </td>
        //     <td>

        //     <div style={{margin:'-75px auto 0px 265px'}}>
        //             <TextField style={{width: 700}} variant="outlined" margin="normal" label="Search your group ..." name="search" onChange={ e => handlesearchArea(e.target.value)}
        //        autoFocus/></div>
        //     </td>

        //     </table>
        //     <div>                 
                    
        //         {Group.map((val)=>{
        //                 return <div>  
        //                     <Table class="table table-sm" style={{border: "2px solid", width: "45%", textAlign: 'center', borderCollapse: 'collapse',marginLeft: 'auto',  marginRight: 'auto'}} >
        //                         <tr class="table-warning" style={{height: '30px'}}><td>Group Leader(1) : {val.person1}</td></tr>
        //                         <tr class="table-primary" style={{height: '30px'}}><td>person 2   :   {val.person2}</td></tr>
        //                         <tr class="table-primary" style={{height: '30px'}}><td>person 3   :   {val.person3}</td> </tr>
        //                         <tr class="table-primary" style={{height: '30px'}}><td>person 4   :   {val.person4}</td></tr>
        //                     </Table>
        //                     </div>
        //             })}
                
        //     </div>


        // </div>

        
      <div>
          <Link to={`/dashboard/addgroup`} style={{ textDecoration: 'none'}}><Button class="btn btn-outline-success" style={{margin:'40px 0px 0px 50px'}} size="small" color="primary">
             add group
             </Button></Link>
          
      <center><h3>Group Table</h3></center>
    <center>
    <div style={{ height: 450, width: '70%' }} >
    <DataGrid 
        getRowId={(row) => row._id}
        rows={Group}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // customToolbarSelect
    />
</div></center>
</div>
    )
}

export default UserGroup;