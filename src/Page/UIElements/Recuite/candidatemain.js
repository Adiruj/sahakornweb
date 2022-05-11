import React , {useState , useEffect} from 'react';
import SummarymanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import {
    Row,
    Col,
    Table,
    Card,
    Form,
} from 'react-bootstrap';
import {  Link} from "react-router-dom";

import Aux from "../../../hoc/_Aux";
//import Card from "../../../App/components/MainCard";
//import UcFirst from "../../../App/components/UcFirst";

const ID_Token = window.localStorage.getItem("Token");

const BasicButton = () =>  {
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

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Candidate</Card.Title>
                                    <span className="d-block m-t-5">Overall candidate</span>
                                    <hr></hr>
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
                                                        <Form.Label>Current candidate : <Form.Label>{val.cntStaus1}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                    ))}
                                                    {dataInterview1.map(val =>(
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label>Interview round 1 : <Form.Label>{val.cntStaus2}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                    ))}
                                                    {dataInterview2.map(val =>(
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label>Interview round 2 : <Form.Label>{val.cntStaus3}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                    ))}
                                                    {dataPass.map(val =>(
                                                    <Form.Group controlId="exampleForm.ControlInput4">
                                                        <Form.Label>Pass confirmation : <Form.Label>{val.cntStaus4}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                    ))}
                                                </Card.Body>
                                                
                                            </Card>
                                        </Col>
                                    </Row>
                            </Card.Header>
                            <Card.Body>
                                <span className="d-block m-t-5">Candidate of Department</span>
                                <Table responsive hover>
                                    <thead>
                                        <tr class="text-center">
                                            <th>#</th>
                                            <th>Department</th>
                                            <th>Current candidate</th>
                                            <th>Interview round 1</th>
                                            <th>Interview round 2</th>
                                            <th>Pass confirmation</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {datacandidateall.map(val => (
                                        <tr class="text-center">
                                            <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                            <td>{val.Dept}</td>
                                            <td>{val.Status_Current}</td>
                                            <td>{val.Status_Interview1}</td>
                                            <td>{val.Status_Interview2}</td>
                                            <td>{val.Status_Pass}</td>
                                            <td><Link to={'/candidate/dept/'+val.Dept} className="btn btn-primary">View</Link></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                
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