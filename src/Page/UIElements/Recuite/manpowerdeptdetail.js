import React , {useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DepetmanpowerChart from "../../Charts/Recuite/Deptmanpowerchart";
import {
    Row,
    Col,
    Table,
    Card,
    Form
} from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

const ID_Token = window.localStorage.getItem("Token");
const Deptview = () =>  {
    const { Dept , Position } = useParams();
    const [hasError,setHaserror] = useState(false);
    const [datauser,setdatauser] = useState([]);
    const [datasummaryUser,setdatasummaryUser] = useState([]);

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
            await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/dept/summary/' + Position,{
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

        getdatauser();
        getdatasummaryuser();
    }, []);

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Position Manpower</Card.Title>
                                    <span className="d-block m-t-5">{Position} manpower</span>
                                    <hr></hr>
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
                                                {datasummaryUser.map(val => (
                                                    <Card.Body>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Overall : <Form.Label>{val.Overall}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Actual : <Form.Label>{val.Actual}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Diff : <Form.Label>{val.Overall - val.Actual}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                </Card.Body>
                                                ))}
                                            </Card>
                                        </Col>
                                    </Row>
                            </Card.Header>
                            <Card.Body>
                                <span className="d-block m-t-5">Department manpower</span>
                                <Table responsive hover>
                                    <thead>
                                        <tr class="text-center">
                                            <th>#</th>
                                            <th>Code</th>
                                            <th>Name</th>
                                            <th>Dept</th>
                                            <th>Position</th>
                                            <th>Level</th>
                                            <th>Shift</th>
                                            <th>Start Work</th>
                                            <th>Birthday</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {datauser.map(val => (
                                        <tr class="text-center">
                                            <th scope="row" key={val.Id}>{val.Id}</th>
                                            <td>{val.Code}</td>
                                            <td>{val.Name}</td>
                                            <td>{val.Dept}</td>
                                            <td>{val.Position}</td>
                                            <td>{val.Level}</td>
                                            <td>{val.Shift}</td>
                                            <td>{val.Start_Date}</td>
                                            <td>{val.Birthday}</td>
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

export default Deptview;

//onClick={() => deptView(val.Id)}