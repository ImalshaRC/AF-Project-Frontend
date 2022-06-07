import { useEffect,useState } from "react";
import { Route, Routes } from "react-router-dom";

import Logout from "./components/Logout";
import NavBar from './components/NavBar'
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import LandedPage from "./../pages/LandedPage"
import AddGroup from "../GroupReg/AddGroup";
import UserGroup from "../GroupReg/UserGroups";

import AddTopic from "../Topic/AddTopic";
import TopicReq from "../Topic/TopicReq";

import AddCourse from "./course-web/AddCourse";
import UploadFile from "./course-web/UploadFile";
import VideoPlayer from "./course-web/VideoPlayer";
import CourseWeb from "./course-web/CourseWeb";
import AddHeader from "./course-web/AddHeader";
import UpdateCourse from "./course-web/UpdateCourse";
import SupTopicUpdate from "../Topic/SupTopicUpdate";
import CoTopicReq from "../Topic/CoTopicReq";
import CoTopicUpdate from "../Topic/CoTopicUpdate";
import PanelMemberTable from "../Topic/PanelMemberList";


function Dashboard(){

    // const value = false;

    // const [user, setUser] = useState([]);
    const [username, setusername] = useState([]);



    useEffect(()=>{
        const loggedInUser = localStorage.getItem("username");
        // const loggedInUserId = localStorage.getItem("userId");

        if (!loggedInUser){
        window.location = "/signin"
        }else{
            const username = (JSON.parse(loggedInUser)).toUpperCase();
            setusername(username);

        }

        
    },[])

    return(
        <div>
        <NavBar name={username}/>



        {/* The user is <b>{value ? 'currently' : 'not'}</b> logged in. */}
        <Routes>
        <Route path="/Profile" element={<Profile />}/>
        <Route path="/Logout" element={<Logout />} />
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/Test2" element={<LandedPage/>}/>
        <Route path="/addgroup" element={<AddGroup />} />
        <Route path="/Group" element={<UserGroup />} />

        <Route path="/Topic" element={<AddTopic />} />
        <Route path="/Topic_reqests" element={<TopicReq />} />
        <Route path="/Co_Topic_reqests" element={<CoTopicReq />} />
        <Route path="/supTopicView/:id" element={<SupTopicUpdate />} />
        <Route path="/coTopicView/:id" element={<CoTopicUpdate />} />
        <Route path="/panelTable" element={<PanelMemberTable />} />

        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/upload-file/:type" element={<UploadFile />} />
        <Route path="/video-player" element={<VideoPlayer />} />
        <Route path="/web" element={<CourseWeb />} />
        <Route path="/add-header" element={<AddHeader />} />
        <Route path="/update-course/:id" element={<UpdateCourse />} />

        </Routes>
        </div>
    )
}

export default Dashboard;