import React , {useState , useEffect } from 'react';
import SummarymanpowerChart from "../../Charts/Nvd3Chart/Summarymanpowerchart";
import {Row,Col,Table,Card,Form,} from 'react-bootstrap';
import {   Link} from "react-router-dom";
import Aux from "../../../hoc/_Aux";


const ID_Token = window.localStorage.getItem("Token");

const BasicButton = () =>  {

    //const [hasError,setHaserror] = useState(false);
    const [dataDeptall,setdataDeptall] = useState([]);
    const [datasummaryDeptall,setdatasummaryDeptall] = useState([]);

    async function getdatadeptall() {
            await fetch('http://13.250.116.42/node/express/api/department/getdept/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdataDeptall(data))
        .catch(Error => console.log(Error))
    }

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

    useEffect(()=> {
        getdatadeptall();
        getdatasummarydeptall();
    }, []);

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Overall Manpower</Card.Title>
                                    <span className="d-block m-t-5">Overall manpower</span>
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
                                                <Card.Title as="h5">Overall manpower monitor</Card.Title>
                                                </Card.Header>
                                                {datasummaryDeptall.map(summary =>(
                                                    <Card.Body>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Overall : <Form.Label>{summary.Overall}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Actual : <Form.Label>{summary.Actual}</Form.Label></Form.Label>
                                                    </Form.Group>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Diff : <Form.Label>{summary.Overall - summary.Actual}</Form.Label></Form.Label>
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
                                            <th>Department</th>
                                            <th>Overall</th>
                                            <th>Actual</th>
                                            <th>Diff</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {dataDeptall.map(val => (
                                        <tr class="text-center">
                                            <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                            <td>{val.Dept}</td>
                                            <td>{val.Overall}</td>
                                            <td>{val.Actual}</td>
                                            <td>{val.Overall - val.Actual}</td>
                                            <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">View</Link></td>
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