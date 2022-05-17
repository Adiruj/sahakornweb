import React , {useState , useEffect } from 'react';
import SummarymanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import {
    Row,
    Col,
    Card,
    Form,Button
} from 'react-bootstrap';
import { useHistory} from "react-router-dom";
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import Aux from "../../../hoc/_Aux";

const ID_Token = window.localStorage.getItem("Token");

const BasicButton = () =>  {
    const history = useHistory();
    const [hasError,setHaserror] = useState(false);
    const [datacandidateall,setdatacandidateall] = useState([]);
    const [dataCurrent,setdataCurrent] = useState([]);
    const [dataInterview1,setdataInterview1] = useState([]);
    const [dataInterview2,setdataInterview2] = useState([]);
    const [dataPass,setdataPass] = useState([]);

    //Data Candidate Of Department
    async function getdatacandidateall() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatacandidateall(data))
        .catch(Error => setHaserror(Error))
        .catch(console.log(hasError))
    }

    //Data Candidate Summary Current (Status === 1)
    async function getdatacurrent() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/summary/current/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataCurrent(data))
        .catch(Error => setHaserror(Error))
        .catch(console.log(hasError))
    }

    //Data Candidate Summary Current (Status === 2)
    async function getdatainterview1() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/summary/interview1/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataInterview1(data))
        .catch(Error => setHaserror(Error))
        .catch(console.log(hasError))
    }

    //Data Candidate Summary Current (Status === 3)
    async function getdatainterview2() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/summary/interview2/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataInterview2(data))
        .catch(Error => setHaserror(Error))
        .catch(console.log(hasError))
    }

    //Data Candidate Summary Current (Status === 4)
    async function getdatapass() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/summary/pass/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataPass(data))
        .catch(Error => setHaserror(Error))
        .catch(console.log(hasError))
    }

    useEffect(()=> {
        getdatacandidateall();
        getdatacurrent();
        getdatainterview1();
        getdatainterview2();
        getdatapass();
    }, []);

    var dataTablecandidate = datacandidateall.map(val => (
        {
            Id: val.Id,
            Datacnt: val.Datacnt,
            Department: val.Department,
            Dept: val.Dept,
            Status_Current: val.Status_Current,
            Status_Interview1: val.Status_Interview1,
            Status_Interview2: val.Status_Interview2,
            Status_Pass: val.Status_Pass
        }
    ));

    const BTViewdata = () => {
        
        return (
            <div>
                <Button className="btn btn-primary">
                    View
                </Button>
            </div>
        )
    }

    var options = {
        defaultSortName: 'Current',  // default sort column name
        defaultSortOrder: 'desc', // default sort order
        onRowClick: function(row){   
            history.push("/candidate/dept/" + row.Department)
        }
    }
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Candidate</Card.Title>
                                    <span className="d-block m-t-5">Overall candidate</span>
                                    <hr></hr>
                                    
                            </Card.Header>
                            <Card.Body>
                            <Row>
                                        <Col md={8}>
                                            <Card.Body className="text-center">
                                                <SummarymanpowerChart/>
                                            </Card.Body>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <Card.Header >
                                                <Card.Title as="h5">Overall candidate monitor</Card.Title>
                                                </Card.Header>
                                                
                                                    <Card.Body>
                                                    {dataCurrent.map(val =>(
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label><h4>Current candidate : {val.cntStaus1}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.cntStaus1} aria-valuemin="0" aria-valuemax={val.cntStaus1}/>
                                                        </div>
                                                    </Form.Group>
                                                    ))}
                                                    {dataInterview1.map(val =>(
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label><h4>Interview round 1 : {val.cntStaus2}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.cntStaus2} aria-valuemin="0" aria-valuemax={val.cntStaus2}/>
                                                        </div>
                                                    </Form.Group>
                                                    ))}
                                                    {dataInterview2.map(val =>(
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label><h4>Interview round 2 : {val.cntStaus3}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme3" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.cntStaus3} aria-valuemin="0" aria-valuemax={val.cntStaus3}/>
                                                        </div>
                                                    </Form.Group>
                                                    ))}
                                                    {dataPass.map(val =>(
                                                    <Form.Group controlId="exampleForm.ControlInput4">
                                                        <Form.Label><h4>Pass confirmation : {val.cntStaus4}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.cntStaus4} aria-valuemin="0" aria-valuemax={val.cntStaus4}/>
                                                        </div>
                                                    </Form.Group>
                                                    ))}
                                                </Card.Body>
                                                
                                            </Card>
                                        </Col>
                                    </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Card>
                        <Card.Header>
                        <Card.Title as="h5">Candidate of Department</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BootstrapTable data={dataTablecandidate} options={options} striped hover pagination exportCSV search>
                                <TableHeaderColumn width='200' isKey dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='Dept' dataSort={ true } headerAlign='center' dataAlign='center'>Dept</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='Status_Current' dataSort={ true } headerAlign='center' dataAlign='center'>Current</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='Status_Interview1' dataSort={ true } headerAlign='center' dataAlign='center'>Interview 1</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='Status_Interview2' dataSort={ true } headerAlign='center' dataAlign='center'>Interview 2</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='Status_Pass' dataSort={ true } headerAlign='center' dataAlign='center'>Pass</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='Action' headerAlign='center' dataAlign='center' dataFormat={BTViewdata}>Action</TableHeaderColumn>
                            </BootstrapTable>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Aux>
        );
    
}

export default BasicButton;
//<Link to="/signup" className="btn btn-primary">Sign up</Link>
//<td><Button variant="primary" size="sm" onClick={() => deptView(val.Id)}>View</Button></td>