import React , {useState , useEffect } from 'react';
import SummarymanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import {Row,Col,Card,Form,Button,Container} from 'react-bootstrap';
import { useHistory} from "react-router-dom";
import Aux from "../../../hoc/_Aux";
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { ScatterBoxLoader  } from "react-awesome-loaders";

const ID_Token = window.localStorage.getItem("Token");

const BasicButton = () =>  {
    const history = useHistory();
    const [isLoading , setIsloading] = useState(false);
    const [dataDeptall,setdataDeptall] = useState([]);
    const [datasummaryDeptall,setdatasummaryDeptall] = useState([]);
    const [dataactualDeptall,setdataactualDeptall] = useState([]);

    async function getdatadeptall() {
        await fetch('http://13.250.116.42/node/express/api/department/getdept/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': ID_Token
            }
        })
        .then(response => response.json())
        .then(data => {
            setdataDeptall(data);
            fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/summary/overall',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
                }
            })
            .then(response => response.json()) 
            .then(data => {
                setdatasummaryDeptall(data);
                fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/summary/actual',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': ID_Token
                    }
                })
                .then(response => response.json()) 
                .then(data => {
                    setdataactualDeptall(data);
                    setIsloading(false)
                })
                .catch(Error => console.log(Error))
            })
            .catch(Error => console.log(Error))
        })
        .catch(Error => console.log(Error))
    }

    useEffect(()=> {
        setIsloading(true)
        getdatadeptall();
        //getdatasummarydeptall();
        //getdataactualdeptall();
    }, []);

    //Loading State
    if(isLoading){
        return (
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <ScatterBoxLoader
                            primaryColor={"#6366F1"}
                        />
                    </Col>
                    <Col md={4}></Col>
                </Row>
            </Container>  
        )
    }

    var dataTable = dataDeptall.map(val => (
        {
            id: val.Id,
            Datacnt: val.Datacnt,
            Department: val.Department,
            Dept: val.Dept,
            Overall: val.Overall,
            Actual: val.Actual,
            Diff: val.Actual - val.Overall,
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
        defaultSortName: 'Diff',  // default sort column name
        defaultSortOrder: 'asc', // default sort order
        onRowClick: function(row){   
            history.push("/manpower/main/dept/" + row.Department)
        }
    }
       
    return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Overall Manpower</Card.Title>
                                    <span className="d-block m-t-5">Overall manpower</span>
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
                                                <Card.Title as="h5">Overall manpower monitor</Card.Title>
                                                </Card.Header>
                                                
                                                    <Card.Body>
                                                    {datasummaryDeptall.map(summary =>(
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label><h4>Overall : {summary.Overall}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={summary.Overall} aria-valuemin="0" aria-valuemax={summary.Overall}/>
                                                        </div>
                                                    </Form.Group>))}
                                                    <hr></hr>
                                                    {dataactualDeptall.map(summary =>(
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label><h4>Actual : {summary.Actual}</h4></Form.Label>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={summary.Actual} aria-valuemin="0" aria-valuemax={summary.Actual}/>
                                                        </div>
                                                    </Form.Group>))}

                                                    {datasummaryDeptall.map(val1 =>(
                                                        dataactualDeptall.map(val2 =>(
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
                                <Card.Title as="h5">Department Manpower</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <BootstrapTable data={dataTable} options={options} striped hover pagination exportCSV search>
                                    <TableHeaderColumn width='300' isKey dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                    <TableHeaderColumn width='200' dataField='Dept' dataSort={ true } headerAlign='center' dataAlign='center'>Dept</TableHeaderColumn>
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

export default BasicButton;