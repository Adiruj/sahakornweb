import React , {useState , useEffect} from 'react';
import SummarymanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import {Row,Col,Card,Form,Tabs, Tab, Button , Modal} from 'react-bootstrap';
import {   useParams} from "react-router-dom";
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

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


    const [show, setShow] = useState(false);
    const [Id,setIdcandidate] = useState([]);
    const [nameCandidate,setnameCandidate] = useState([]); 
    const [departmentCandidate,setdepartmentCandidate] = useState([]); 
    const [positionCandidate,setpositionCandidate] = useState([]); 
    const [levelCandidate,setlevelCandidate] = useState([]);
    const [resumeCandidate,setresumeCandidate] = useState([]); 
    const [stautsCandidate,setstautsCandidate] = useState([]); 
    const handleClose = () => setShow(false);

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

    const BTViewdata = () => {
        return (
            <div>
                <Button className="btn btn-primary">
                    View
                </Button>
            </div>
        )
    }

    //Current List
    var dataTablecurrent = datadept1.map(val => (
        {
            Id: val.Id,
            Name: val.Name,
            Department: val.Department,
            Dept: val.Dept,
            Position: val.Position,
            Level: val.Level,
            Resume: val.Resume
        }
    ));
    var options = {
        //defaultSortName: 'Current',  // default sort column name
        //defaultSortOrder: 'desc', // default sort order
        onRowClick: function(row){   
            setIdcandidate(row.Id);
            setnameCandidate(row.Name);
            setdepartmentCandidate(row.Department)
            setpositionCandidate(row.Position);
            setlevelCandidate(row.Level);
            setresumeCandidate(row.Resume);
            setstautsCandidate(row.Status);
            setShow(true);
        }
    }
    const handleAccep1 = async () => {

    }

    const handleDel1 = async () => {

    }

    //Interview 1 List
    var dataTableinterview1 = datadept2.map(val => (
        {
            Id: val.Id,
            Name: val.Name,
            Department: val.Department,
            Dept: val.Dept,
            Position: val.Position,
            Level: val.Level,
            Level: val.Resume
        }
    ));
    var options2 = {
        defaultSortName: 'Current',  // default sort column name
        defaultSortOrder: 'desc', // default sort order
        onRowClick: function(row){   
            //history.push("/candidate/dept/detail/" + row.Department + "/" + row.Position)
        }
    }

    //Interview 2 List
    var dataTableinterview2 = datadept3.map(val => (
        {
            Id: val.Id,
            Name: val.Name,
            Department: val.Department,
            Dept: val.Dept,
            Position: val.Position,
            Level: val.Level,
            Level: val.Resume
        }
    ));
    var options3 = {
        defaultSortName: 'Current',  // default sort column name
        defaultSortOrder: 'desc', // default sort order
        onRowClick: function(row){   
            //history.push("/candidate/dept/detail/" + row.Department + "/" + row.Position)
        }
    }

    //Pass List
    var dataTablepass = datadept4.map(val => (
        {
            Id: val.Id,
            Name: val.Name,
            Department: val.Department,
            Dept: val.Dept,
            Position: val.Position,
            Level: val.Level,
            Level: val.Resume
        }
    ));
    var options4 = {
        defaultSortName: 'Current',  // default sort column name
        defaultSortOrder: 'desc', // default sort order
        onRowClick: function(row){   
            //history.push("/candidate/dept/detail/" + row.Department + "/" + row.Position)
        }
    }

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Candidate</Card.Title>
                                    <span className="d-block m-t-5">{Dept} candidate</span>
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
                                                <Card.Title as="h5">{Dept} candidate monitor</Card.Title>
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
                    <span className="d-block m-t-5">Candidate of {Dept} Department</span>
                    <hr></hr>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Current candidate">
                                <BootstrapTable data={dataTablecurrent} options={options} striped hover pagination exportCSV search>
                                    <TableHeaderColumn hidden isKey dataField='Id' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn hidden dataField='Resume' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn dataField='Name' dataSort={ true } headerAlign='center' dataAlign='center'>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Action' headerAlign='center' dataAlign='center' dataFormat={BTViewdata}>Action</TableHeaderColumn>
                                </BootstrapTable>
                                <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Candidate Information</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="input" value={nameCandidate} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Department</Form.Label>
                                                    <Form.Control type="input" value={departmentCandidate} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                    <Form.Label>Position</Form.Label>
                                                    <Form.Control type="input" value={positionCandidate} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                    <Form.Label>Level</Form.Label>
                                                    <Form.Control type="input" value={levelCandidate} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Control type="input" value="Current Candidate" disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                                    <Form.Label>Resume</Form.Label>
                                                    <Form.Control type="input" value={resumeCandidate} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="success" onClick={handleAccep1}>
                                    Accept
                                </Button>
                                <Button variant="danger" onClick={(e) => handleDel1(Id)}>
                                    Reject
                                </Button>
                                </Modal.Footer>
                                </Modal>
                            </Tab>
                            <Tab eventKey="Interview1" title="Interview 1">
                                <BootstrapTable data={dataTableinterview1} options={options2} striped hover pagination exportCSV search>
                                    <TableHeaderColumn hidden isKey dataField='Id' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn hidden dataField='Resume' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn dataField='Name' dataSort={ true } headerAlign='center' dataAlign='center'>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Dept' dataSort={ true } headerAlign='center' dataAlign='center'>Dept</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Action' headerAlign='center' dataAlign='center' dataFormat={BTViewdata}>Action</TableHeaderColumn>
                                </BootstrapTable>
                            </Tab>
                            <Tab eventKey="Interview2" title="Interview 2">
                                <BootstrapTable data={dataTableinterview2} options={options3} striped hover pagination exportCSV search>
                                    <TableHeaderColumn hidden isKey dataField='Id' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn hidden dataField='Resume' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn dataField='Name' dataSort={ true } headerAlign='center' dataAlign='center'>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Dept' dataSort={ true } headerAlign='center' dataAlign='center'>Dept</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Action' headerAlign='center' dataAlign='center' dataFormat={BTViewdata}>Action</TableHeaderColumn>
                                </BootstrapTable>
                            </Tab>
                            <Tab eventKey="Pass" title="Pass">
                                <BootstrapTable data={dataTablepass} options={options4} striped hover pagination exportCSV search>
                                    <TableHeaderColumn hidden isKey dataField='Id' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn hidden dataField='Resume' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn dataField='Name' dataSort={ true } headerAlign='center' dataAlign='center'>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Dept' dataSort={ true } headerAlign='center' dataAlign='center'>Dept</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Action' headerAlign='center' dataAlign='center' dataFormat={BTViewdata}>Action</TableHeaderColumn>
                                </BootstrapTable>
                            </Tab>
                        </Tabs>

                    </Col>
                </Row>
            </Aux>
        );
    
}

export default BasicButton;
//<Link to="/signup" className="btn btn-primary">Sign up</Link>
//<td><Button variant="primary" size="sm" onClick={() => deptView(val.Id)}>View</Button></td>