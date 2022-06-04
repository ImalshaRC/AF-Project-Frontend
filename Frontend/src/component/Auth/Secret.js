import {useNavigate,useLocation } from 'react-router-dom';

function Secret(){

    const location = useLocation();
    // console.log(location.state.credentials.email);

    const history = useNavigate();
    const redirect = (path) => {
      history(path)
    }

    return(
        <div>
            <h1 align="center">Hello World</h1>
            <ul>
                <li>{location.state.credentials.email}</li>
                <li>{location.state.credentials.password}</li>
            </ul>

            <div><p>Hello Brothers. This page should authenticate user data and redirect to the dashboard. Until I implement that scenario, use redirect button kindly,  <br>
            </br><br></br>
            Mudi :)</p></div>
            <button onClick={()=>{redirect('/dashboard');}}>Redirect</button></div>
    )
}

export default Secret;