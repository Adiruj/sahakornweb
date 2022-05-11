import React , {useState} from 'react';
import { Redirect} from 'react-router-dom';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import {Card} from "react-bootstrap";
//import Logo from "../../../public/logo.png"
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
    const [Username , setUsername] = useState();
    const [Password , setPassword] = useState();
    const [isLogin , setisLogin] = useState();

    const handlesubmit = async e => {
        e.preventDefault();
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
            console.log(respone);
        }
    }

    if(isLogin){ 
        return<Redirect to = "/dashboard/default" />
    }

    return(
        <Aux>
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
                            <button className="btn btn-primary shadow-2 mb-4 btn-block" onClick={handlesubmit}>Login</button>
                        </div>
                    </Card>
                </div>
            </div>
        </Aux>
    );

}