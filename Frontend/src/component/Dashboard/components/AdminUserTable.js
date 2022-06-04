import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const updateUpUser= (event,userRole,userId) =>{
  // console.log(userRole)

  if(userRole==="admin"){
    alert('Cannot promote more')
  }else if(userRole==="staffMember"){
    const updatedRole ='admin'
    const updatedUser = {
      role:updatedRole
    }

    axios.put(`http://localhost:4500/user/edit/${userId}`, updatedUser).then(()=>{
    }).catch((err)=>{
      alert(err)
    })
    
  }else{
    const updatedRole ='staffMember'
    const updatedUser = {
      role:updatedRole
    }

    axios.put(`http://localhost:4500/user/edit/${userId}`, updatedUser).then(()=>{
    }).catch((err)=>{
      alert(err)
    })
  }
}

const updateDownUser= (event,userRole,userId) =>{

  if(userRole==="admin"){
    const updatedRole ='staffMember'
    const updatedUser = {
      role:updatedRole
    }

    axios.put(`http://localhost:4500/user/edit/${userId}`, updatedUser).then(()=>{
    }).catch((err)=>{
      alert(err)
    })
  }else if(userRole==="staffMember"){
    const updatedRole ='student'
    const updatedUser = {
      role:updatedRole
    }

    axios.put(`http://localhost:4500/user/edit/${userId}`, updatedUser).then(()=>{
    }).catch((err)=>{
      alert(err)
    })
  }else{
    alert('Cannot demote more')
  }
}

const columns = [
  { field: '_id', headerName: 'UserID', width: 240 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 200 },
  {
    headerName:"Change Role",
    field: "Edit",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <div>
        <Button
          variant="text"
          color="primary"
          onClick={(event) => {
            updateUpUser(event, cellValues.row.role,cellValues.row._id);
            // console.log(cellValues.row._id)
          }}>
          <ArrowUpwardIcon/>
        </Button>

        <Button
        variant="text"
        color="primary"
        onClick={(event) => {
          updateDownUser(event, cellValues.row.role,cellValues.row._id);
          // console.log(cellValues.row._id)
        }}
        >
        <ArrowDownwardIcon/>
        </Button>
        </div>

      );
    }
  },{
    headerName:"Delete User",
    field: "Delete",
    width: 120,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            axios.delete(`http://localhost:4500/user/delete/${cellValues.row._id}`).then((res)=>{
              alert("Deleted");
            }).catch((err)=>{
                alert(err.message)
            })
          }}
        >
          Delete
        </Button>
      );
    }
  }

];

function AdminUserTable() {

  const [tableData, setTableData] = useState([])

    axios.get("http://localhost:4500/user").then((res) => 
    setTableData((res.data)))

    

  return (
      <div>
          <hr/>
          
          <center><h3>User Table</h3></center>
      <center>
    <div style={{ height: 450, width: '70%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // customToolbarSelect
      />
    </div></center>
    </div>
  );
}

export default AdminUserTable;