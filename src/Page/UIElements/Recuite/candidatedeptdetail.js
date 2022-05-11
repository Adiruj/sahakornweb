import React , {useState , useEffect} from 'react';
import SummarymanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import {Row,Col,Table,Card,Form,Tabs, Tab} from 'react-bootstrap';
import {  Link , useParams} from "react-router-dom";

import Aux from "../../../hoc/_Aux";

const ID_Token = window.localStorage.getItem("Token");

const BasicButton = () =>  {
    const { Dept , Position } = useParams();
    //const [hasError,setHaserror] = useState(false);
    const [datadept1,setdatadept1] = useState([]);
    const [datadept2,setdatadept2] = useState([]);
    const [datadept3,setdatadept3] = useState([]);
    const [datadept4,setdatadept4] = useState([]);
    const [dataCurrent,setdataCurrent] = useState([]);
    const [dataInterview1,setdataInterview1] = useState([]);
    const [dataInterview2,setdataInterview2] = useState([]);
    const [dataPass,setdataPass] = useState([]);

    //Data Candidate Of Department Status 1
    async function getdatadept1() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/position/'+Dept+'/'+Position+'/1',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatadept1(data))
        .catch(Error => console.log(Error))
    }

    //Data Candidate Of Department Status 2
    async function getdatadept2() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/position/'+Dept+'/'+Position+'/2',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatadept2(data))
        .catch(Error => console.log(Error))
    }

    //Data Candidate Of Department Status 3
    async function getdatadept3() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/position/'+Dept+'/'+Position+'/3',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatadept3(data))
        .catch(Error => console.log(Error))
    }

    //Data Candidate Of Department Status 4
    async function getdatadept4() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/position/'+Dept+'/'+Position+'/4',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatadept4(data))
        .catch(Error => console.log(Error))
    }

    //Data Candidate Dept Summary Current (Status === 1)
    async function getdatacurrent() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/current/'+Dept,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataCurrent(data))
        .catch(Error => console.log(Error))
    }

    //Data Candidate Dept Summary Current (Status === 2)
    async function getdatainterview1() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/interview1/'+Dept,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataInterview1(data))
        .catch(Error => console.log(Error))
    }

    //Data Candidate Dept Summary Current (Status === 3)
    async function getdatainterview2() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/interview2/'+Dept,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataInterview2(data))
        .catch(Error => console.log(Error))
    }

    //Data Candidate Dept Summary Current (Status === 4)
    async function getdatapass() {
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/pass/'+Dept,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataPass(data))
        .catch(Error => console.log(Error))
    }

    useEffect(()=> {
        getdatadept1();
        getdatadept2();
        getdatadept3();
        getdatadept4();
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
                                    <span className="d-block m-t-5">{Dept} candidate</span>
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
                                                <Card.Title as="h5">{Dept} candidate monitor</Card.Title>
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
                                <span className="d-block m-t-5">Candidate of {Dept} Department</span>
                                <hr></hr>
                                <Tabs defaultActiveKey="home">
                                    <Tab eventKey="home" title="Current candidate">
                                        <Table responsive hover>
                                            <thead>
                                                <tr class="text-center">
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Department</th>
                                                    <th>Position</th>
                                                    <th>Level</th>
                                                    <th>Resume</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {datadept1.map(val => (
                                                <tr class="text-center">
                                                    <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                                    <td>{val.Name}</td>
                                                    <td>{val.Dept}</td>
                                                    <td>{val.Position}</td>
                                                    <td>{val.Level}</td>
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Resume</Link></td>
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Reject</Link>
                                                        <Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Accept</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Interview1" title="Interview round 1">
                                        <Table responsive hover>
                                            <thead>
                                                <tr class="text-center">
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Department</th>
                                                    <th>Position</th>
                                                    <th>Level</th>
                                                    <th>Resume</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {datadept2.map(val => (
                                                <tr class="text-center">
                                                    <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                                    <td>{val.Name}</td>
                                                    <td>{val.Dept}</td>
                                                    <td>{val.Position}</td>
                                                    <td>{val.Level}</td>
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Reject</Link>
                                                        <Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Accept</Link>
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Interview2" title="Interview round 2">
                                        <Table responsive hover>
                                            <thead>
                                                <tr class="text-center">
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Department</th>
                                                    <th>Position</th>
                                                    <th>Level</th>
                                                    <th>Resume</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {datadept3.map(val => (
                                                <tr class="text-center">
                                                    <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                                    <td>{val.Name}</td>
                                                    <td>{val.Dept}</td>
                                                    <td>{val.Position}</td>
                                                    <td>{val.Level}</td>
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Reject</Link>
                                                        <Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Accept</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="confirmation" title="Pass confirmation">
                                        <Table responsive hover>
                                            <thead>
                                                <tr class="text-center">
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Department</th>
                                                    <th>Position</th>
                                                    <th>Level</th>
                                                    <th>Resume</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {datadept4.map(val => (
                                                <tr class="text-center">
                                                    <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                                    <td>{val.Name}</td>
                                                    <td>{val.Dept}</td>
                                                    <td>{val.Position}</td>
                                                    <td>{val.Level}</td>
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary xs">Reject</Link>
                                                        <Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Accept</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                </Tabs>                            
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