import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useLocation, useParams } from 'react-router-dom';



function PanelMemberTable() {

  const search = useLocation().search;

  const columns = [
    { field: '_id', headerName: 'UserID', width: 240 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    {
      headerName:"Add To Group",
      field: "Add",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={(event) => {
              axios.put(`http://localhost:4500/groups/update/?groupID=${new URLSearchParams(search).get('groupID')}&panelID=${cellValues.row._id}`)
              .then((res)=>{
                alert("Updated");
              }).catch((err)=>{
                  alert(err.message)
              })
            }}
          >
            Add 
          </Button>
        );
      }
    }
  
  ];

  

  const { id } = useParams();

  const [tableData, setTableData] = useState([])

    axios.get("http://localhost:4500/user/getPanel").then((res) => 
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

export default PanelMemberTable;