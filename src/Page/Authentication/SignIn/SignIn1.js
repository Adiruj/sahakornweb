import React , {useState } from 'react';
import { Redirect} from 'react-router-dom';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import {Card } from "react-bootstrap";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

//import Logo from "../../../public/logo.png"
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

async function Loginuser(userdata) {
    return fetch('http://13.250.116.42/node/express/api/authentication/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
    })
    .then(data => data.json())
}


export default function Signin() {
    const classes = useStyles();
    const [open, setOpen] = useState(false); 
    const [OpenLoading, setOpenLoading] = useState(false);
    const [openLoginpass, setopenLoginpass] = useState(false);
    const [Username , setUsername] = useState();
    const [Password , setPassword] = useState();
    const [isLogin , setisLogin] = useState();

    const handlesubmit = async e => {
        setOpenLoading(true);
        e.preventDefault();
        //Alert.error("asdasd");
        //alert.info("Oh look, an alert!");
        const respone = await Loginuser({
            Username,
            Password
        })

        if('Token' in respone){
            window.localStorage.setItem('Token', respone.Token);
            window.localStorage.setItem('Name', respone.user.Name);
            window.localStorage.setItem('ID', respone.user.ID);
            window.localStorage.setItem('Level', respone.user.Level);
            window.localStorage.setItem('Department', respone.user.Department);
            window.localStorage.setItem('Dept', respone.user.Dept);
            window.localStorage.setItem('Code', respone.user.Code);
            setisLogin(true);
            setopenLoginpass(true);
            setOpenLoading(false);
            console.log(respone);
        }else if(respone.message === "Logged falied"){
            setOpenLoading(false);
            setOpen(true);
        }
    }

    if(isLogin){ 
        return<Redirect to = "/dashboard/default" />
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setopenLoginpass(false);
        setOpenLoading(false);
        setOpen(false);
    };

    return(
        <Aux>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Logged falied please check username or password !
                </Alert>
            </Snackbar>
            <Snackbar open={openLoginpass} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Login complete
                </Alert>
            </Snackbar>
            <Breadcrumb/>
            <div className="auth-wrapper">
            
                                
                <div className="auth-content">
                    <div className="auth-bg">
                    </div>
                    
                    <Card>
                    
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon"/>
                            </div>
                            <h3 className="mb-4">Login</h3>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="input-group mb-4">
                                <input type="password" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="form-group text-left">
                                <div className="checkbox checkbox-fill d-inline">
                                    <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                </div>
                            </div>
                            <Button variant="contained" size="large" className='btn-block' color="primary" onClick={handlesubmit}>Login</Button>
                            <Backdrop open={OpenLoading} className={classes.backdrop} onClick={handleClose}>
                                <CircularProgress color="inherit" />    
                            </Backdrop>
                        </div>
                    </Card>
                    
                </div>
                
            </div>
        </Aux>
    );
}

//<button className="btn btn-primary shadow-2 mb-4 btn-block" onClick={handlesubmit}>Login</button>