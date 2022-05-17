import React , {useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DepetmanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import {Row,Col,Card,Form} from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const ID_Token = window.localStorage.getItem("Token");
const Deptview = () =>  {
    const { Dept , Position } = useParams();
    const [hasError,setHaserror] = useState(false);
    const [datauser,setdatauser] = useState([]);
    const [datasummaryUser,setdatasummaryUser] = useState([]);
    const [datactualUser,setdatactualUser] = useState([]);

    useEffect(()=> {
        async function getdatauser() {
            await fetch('http://13.250.116.42/node/express/api/profile/getprofile/dept/position/'+Dept+'/'+Position,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatauser(data))
        .catch(Error => setHaserror(Error))
        .catch(console.log(hasError))
    }

    async function getdatasummaryuser() {
            await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/dept/position/summary/overall/'+Dept + '/' + Position,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatasummaryUser(data))
        .catch(Error => setHaserror(Error))
        .catch(console.log(hasError))
    }

    async function getdataactualuser() {
        await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/dept/position/summary/actual/'+Dept + '/' + Position,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': ID_Token
        }
        })
        .then(response => response.json()) 
        .then(data => setdatactualUser(data))
        .catch(Error => setHaserror(Error))
        .catch(console.log(hasError))
    }

        getdatauser();
        getdatasummaryuser();
        getdataactualuser();
    }, []);

    var dataTable = datauser.map(val => (
        {
            id: val.Id,
            Code: val.Code,
            Name: val.Name,
            Department: val.Department,
            Position: val.Position,
            Level: val.Level,
            Shift: val.Shift,
            Start_Date: val.Start_Date,
            Birthday: val.Birthday
        }
    ));

    return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Position Manpower</Card.Title>
                                    <span className="d-block m-t-5">{Position} manpower</span>
                                    <hr></hr>
                            </Card.Header>
                            <Card.Body>
                            <Row>
                                        <Col md={8}>
                                            <Card.Body className="text-center">
                                                <DepetmanpowerChart/>
                                            </Card.Body>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <Card.Header >
                                                <Card.Title as="h5">{Position} manpower monitor</Card.Title>
                                                </Card.Header> 
                                                
                                                    <Card.Body>
                                                    {datasummaryUser.map(val => (
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label><h4>Overall : {val.Overall}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Overall} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                                        </div>
                                                    </Form.Group>))}
                                                    {datactualUser.map(val => (
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label><h4>Actual : {val.Actual}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Actual} aria-valuemin="0" aria-valuemax={val.Actual}/>
                                                        </div>
                                                    </Form.Group>))}
                                                    {datasummaryUser.map(val1 => (
                                                        datactualUser.map(val2 => (
                                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                                <Form.Label><h4>Diff : {val2.Actual - val1.Overall}</h4></Form.Label>
                                                                <div className="progress">
                                                                    <div className="progress-bar progress-c-theme3" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val2.Actual - val1.Overall} aria-valuemin="0" aria-valuemax={val2.Actual - val1.Overall}/>
                                                                </div>
                                                            </Form.Group>))
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
                            <Card.Title as="h5">{Position} Position Manpower</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BootstrapTable data={dataTable} striped hover pagination exportCSV search>
                                    <TableHeaderColumn width='100' isKey dataField='Code' dataSort={ true } headerAlign='center' dataAlign='center'>Code</TableHeaderColumn>
                                    <TableHeaderColumn width='150' dataField='Name' dataSort={ true } headerAlign='center' dataAlign='center'>Name</TableHeaderColumn>
                                    <TableHeaderColumn width='150' dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Shift' dataSort={ true } headerAlign='center' dataAlign='center'>Shift</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Start_Date' dataSort={ true } headerAlign='center' dataAlign='center'>Start Date</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Birthday' dataSort={ true } headerAlign='center' dataAlign='center'>Birthday</TableHeaderColumn>
                            </BootstrapTable>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Aux>
        );
}

export default Deptview;

//onClick={() => deptView(val.Id)}