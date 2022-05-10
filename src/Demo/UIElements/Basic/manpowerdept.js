import React , {useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  Link} from "react-router-dom";
import DepetmanpowerChart from "../../Charts/Nvd3Chart/Deptmanpowerchart";
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
    const { Dept } = useParams();

    //const [hasError,setHaserror] = useState(false);
    const [dataDept,setdataDept] = useState([]);
    const [datasummaryDept,setdatasummaryDept] = useState([]);

    async function getdatadept() {
            await fetch('http://13.250.116.42/node/express/api/department/getdept/dept/'+Dept,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataDept(data))
        .catch(Error => console.log(Error))
    }

    async function getdatasummarydept() {
            await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/dept/summary/' + Dept,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatasummaryDept(data))
        .catch(Error => console.log(Error))
    }


    useEffect(()=> {
        getdatadept();
        getdatasummarydept();
    }, []);

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Department Manpower</Card.Title>
                                    <span className="d-block m-t-5">{Dept} manpower</span>
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
                                                <Card.Title as="h5">{Dept} manpower monitor</Card.Title>
                                                </Card.Header>
                                                {datasummaryDept.map(val => (
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
                                            <th>Position</th>
                                            <th>Overall</th>
                                            <th>Actual</th>
                                            <th>Diff</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {dataDept.map(val => (
                                        <tr class="text-center">
                                            <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                            <td>{val.Position}</td>
                                            <td>{val.Overall}</td>
                                            <td>{val.Actual}</td>
                                            <td>{val.Overall - val.Actual}</td>
                                            <td><Link to={'/manpower/main/dept/detail/'+val.Dept+'/'+val.Position} className="btn btn-primary">View</Link></td>
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