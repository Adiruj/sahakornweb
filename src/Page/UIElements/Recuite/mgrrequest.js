import React , {useState , useEffect } from 'react';
import {Row, Col, Card, Form, Table ,Button ,Tabs, Tab , Modal} from 'react-bootstrap';
import DepetmanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import Aux from "../../../hoc/_Aux";
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const ID_Token = window.localStorage.getItem("Token");
const Name_storage = window.localStorage.getItem("Name");
const Level_storage = window.localStorage.getItem("Level");
const Department_storage = window.localStorage.getItem("Department");
const Dept_storage = window.localStorage.getItem("Dept");
const Code_storage = window.localStorage.getItem("Code");

//console.log(Date_Now);
const FormsElements = () => {
    
    const [deptlist , setdeptlist] = useState([]);
    const [deptposition , setdeptposition] = useState([]);
    const [deptlevel , setdeptlevel] = useState([]);

    
    const [ReqBy , setReqBy] = useState([]);
    const [Dept , setDeptsel] = useState([]);
    const [Position , setPositionsel] = useState([]);
    const [Level , setLevelsel] = useState([]);
    const [dataRegisterall , setdataRegisterall] = useState([]);
    const [dataRequestall , setdataRequestall] = useState([]);
    const [datasummaryDept,setdatasummaryDept] = useState([]);
    const [datauser,setdatauser] = useState([]);
    const [totalRequest,settotalRequest] = useState([]);
    const [pdApprove,setpdApprove] = useState([]);
    const [datadept1,setdatadept1] = useState([]);
    const [datadept2,setdatadept2] = useState([]);
    const [datadept3,setdatadept3] = useState([]);
    const [datadept4,setdatadept4] = useState([]);
    const [approveTotal , setapproveTotal] = useState([]);
    //const [Resumess , setfileuploadres] = useState([]);

    const [show, setShow] = useState(false);
    const [Id,setidAprrove] = useState([]);
    const [DeptAprrove,setDeptAprrove] = useState([]); 
    const [PositionAprrove,setPositionAprrove] = useState([]); 
    const [LevelAprrove,setLevelAprrove] = useState([]); 
    const [ReqByAprrove,setReqByAprrove] = useState([]);
    const [ReqDateAprrove,setReqDateAprrove] = useState([]); 
    const [ReqTotalAprrove,setReqTotalAprrove] = useState([]); 
    const [ReqStatus,setReqStatus] = useState([]); 
    const handleClose = () => setShow(false);

    /// Get Dept list

    async function getdeptlist () {
        await fetch('http://13.250.116.42/node/express/api/listdata/dept',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(respones => respones.json())
        .then(data => setdeptlist(data))
        .catch(err => console.log(err))
    }

    /// Get Position list
    async function getpositionlist () {
        await fetch('http://13.250.116.42/node/express/api/listdata/position',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(respones => respones.json())
        .then(data => setdeptposition(data))
        .catch(err => console.log(err))
    }

    /// Get Level list
    async function getlevellist () {
        await fetch('http://13.250.116.42/node/express/api/listdata/level',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(respones => respones.json())
        .then(data => setdeptlevel(data))
        .catch(err => console.log(err))
    }

    /// Get Register All
    async function getregisterall () {
        await fetch('http://13.250.116.42/node/express/api/register/getregister/dept/'+Department_storage,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(respones => respones.json())
        .then(data => setdataRegisterall(data))
        .catch(err => console.log(err))
    }

    /// Get Request All
    async function getrequestall () {
        await fetch('http://13.250.116.42/node/express/api/pd/getpd/request/'+Department_storage,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(respones => respones.json())
        .then(data => setdataRequestall(data))
        .catch(err => console.log(err))
    }


    /// Get PD Approve Total
    async function getPDapproveTotal () {
        await fetch('http://13.250.116.42/node/express/api/pd/getpd/approve/total/'+Department_storage,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(respones => respones.json())
        .then(data => setapproveTotal(data))
        .catch(err => console.log(err))
    }


    async function getdatauser() {
            await fetch('http://13.250.116.42/node/express/api/profile/getprofile/dept/'+ Dept_storage,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatauser(data))
        .catch(Error => console.log(Error))
    }

    async function getdatasummarydept() {
        await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/dept/summary/' + Dept_storage,{
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

    // Get PD Approve Total
    async function getPdapprove() {
        await fetch('http://13.250.116.42/node/express/api/pd/getpd/request/approve/'+Department_storage,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': ID_Token
        }
        })
        .then(response => response.json()) 
        .then(data => setpdApprove(data))
        .catch(Error => console.log(Error))
    }

    //Data Candidate Of Department Status 1
    async function getdatadept1() {
        await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/all/'+Dept_storage+'/1',{
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
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/all/'+Dept_storage+'/2',{
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
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/all/'+Dept_storage+'/3',{
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
            await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/dept/all/'+Dept_storage+'/4',{
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

    /// POST New register
    async function postrequest (requestdata) {
        return fetch('http://13.250.116.42/node/express/api/pd/postpd/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': ID_Token
            },
            body: JSON.stringify(requestdata)
        })
        .then(data => data.json())
        .catch(err => console.log(err))
    }

    const handleSubmit = async () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        var Date_Now = date+'/'+month+'/'+year;

        const respone = await postrequest({
            Dept,
            Position,
            Level,
            ReqBy,
            Date_Now,
            totalRequest
        })

        if('protocol41' in respone === true){
            alert('บันทึกสำเร็จ')
            window.location.reload(false);
        }
    }

    useEffect(()=>{
        getdeptlist();
        getpositionlist();
        getlevellist();
        getregisterall();
        getrequestall();
        getdatasummarydept();
        getdatauser();
        getPdapprove();
        getdatadept1();
        getdatadept2();
        getdatadept3();
        getdatadept4();
        getPDapproveTotal();
        setReqBy(Code_storage)
        setDeptsel(Department_storage)
    },[])

    //delete Request from db
    const handleDel = async (delId,delIndex,e) => {
        const res = await fetch('http://13.250.116.42/node/express/api/pd/delpd/'+delId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
                },
            })
            .then(data => data.json())

            if('protocol41' in res === true){
                //setdataRegisterall(dataRegisterall.filter((v, i) => i !== delIndex));
                setdataRequestall(dataRequestall.filter((val, i) => i !== delIndex));
                alert('ลบข้อมูลสำเร็จ')
            }
    }

    //delete register from db
    const handleDelregister = async (delId,delIndex,e) => {
            const res = await fetch('http://13.250.116.42/node/express/api/register/delregister/'+delId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
                },
            })
            .then(data => data.json())

            if('protocol41' in res === true){
                setdataRegisterall(dataRegisterall.filter((val, i) => i !== delIndex));
                alert('ลบข้อมูลสำเร็จ')
            }
    }

    /// PUT Approve
    async function putrequest (requestdata) {
        return fetch('http://13.250.116.42/node/express/api/pd/putpd/request/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': ID_Token
            },
            body: JSON.stringify(requestdata) 
        })
        .then(data => data.json())
        .catch(err => console.log(err))
    }

    const handleApprove = async () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        var Date_Now = date+'/'+month+'/'+year;

        const respone = await putrequest({
            Id,
            DeptAprrove,
            PositionAprrove,
            ReqByAprrove
        })

        if('protocol41' in respone === true){
            alert('บันทึกสำเร็จ')
            window.location.reload(false);
        }
    }

    var dataTableRequest = dataRequestall.map(val => (
        {
            Id: val.Id,
            Department: val.Department,
            Position: val.Position,
            Level: val.Level,
            ReqBy: val.ReqBy,
            ReqDate: val.ReqDate,
            ReqTotal: val.Total,
            ApproveBy: val.ApproveBy,
            ApproveDate: val.ApproveDate,
            Status: val.Status
        }
    ));
    
    var dataTableUser = datauser.map(val => (
        {
            Id: val.Id,
            Code: val.Code,
            Name: val.Name,
            Department: val.Department,
            Position: val.Position,
            Level: val.Level,
            Shift: val.Shift,
            Start_Work: val.Start_Date,
            Birthday: val.Birthday
        }
    ));

    var options = {
        defaultSortName: 'Status',  // default sort column name
        defaultSortOrder: 'desc', // default sort order
        onRowClick: function(row){
            console.log(row)
            setidAprrove(row.Id);
            setDeptAprrove(row.Department);
            setPositionAprrove(row.Position)
            setReqByAprrove(row.ReqBy);
            setLevelAprrove(row.Level);
            setReqDateAprrove(row.ReqDate);
            setReqTotalAprrove(row.ReqTotal);
            setReqStatus(row.Status)
            setShow(true);
        }
    }

    const BTApprove = () => {
        return (
            <div>
                <Button className="btn btn-info">
                    Detail
                </Button>
            </div>
        )
    }

    return (
            <Aux>
                <Row>
                    <Col>
                        <h5 className="mt-4">Request Manpower</h5>
                        <hr/>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add Request for {Department_storage}</Card.Title>
                                
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="exampleForm.Name">
                                            <Form.Label>Department</Form.Label>
                                            <Form.Control type="input" placeholder={Department_storage} value={Department_storage} disabled/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="exampleForm.dept">
                                            <Form.Label>Position</Form.Label>
                                            <Form.Control as="select" onChange={(e) => setPositionsel(e.target.value)}>
                                                <option>Position</option>
                                                {deptposition.map(val => (
                                                <option>{val.Position}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="exampleForm.dept">
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control as="select" onChange={(e) => setLevelsel(e.target.value)}>
                                                <option>Level</option>
                                                {deptlevel.map(val => (
                                                <option>{val.Level}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="exampleForm.total">
                                            <Form.Label>Total</Form.Label>
                                            <Form.Control type="input" datatype='number' onChange={(e) => settotalRequest(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="primary btn-lg mt-4 btn-block" onClick={handleSubmit}>
                                        <i className="feather icon-save"/> Request
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                </Row>            
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h5 className="mt-4">PD Approve Status</h5>
                    <hr/>
                        <Tabs defaultActiveKey="Request">
                            <Tab eventKey="Request" title="Request list">
                            <BootstrapTable data={dataTableRequest} options={options} striped hover pagination exportCSV search>
                                    <TableHeaderColumn hidden dataField='Id' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn isKey dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                    <TableHeaderColumn dataField='ReqBy' dataSort={ true } headerAlign='center' dataAlign='center'>Request By</TableHeaderColumn>
                                    <TableHeaderColumn dataField='ReqTotal' dataSort={ true } headerAlign='center' dataAlign='center'>Request Total</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Status' dataSort={ true } headerAlign='center' dataAlign='center'>Status</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Action' headerAlign='center' dataAlign='center' dataFormat={BTApprove}>Action</TableHeaderColumn>
                                </BootstrapTable>
                                <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Approve Manpower Request</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Department</Form.Label>
                                                    <Form.Control type="input" value={DeptAprrove} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                    <Form.Label>Position</Form.Label>
                                                    <Form.Control type="input" value={PositionAprrove} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                    <Form.Label>Level</Form.Label>
                                                    <Form.Control type="input" value={LevelAprrove} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                                    <Form.Label>Request By</Form.Label>
                                                    <Form.Control type="input" value={ReqByAprrove} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                                    <Form.Label>Request Date</Form.Label>
                                                    <Form.Control type="input" value={ReqDateAprrove} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Control type="input" value={ReqStatus} disabled autoFocus/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                                                    <Form.Label>Request Total</Form.Label>
                                                    <Form.Control type="input" placeholder={ReqTotalAprrove} onChange={(e) => setReqTotalAprrove(e.target.value)} autoFocus/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="success" onClick={handleApprove}>
                                    Save
                                </Button>
                                <Button variant="danger" onClick={(e) => handleDel(Id)}>
                                    Delete
                                </Button>
                                </Modal.Footer>
                                </Modal>
                            </Tab>
                            <Tab eventKey="Candidate" title={"Candidate Status"}>
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
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Resume</Link></td>
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
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Resume</Link></td>
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
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Resume</Link></td>
                                                    <td><Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary xs">Reject</Link>
                                                        <Link to={'/manpower/main/dept/'+val.Dept} className="btn btn-primary">Accept</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                </Tabs>
                            </Tab>
                            <Tab eventKey="Manpower" title="Manpower monitor">
                                <Row>
                                <Col md={6}>
                                    <DepetmanpowerChart/>
                                </Col>
                                <Col md={3}>
                                <Card>
                                <Card.Header >
                                    <Card.Title as="h5">Department manpower</Card.Title>
                                </Card.Header>
                                    {datasummaryDept.map(val => (
                                    <Card.Body>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label><h5>Overall : {val.Overall}</h5></Form.Label>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Overall} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                            </div>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label><h5>Actual : {val.Actual}</h5></Form.Label>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Actual} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                            </div>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label><h5>Diff : {val.Actual - val.Overall}</h5></Form.Label>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme3" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow={val.Overall - val.Actual} aria-valuemin="0" aria-valuemax={val.Overall}/>
                                            </div>
                                        </Form.Group>
                                    </Card.Body>
                                    ))}
                                    </Card>
                                </Col>
                                <Col md={3}>
                                <Card>
                                <Card.Header >
                                    <Card.Title as="h5">Request manpower</Card.Title>
                                </Card.Header>
                                    
                                    <Card.Body> 
                                    {datasummaryDept.map(val => (
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label><h5>Request : {val.Overall - val.Actual}</h5></Form.Label>
                                        </Form.Group>
                                    ))}
                                        <hr></hr>
                                    {approveTotal.map(val => (
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label><h5>PD Approve : {val.Total}</h5></Form.Label>
                                        </Form.Group>
                                    ))}
                                    </Card.Body>
                                    </Card>
                                </Col>
                                </Row>
                                <Row>
                                <Col>
                                    <h5>Manpower in department</h5>
                                    <hr></hr>
                                    <BootstrapTable data={dataTableUser} striped hover pagination exportCSV search>
                                        <TableHeaderColumn hidden dataField='Id' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                        <TableHeaderColumn isKey dataField='Code' dataSort={ true } headerAlign='center' dataAlign='center'>Code</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Name' dataSort={ true } headerAlign='center' dataAlign='center'>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Start_Work' dataSort={ true } headerAlign='center' dataAlign='center'>Start Work</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Birthday' dataSort={ true } headerAlign='center' dataAlign='center'>Birthday</TableHeaderColumn>
                                    </BootstrapTable>
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs> 
                    </Col>
                </Row>
            </Aux>
        );
}

export default FormsElements;
