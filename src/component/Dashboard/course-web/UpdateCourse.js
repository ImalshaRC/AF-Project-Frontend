import { Box, Button, Grid, InputLabel, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';
import { red } from '@mui/material/colors';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const UpdateCourse = () => {

    const { id } = useParams();

    const [check, setCheck] = useState(false);
    
    const [fileIN, setFileIN] = useState(false);
    const [thumbIN, setThumbIN] = useState(false);
    const [videoIN, setVideoIN] = useState(false);

    const [type, setType] = useState();

    const [course, setCourse] = useState({
        header: "", 
        content: "",
        fUrl: "",
        iUrl: "",
        vUrl: "",
        fName: "",
        iName: "",
        vName: "",
        selected: {
            file: false,
            image: false,
            video: false
        }
    });

    const { header, content, fUrl, iUrl, vUrl, fName, iName, vName, selected } = course;

    const onInputChange = e => {
        setCourse({...course, [e.target.name]: e.target.value});
    }

    const search = useLocation().search;
    // const [selected, setSelected] = useState();

    useEffect(() => {
        loadCourse();
    }, [])

    const loadCourse = async () => {
        await axios.get("https://af-project-backend.azurewebsites.net/web/get/" + id).then((result) => {
            setCourse(result.data);
        })
        
    }

    const [loadingFile, setLoadingFile] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);

    const uploadCloud = async (type)  => {

        let formData = new FormData();

        setType(type);

        Array.from(files).forEach(image => {
            formData.append("file", image);
        });

        formData.append("upload_preset", "vzmfwi4l");
        formData.append("cloud_name", "drfprue8u");

        // const config = {
        //     onUploadProgress: function(progressEvent) {
        //       var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
        //       console.log(percentCompleted)
        //     }
        // }

        if(type === "file"){
            setLoadingFile(true);
            setThumbIN(false);
            setFileIN(true);
            await axios.post('https://api.cloudinary.com/v1_1/drfprue8u/auto/upload', formData)
            .then((res) => {
                course.fUrl = res.data.url;
                setLoadingFile(false);
                setCheck(true);
            })
            .catch((err) => {
                alert(err);
            });
        }else if(type === "image") {
            setLoadingImg(true);
            setThumbIN(true);
            await axios.post('https://api.cloudinary.com/v1_1/drfprue8u/image/upload', formData)
            .then((res) => {
                course.iUrl = res.data.url;
                setLoadingImg(false);
                setCheck(true);
            })
            .catch((err) => {
                alert(err);
            });

        }else if(type === "video") {
            setLoadingVideo(true);
            setThumbIN(false);
            setVideoIN(true);
            await axios.post('https://api.cloudinary.com/v1_1/drfprue8u/video/upload', formData)
            .then((res) => {
                course.vUrl = res.data.url;
                setLoadingVideo(false);
                setCheck(true);
            })
            .catch((err) => {
                alert(err);
            });
            
        }            
    }

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: '',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    src={file.preview}
                    alt="img"
                />
            </div>
        </div>
    ));

    const onSubmit = async (e) => {
        e.preventDefault();

        try{    
            if(true){
                await axios.put('https://af-project-backend.azurewebsites.net/web/update/' + id, course).then(() => {
                    alert("Course Updated Successfully");
                }).catch((err) => {
                    alert(err);
                })
                window.location = ("/dashboard/web");
            }             
            
          }catch(error){
            console.log(error)
          }
        }

    return(
        <div className='pt-3'>
            <div style={{ maxWidth: 800, margin: "auto" }}>
                <form onSubmit={e => onSubmit(e)}> 

                    <Grid className="form-group">
                        <Paper sx={{ my: 4, boxShadow: "none" }}>               
                            <TextField label="Enter Header" type="text" name="header" fullWidth required value={header}
                            onChange={onInputChange} />
                            <TextField sx={{ mt: 4 }} label="Enter Content" type="text" name="content" fullWidth required value={content}
                            onChange={onInputChange} />                                    
                        </Paper>
                    </Grid>



                    {/* ----------------- File Upload -----------------  */}

                    {selected.file === true && 
                    <div className="form-group">
                        <h6>File upload</h6>
                        <Box sx={{ py: 2 }}>
                            <TextField  label="Enter File Name" type="text" name="fName" fullWidth required value={fName}
                                onChange={onInputChange} />
                        </Box>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps("file")}/>
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />    
                                {/* <h5 className="dropzone-msg-title">{thumbs[0].key}</h5>: */}
                                {selected.file === true ?
                                    <h5 className="dropzone-msg-title">{fName}</h5>:
                                    <h5 className="dropzone-msg-title">Drop Files here or click to upload.</h5>}                                                 
                            </div>
                        </div>

                        <Box sx={{ width: '100%' }}>
                            {/* <LinearProgress variant="determinate" value={progress}/> */}
                            { loadingFile && <LinearProgress/>}
                        </Box>

                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => uploadCloud("file")}>Upload</Button>
                        
                        
                    </div>}

                    {/* ----------------- Image Upload -----------------  */}

                    {selected.image === true && 
                    <div className="form-group">
                        <h6>Image upload</h6>
                        <Box sx={{ py: 2 }}>
                            <TextField  label="Enter Image Name" type="text" name="iName" fullWidth required value={iName}
                                onChange={onInputChange} />
                        </Box>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()}/>
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />   
                                {selected.image === true &&
                                    <h5 className="dropzone-msg-title">{iName}</h5>}                                                
                            </div>
                        </div>

                        <Box sx={{ width: '100%' }}>
                            { loadingImg && <LinearProgress/>}
                        </Box> 

                        {thumbIN &&
                            <aside className="thumbsContainer">
                            {thumbs}
                        </aside>}

                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => uploadCloud("image")}>Upload</Button>
                        
                        {/* <hr  style={{
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: .5,
                            borderColor : '#000000'
                        }}/> */}
                    </div>}

                    {/* ----------------- Video Upload -----------------  */}

                    {selected.video === true &&
                    <div className="form-group">
                        <h6>Video upload</h6>
                        <Box sx={{ py: 2 }}>
                            <TextField  label="Enter Video Name" type="text" name="vName" fullWidth required value={vName}
                                onChange={onInputChange} />
                        </Box>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()}/>
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />  
                                {selected.video === true &&
                                    <h5 className="dropzone-msg-title">{vName}</h5>}                                                 
                            </div>
                        </div>

                        <Box sx={{ width: '100%' }}>
                            { loadingVideo && <LinearProgress/>}
                        </Box> 

                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => uploadCloud("video")}>Upload</Button>

                        
                    </div>}
                   
                    <table >
                        <tr>
                            <td>
                               <Button sx={{ mb: 5 }} variant="contained" type='submit'>Submit Course</Button>
                            </td>
                        </tr>
                    </table>                     
                </form>
            </div>
        </div>
    )
}

export default UpdateCourse;