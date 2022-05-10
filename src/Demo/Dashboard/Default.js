import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Card, Table} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

const ID_Token = window.localStorage.getItem("Token");

const Dashboard = () => {

    //State Of Recuitment
    //const [hasErrorrecuit,sethasErrorrecuit] = useState(false);
    const [datasummaryDeptall,setdatasummaryDeptall] = useState([]);


    //Get Data Of Recuitment
    async function getdatasummarydeptall() {
            await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/summary',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatasummaryDeptall(data))
        .catch(Error => console.log(Error))
    }


    //useEffect
    useEffect(()=> {
        getdatasummarydeptall();
    }, []);

        return (
            <Aux>
                <Row>  
                    <Col md={6} xl={3}>
                        <Link to = "/manpower/main" >
                            <Card className='card-Recruitment'>
                                <Card.Body className='border-bottom'>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="feather icon-search f-36"/>
                                        </div>
                                        <div className="col text-right">
                                            <h4>Recruitment & Selection</h4>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    {datasummaryDeptall.map(val => (
                                        <div className="row align-items-center justify-content-center card-active">
                                            <div className="col-6">
                                                <h6 className="text-left m-b-10"><span className="text-muted m-r-5">Overall:</span>{val.Overall}</h6>
                                                <div className="progress">
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Overall} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="text-left  m-b-10"><span className="text-muted m-r-5">Actual:</span>{val.Actual}</h6>
                                                <div className="progress">
                                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '45%', height: '6px'}} aria-valuenow={val.Actual} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                
                    <Col md={6} xl={3}>
                        <Link to = "#">
                            <Card className='card-Traning'>
                                <Card.Body className='border-bottom'>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="feather icon-trending-up f-36"/>
                                        </div>
                                        <div className="col text-right">
                                            <h4>Traning & Development</h4>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-left m-b-10"><span className="text-muted m-r-5">Target:</span>34,185</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-green" role="progressbar" style={{width: '40%', height: '6px'}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-left  m-b-10"><span className="text-muted m-r-5">Duration:</span>800</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-blue" role="progressbar" style={{width: '70%', height: '6px'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                        
                    </Col>

                    <Col xl={3} md={6} >
                        <Link to = "#">
                            <Card className='card-Compensation'>
                                <Card.Body className='border-bottom'>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="feather icon-credit-card text-c-red f-36"/>
                                        </div>
                                        <div className="col text-right">
                                            <h4>Compensation & Benefit</h4>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-left m-b-10"><span className="text-muted m-r-5">Target:</span>25,998</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '80%', height: '6px'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-left  m-b-10"><span className="text-muted m-r-5">Duration:</span>900</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '50%', height: '6px'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col xl={3} md={6} >
                        <Link>
                            <Card className='card-Employment'>
                                <Card.Body className='border-bottom'>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="feather icon-users text-c-red f-36"/>
                                        </div>
                                        <div className="col text-right">
                                            <h4>Employment & Relation</h4>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-left m-b-10"><span className="text-muted m-r-5">Target:</span>25,998</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '80%', height: '6px'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-left  m-b-10"><span className="text-muted m-r-5">Duration:</span>900</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '50%', height: '6px'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Recent Users</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Isabella Christensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                                        </td>
                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Mathilde Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>11 MAY 10:35</h6>
                                        </td>
                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Karla Sorensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>9 MAY 17:38</h6>
                                        </td>
                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Ida Jorgensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15"/>19 MAY 12:56</h6>
                                        </td>
                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Albert Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>21 July 12:56</h6>
                                        </td>
                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
}

export default Dashboard;