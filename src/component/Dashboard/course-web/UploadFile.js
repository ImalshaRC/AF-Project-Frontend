import { Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';

const UploadFile = () => {

    const [Url, setUrl] = useState();

    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        let formData = new FormData();

        Array.from(files).forEach(image => {
            formData.append("file", image);
        });

        formData.append("upload_preset", "vzmfwi4l");
        formData.append("cloud_name", "drfprue8u");

        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
            //   console.log(percentCompleted)
            }
        }

        if(true){
            await axios.post('https://api.cloudinary.com/v1_1/drfprue8u/auto/upload', formData)
            .then((res) => {
                setUrl(res.data.url);
                setLoading(false);
                setCheck(true);
            })
            .catch((err) => {
                alert(err);
            });
        }                  
    }

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: '.pdf, .word, .txt',
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

    const goToForm = () => {
        window.location = ("/add-course?link=" + Url);
    }

    return(
        <div>
            <div style={{ maxWidth: 800, margin: "auto" }}>

                <form onSubmit={e => onSubmit(e)}>  

                    <div className="form-group">
                        <label>Image upload</label><br/><br/>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()}/>
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <h5 className="dropzone-msg-title">Drop images here or click to upload.</h5>                                                    
                            </div>
                        </div>

                        <aside className="thumbsContainer">
                            {thumbs}
                        </aside>

                        <Box sx={{ width: '100%' }}>
                            {/* <LinearProgress variant="determinate" value={progress}/> */}
                            { loading && <LinearProgress/>}
                        </Box> 
                        {/* <span className="acr-form-notice">*You can upload up to 5 images for your listing</span>
                        <span className="acr-form-notice">*Your first image set as a Thumbnail</span>
                        <span className="acr-form-notice">*Listing images should be atleast 620x480 in dimensions</span> */}
                    </div>
                   
                    <table>
                        <tr>
                            <td>
                                {!check ?
                                    <Button type = "submit" onclick="">Upload</Button>:
                                    <Button onClick={goToForm}>Back To Form</Button>
                                }                             
                            </td>
                        </tr>
                    </table>                     
                </form>
            </div>
        </div>
    )
}

export default UploadFile;