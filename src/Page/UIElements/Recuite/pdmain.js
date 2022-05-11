import React , {useState , useEffect } from 'react';
import {Row, Col, Card, Form, Table ,Button ,Tabs, Tab , Modal} from 'react-bootstrap';
import DepetmanpowerChart from "../../Charts/Recuite/Summarymanpowerchart";
import Aux from "../../../hoc/_Aux";
import { Link } from 'react-router-dom';


const ID_Token = window.localStorage.getItem("Token");
const Name_storage = window.localStorage.getItem("Name");
const Level_storage = window.localStorage.getItem("Level");
const Department_storage = window.localStorage.getItem("Department");
const Dept_storage = window.localStorage.getItem("Dept");
const Code_storage = window.localStorage.getItem("Code");

//console.log(Date_Now);
const FormsElements = () => {
    
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

    const [show, setShow] = useState(false);
    const [idAprrove,setidAprrove] = useState([]);
    const [DeptAprrove,setDeptAprrove] = useState([]); 
    const [PositionAprrove,setPositionAprrove] = useState([]); 
    const [LevelAprrove,setLevelAprrove] = useState([]); 
    const [ReqByAprrove,setReqByAprrove] = useState([]);
    const [ReqDateAprrove,setReqDateAprrove] = useState([]); 
    const [ReqTotalAprrove,setReqTotalAprrove] = useState([]); 
    const handleClose = () => setShow(false);

    const handleShow = (Id,Dept,Position,Level,ReqBy,ReqDate,ReqTotal) => {
        setidAprrove(Id);
        setDeptAprrove(Dept);
        setPositionAprrove(Position)
        setReqByAprrove(ReqBy);
        setLevelAprrove(Level);
        setReqDateAprrove(ReqDate);
        setReqTotalAprrove(ReqTotal);
        setShow(true);
    };

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
        getregisterall();
        getrequestall();
        getdatasummarydept();
        getdatauser();
        getPdapprove();
        getdatadept1();
        getdatadept2();
        getdatadept3();
        getdatadept4();
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

    // Accept Regsiter
    const handleSubmitregister = async (AcceptId,AcceptIndex,e) => {
        
    }
    console.log(dataRequestall)
    return (
            <Aux>
                <Row>
                    <Col>
                    <h5 className="mt-4">PD Approve</h5>
                    <hr/>
                        <Tabs defaultActiveKey="Request">
                            <Tab eventKey="Request" title="Request list">
                                <Table responsive hover>
                                    <thead>
                                        <tr class="text-center">
                                            <th>#</th>
                                            <th>Department</th>
                                            <th>Position</th>
                                            <th>Level</th>
                                            <th>Request By</th>
                                            <th>Request Date</th>
                                            <th>Request Total</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataRequestall.map((val,index) => (
                                            <tr class="text-center">
                                                <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                                <td>{val.Department}</td>
                                                <td>{val.Position}</td>
                                                <td>{val.Level}</td>
                                                <td>{val.ReqBy}</td>
                                                <td>{val.ReqDate}</td>
                                                <td>{val.Total}</td>
                                                <td>{val.Status}</td>
                                                <td>
                                                    <Button onClick={(e) => handleShow(val.Id,val.Department,val.Position,val.Level,val.ReqBy,val.ReqDate,val.Total)} className="btn btn-success">Approve</Button>
                                                    <Button className="btn btn-danger" onClick={(e) => handleDel(val.Id,index,e)}>Del</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Approve Manpower Request</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Department</Form.Label>
                                            <Form.Control type="input" value={DeptAprrove} disabled autoFocus/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Position</Form.Label>
                                            <Form.Control type="input" value={PositionAprrove} disabled autoFocus/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control type="input" value={LevelAprrove} disabled autoFocus/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Request By</Form.Label>
                                            <Form.Control type="input" value={ReqByAprrove} disabled autoFocus/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Request Date</Form.Label>
                                            <Form.Control type="input" value={ReqDateAprrove} disabled autoFocus/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Request Total</Form.Label>
                                            <Form.Control type="input" value={ReqTotalAprrove} autoFocus/>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="success" onClick={handleClose}>
                                    Approve
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
                                    {pdApprove.map(val => (
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label><h5>PD Approve : {val.Total}</h5></Form.Label>
                                        </Form.Group>
                                    ))}
                                    </Card.Body>
                                    </Card>
                                </Col>
                                </Row>
                                <Row>
                                    <h5>Manpower in department</h5>
                                    <hr></hr>
                                    <Table responsive hover>
                                    <thead>
                                        <tr class="text-center">
                                            <th>#</th>
                                            <th>Code</th>
                                            <th>Name</th>
                                            <th>Department</th>
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
                                                <th scope="row" key={val.Id}>{val.Datacnt}</th>
                                                <td>{val.Code}</td>
                                                <td>{val.Name}</td>
                                                <td>{val.Department}</td>
                                                <td>{val.Position}</td>
                                                <td>{val.Level}</td>
                                                <td>{val.Shift}</td>
                                                <td>{val.Birthday}</td>
                                                <td>{val.Start_Date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                </Row>
                            </Tab>
                        </Tabs> 
                    </Col>
                </Row>
            </Aux>
        );
}

export default FormsElements;