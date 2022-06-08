import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Button from '@mui/material/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoFileOutlinedIcon from '@mui/icons-material/VideoFileOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Container from '@mui/material/Container';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CardMedia, Checkbox, FormGroup, FormLabel, Paper, TextField } from "@mui/material";

  const toppings = [
    { id: 1, title: 'Book' },
    { id: 2, title: 'Lesson' },
    { id: 3, title: 'Folder' },
    { id: 4, title: 'Label' },
    { id: 5, title: 'Page' },
    { id: 6, title: 'Url' },
    { id: 7, title: 'Forum' },
    { id: 8, title: 'File' },
    { id: 9, title: 'Image' },
    { id: 10, title: 'Video' },
    { id: 11, title: 'Quiz' }
];

function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);
  
    React.useEffect(() => {
      if (!open) {
        setValue(valueProp);
      }
    }, [valueProp, open]);
  
    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };
  
    const handleCancel = () => {
      onClose();
    };

    // let history = useHistory();
  
    const handleOk = () => {
      onClose(value);
      window.location = ("/dashboard/add-course/?file="+checkedState[7]+"&image="+checkedState[8]+"&video="+checkedState[9]);
    }; 

    const arr1 = new Array();

    const saveToArray = () => {
        checkedState.map((data, index)=>{
            if(data===true){
                arr1.push(index+1);
            }
        })
        return arr1;
      };

    const [checkedState, setCheckedState] = useState(
        new Array(toppings.length).fill(false)
      );
    
      const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
      };
  
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 595 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other} >
        <div className="d-flex justify-content-between mx-5">
            <DialogTitle>Option List</DialogTitle>
            <DialogTitle>Selected List</DialogTitle>
        </div>
        
        <DialogContent  className="d-flex">
            
            <Paper  style={{maxHeight: 400, overflow: 'auto'}}
                sx={{ boxShadow: "none" , maxWidth: 400}}
                className="mx-4">
                <FormGroup>
                    {toppings.map((option, index) => (
                    <FormControlLabel
                        value={option.id}
                        key={option.id}
                        control={<Checkbox />}
                        label={option.title}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                    />
                    ))}                    
                </FormGroup>
            </Paper> 

            <Paper style={{maxHeight: 400, overflow: 'auto', paddingLeft: 90}}
                sx={{ boxShadow: "none"}}
                className="d-flex justify-content-end mt-2">
                <Box>                    
                    {checkedState.map((data, index) => {
                        return(
                            <h5>{data === true && toppings.map((d)=>{
                                return(
                                <h6><b>
                                    {d.id === index+1 && "(+) "+d.title}</b>
                                </h6>
                            )})}</h5>
                        )
                    })}
                </Box>
            </Paper>
        </DialogContent>            
        
        <DialogActions className="d-flex justify-content-center">
            <Button onClick={handleOk}>Add</Button>
            <Button autoFocus onClick={handleCancel}>Cancel</Button>          
        </DialogActions>
      </Dialog>
    );
  }
  
  ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  };

export default function CourseWeb() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);

    const [getWeb, setGetWeb] = useState([]);

    // let history = useHistory();

    useEffect(() => {
        loadWeb();
    }, []);

    const loadWeb = async() => {
        const result = await axios.get('https://af-project-backend.azurewebsites.net/web/');
        setGetWeb(result.data);
    }

    const addData = () => {
        window.location =("/add-header");
    }

    const editData = (id) => {
        window.location =("/dashboard/update-course/" + id);
    }
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    ///////////////////////////


    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Dione');

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
        setValue(newValue);
        }
    };


    //////////////////////////

    return(
        <div className="mt-3">

            <ConfirmationDialogRaw id="ringtone-menu" keepMounted open={open} onClose={handleClose} value={value}/>
        
            <div>

                {
                getWeb.map((webData) => (
                    <Container maxWidth="xl">
                    <div className="container mx-lg-3">                                    

                        <div className="">

                            <nav style={{ backgroundColor: "#ede9e8", borderRadius: 5 }} class="navbar navbar-light d-flex justify-content-between">
                                <span style={{ marginLeft: 5 }} class="navbar-brand mb-0 h1">{webData.header}</span>

                                <div className='float-end'>
                                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={() => editData(webData._id)}>
                                        <SettingsIcon/>
                                    </Button>                                    
                                </div>

                            </nav>
                            
                        </div>                                       
                        <Paper sx={{ boxShadow: "none", py: 5 }}>
                            <div className="w-100">
                                <h6>{webData.content}</h6>
                            </div> 
                        
                            {webData.iUrl &&
                            <Box>
                                <h6 style={{ marginTop: 10 }}>{webData.iName}</h6>
                                <a href={webData.iUrl} download>
                                  <img style={{maxHeight: 350, maxWidth: 350}} src={webData.iUrl} alt="img"/>
                                </a>
                            </Box>}

                            {webData.fUrl &&
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>                                
                                <PictureAsPdfOutlinedIcon style={{ minHeight: 30, minWidth: 30, marginTop: 10 }}/>
                                
                                <Box sx={{ pt: 1.5 }}>
                                    <a style={{ textDecoration: 'none', marginLeft: 10 }} href={webData.fUrl} download>{webData.fName}</a>
                                </Box>                                
                            </Box>}

                            {webData.vUrl &&
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>                                
                                <VideoFileOutlinedIcon style={{ minHeight: 30, minWidth: 30, marginTop: 10 }}/>

                                <Link style={{ textDecoration: 'none' }} to={`/dashboard/video-player?vUrl=${webData.vUrl}`}>
                                    <Box sx={{ pt: 1.8, ml: 1 }}>{webData.vName}</Box>
                                </Link>
                            </Box>}
                        </Paper>
                    </div>
                    </Container>
                ))
                } 

                <div className=" d-flex justify-content-center my-lg-4 p-5">
                    <Button variant="contained" onClick={handleClickListItem}>Add Course Content</Button>
                </div>
            </div>
        </div>
    )
}

