import React , {useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  useHistory} from "react-router-dom";
import DepetmanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import {
    Row,
    Col,
    Button,
    Card,
    Form
} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Aux from "../../../hoc/_Aux";

const ID_Token = window.localStorage.getItem("Token");
const Deptview = () =>  {
    const { Dept } = useParams();
    const history = useHistory();
    //const [hasError,setHaserror] = useState(false);
    const [dataDept,setdataDept] = useState([]);
    const [datasummaryDept,setdatasummaryDept] = useState([]);
    const [dataactualDept,setdataactualDept] = useState([]);

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

    async function getdataactualdept() {
        await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/dept/summary/actual/'+Dept,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': ID_Token
        }
        })
        .then(response => response.json()) 
        .then(data => setdataactualDept(data))
        .catch(Error => console.log(Error))
    }


    async function getdatasummarydept() {
            await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/dept/summary/overall/' + Dept,{
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
        getdataactualdept();
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

    var dataTable = dataDept.map(val => (
        {
            id: val.Id,
            Datacnt: val.Datacnt,
            Department: val.Department,
            Dept: val.Dept,
            Position: val.Position,
            Overall: val.Overall,
            Actual: val.Actual,
            Diff: val.Actual - val.Overall,
        }
    ));

    var options = {
        defaultSortName: 'Diff',  // default sort column name
        defaultSortOrder: 'asc', // default sort order
        onRowClick: function(row){   
            history.push("/manpower/main/dept/detail/"+row.Department+'/'+row.Position)
        }
    }

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Department Manpower</Card.Title>
                                    <span className="d-block m-t-5">{Dept} manpower</span>
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
                                                <Card.Title as="h5">{Dept} manpower monitor</Card.Title>
                                                </Card.Header>
                                                
                                                    <Card.Body>
                                                    {datasummaryDept.map(val => (
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label><h4>Overall : {val.Overall}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Overall} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                                        </div>
                                                    </Form.Group>))}
                                                    {dataactualDept.map(val => (
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label><h4>Actual : {val.Actual}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Actual} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                                        </div>
                                                    </Form.Group>))}
                                                    {datasummaryDept.map(val1 => (
                                                        dataactualDept.map(val2 => (
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
                                <Card.Title as="h5">{Dept} Department Manpower</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <BootstrapTable data={dataTable} options={options} striped hover pagination exportCSV search>
                                    <TableHeaderColumn width='300' isKey dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                    <TableHeaderColumn width='200' dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Overall' dataSort={ true } headerAlign='center' dataAlign='center'>Overall</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Actual' dataSort={ true } headerAlign='center' dataAlign='center'>Actual</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Diff' dataSort={ true } headerAlign='center' dataAlign='center'>Diff</TableHeaderColumn>
                                    <TableHeaderColumn width='100' dataField='Action' headerAlign='center' dataAlign='center' dataFormat={BTViewdata}>Action</TableHeaderColumn>
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