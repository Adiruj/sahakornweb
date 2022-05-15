import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
const ID_Token = window.localStorage.getItem("Token");

const Dashboard = () => {
    const [datasummaryDeptall,setdatasummaryDeptall] = useState([]);
    const [datactualDeptall,setdatactualDeptall] = useState([]);
    const [datarequestall,setdatarequestall] = useState([]);

    //Get Data Of Recuitment
    async function getdatasummarydeptall() {
        await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/summary/overall',{
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

    //Get Data Of Recuitment
    async function getdataactualdeptall() {
        await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/summary/actual',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': ID_Token
        }
    })
        .then(response => response.json()) 
        .then(data => setdatactualDeptall(data))
        .catch(Error => console.log(Error))
    }

    /// Get Request All
    async function getrequestall () {
        await fetch('http://13.250.116.42/node/express/api/pd/getpd/request/waitting',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(respones => respones.json())
        .then(data => setdatarequestall(data))
        .catch(err => console.log(err))
    }

    //useEffect
    useEffect(()=> {
        getdatasummarydeptall();
        getdataactualdeptall();
        getrequestall();
    }, []);

    var dataTableRequest = datarequestall.map(val => (
        {
            Id: val.Id,
            Department: val.Department,
            Position: val.Position,
            Level: val.Level,
            ReqBy: val.ReqBy,
            ReqDate: val.ReqDate,
            ReqTotal: val.Total,
            ApproveBy: val.ApproveBy,
            ApproveDate: val.ApproveDate,
            Status: val.Status
        }
    ));

    return(
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
                                
                                    <div className="row align-items-center justify-content-center card-active">
                                    {datasummaryDeptall.map(val => (
                                        <div className="col-12">
                                            <h6 className="text-left m-b-10 "><span className="text-muted m-r-5">Overall:</span>{val.Overall}</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Overall} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                            </div>
                                        </div>))}
                                    </div>
                                    <div className="row align-items-center justify-content-center card-active">
                                        {datactualDeptall.map(val => (
                                        <div className="col-12">
                                            <h6 className="text-left  m-b-10"><span className="text-muted m-r-5">Actual:</span>{val.Actual}</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '45%', height: '6px'}} aria-valuenow={val.Actual} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                            </div>
                                        </div>))}
                                    </div>
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
                                        <div className="col-12">
                                            <h6 className="text-left m-b-10"><span className="text-muted m-r-5">Target:</span>3185</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-green" role="progressbar" style={{width: '40%', height: '6px'}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <h6 className="text-left  m-b-10"><span className="text-muted m-r-5">Duration:</span>80</h6>
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
                                        <div className="col-12">
                                            <h6 className="text-left m-b-10"><span className="text-muted m-r-5">Target:</span>2998</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '80%', height: '6px'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-12">
                                            <h6 className="text-left  m-b-10"><span className="text-muted m-r-5">Duration:</span>90</h6>
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
                        <Link to="#">
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
                                        <div className="col-12">
                                            <h6 className="text-left m-b-10"><span className="text-muted m-r-5">Target:</span>2998</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '80%', height: '6px'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-12">
                                            <h6 className="text-left  m-b-10"><span className="text-muted m-r-5">Duration:</span>90</h6>
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
                                <Card.Title as='h5'>Request Manpower</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <BootstrapTable data={dataTableRequest} striped hover pagination search>
                                    <TableHeaderColumn hidden dataField='Id' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn isKey dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                    <TableHeaderColumn dataField='ReqBy' dataSort={ true } headerAlign='center' dataAlign='center'>Request By</TableHeaderColumn>
                                    <TableHeaderColumn dataField='ReqTotal' dataSort={ true } headerAlign='center' dataAlign='center'>Request Total</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Status' dataSort={ true } headerAlign='center' dataAlign='center'>Status</TableHeaderColumn>
                                </BootstrapTable>
                                
                            </Card.Body>
                        </Card>
                    </Col>
            </Row>
        </Aux>
    )
}

export default Dashboard;