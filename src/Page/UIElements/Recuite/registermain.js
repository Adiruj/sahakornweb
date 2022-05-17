import React , {useState , useEffect } from 'react';
import {Row, Col, Card, Form, Table ,Button ,Tab , Tabs , Modal} from 'react-bootstrap';
import Aux from "../../../hoc/_Aux";
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const ID_Token = window.localStorage.getItem("Token");
const Department_storage = window.localStorage.getItem("Department");

const FormsElements = () => {
    const [deptlist , setdeptlist] = useState([]);
    const [deptposition , setdeptposition] = useState([]);
    const [deptlevel , setdeptlevel] = useState([]);

    const [Name , setName] = useState([]);
    const [Dept , setDeptsel] = useState([]);
    const [Position , setPositionsel] = useState([]);
    const [Level , setLevelsel] = useState([]);
    const [dataRegisterall , setdataRegisterall] = useState([]);
    const [dataRequestrall , setdataRequestrall] = useState([]);
    const [approveTotal , setapproveTotal] = useState([]);
    const [fileupload , setfileupload] = useState([]);
    //const [Resumess , setfileuploadres] = useState([]);

    const [show, setShow] = useState(false);
    const [Id,setIdcandidate] = useState([]);
    const [nameCandidate,setnameCandidate] = useState([]); 
    const [departmentCandidate,setdepartmentCandidate] = useState([]); 
    const [positionCandidate,setpositionCandidate] = useState([]); 
    const [levelCandidate,setlevelCandidate] = useState([]);
    const [resumeCandidate,setresumeCandidate] = useState([]); 
    const [stautsCandidate,setstautsCandidate] = useState([]); 
    const handleClose = () => setShow(false);


    const [showReq, setshowReq] = useState(false);
    const [IdReq,setIdReq] = useState([]);
    const [departmentReq,setdepartmentReq] = useState([]); 
    const [positionReq,setpositionReq] = useState([]); 
    const [levelReq,setlevelReq] = useState([]);
    const [ReqBy,setReqBy] = useState([]); 
    const [ReqDate,setReqDate] = useState([]); 
    const [ReqTotal,setReqTotal] = useState([]); 
    const [ReqStatus,setReqStatus] = useState([]); 
    const handleCloseReq = () => setshowReq(false);


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
        await fetch('http://13.250.116.42/node/express/api/candidate/getcandidate/',{
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
        await fetch('http://13.250.116.42/node/express/api/pd/getpd/request',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(respones => respones.json())
        .then(data => setdataRequestrall(data))
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

    /// POST New register
    async function postregister (registerdata) {
        return fetch('http://13.250.116.42/node/express/api/candidate/postcandidate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': ID_Token
            },
            body: JSON.stringify(registerdata)
        })
        .then(data => data.json())
        .catch(err => console.log(err))
    }

    const handleSubmit = async () => {
        const fd = new FormData();
        fd.append('fileupload', fileupload);

        const url = "http://13.250.116.42/node/express/api/upload/resume/";
        const res = await fetch(url , {
            method: 'POST',
            body: fd,
            headers: {
                'authorization': ID_Token
                }
        }).catch(err => console.log(err))
        const data = await res.json();
        if(data.mimetype === "application/pdf"){
            const Resume = data.filename
            const respone = await postregister({
                Name,
                Dept,
                Position,
                Level,
                Resume
            })
            if('protocol41' in respone === true){
                alert('บันทึกสำเร็จ')
                window.location.reload(false);
                console.log(Resume)
            }
        }
    }

    //delete register from db
    const handleDel = async (delId,delIndex,e) => {
        const res = await fetch('http://13.250.116.42/node/express/api/register/delregister/'+delId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
                },
            })
            .then(data => data.json())

            if('protocol41' in res === true){
                //setdataRegisterall(dataRegisterall.filter((v, i) => i !== delIndex));
                setdataRegisterall(dataRegisterall.filter((val, i) => i !== delIndex));
                alert('ลบข้อมูลสำเร็จ')
            }
    }

    useEffect(()=>{
        getdeptlist();
        getpositionlist();
        getlevellist();
        getregisterall();
        getrequestall();
        getPDapproveTotal();
    },[])

    //For Candidate List
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
    var dataTablecurrent = dataRegisterall.map(val => (
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

    //For Request List
    const BTViewdataReq = () => {
        return (
            <div>
                <Button className="btn btn-primary">
                    View
                </Button>
            </div>
        )
    }
    //Current List
    var dataTableReq = dataRequestrall.map(val => (
        {
            Id: val.Id,
            Department: val.Department,
            Position: val.Position,
            Level: val.Level,
            ReqBy: val.ReqBy,
            ReqDate: val.ReqDate,
            Total: val.Total,
            Status: val.Status
        }
    ));
    var optionsReq = {
            onRowClick: function(row){   
            setIdReq(row.Id);
            setdepartmentReq(row.Department);
            setpositionReq(row.Position)
            setlevelReq(row.Level);
            setReqBy(row.ReqBy);
            setReqDate(row.ReqDate);
            setReqTotal(row.Total);
            setReqStatus(row.Status);
            setshowReq(true);
        }
    }
    const handleAccepReq = async () => {

    }

    const handleDelReq = async () => {

    }

        return (
            <Aux>
                <Row>
                    <Col>
                        <h5 className="mt-4">Candidate register & edit</h5>
                        <hr/>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add New Register</Card.Title>
                                
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="exampleForm.Name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="input" placeholder="Name - Lastname" onChange={(e) => setName(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="exampleForm.dept">
                                            <Form.Label>Department</Form.Label>
                                            <Form.Control as="select" onChange={(e) => setDeptsel(e.target.value)}>
                                                <option>Department</option>
                                                {deptlist.map(val => (
                                                <option>{val.Department}</option>
                                                ))}
                                            </Form.Control>
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
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Resume File</Form.Label>
                                            <Form.Control type="file" accept='application/pdf'onChange={(e) => setfileupload(e.target.files[0])}/>
                                        </Form.Group>
                                    </Col>
                                    <Button variant="primary btn-lg mt-4 btn-block" onClick={handleSubmit}>
                                    <i className="feather icon-save"/> Register
                                    </Button>
                                </Row>
                                <Row>
                                </Row>            
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tabs defaultActiveKey="Register">
                            <Tab eventKey="Register" title="Candidate list">
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="exampleForm.Name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="input" placeholder="Name - Lastname" onChange={(e) => setName(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="exampleForm.dept">
                                            <Form.Label>Department</Form.Label>
                                            <Form.Control as="select" onChange={(e) => setDeptsel(e.target.value)}>
                                                <option>Department</option>
                                                {deptlist.map(val => (
                                                <option>{val.Department}</option>
                                                ))}
                                            </Form.Control>
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
                                        <Button variant="primary btn-lg mt-4 btn-block" onClick={handleSubmit}>
                                        <i className="feather icon-search"/>Search
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
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
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="Request" title="Request list">
                                <Row>
                                    <Col>
                                    <BootstrapTable data={dataTableReq} options={dataTableReq} striped hover pagination exportCSV search>
                                    <TableHeaderColumn hidden isKey dataField='Id' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn hidden dataField='Resume' dataSort={ true } headerAlign='center' dataAlign='center'></TableHeaderColumn>
                                    <TableHeaderColumn dataField='Department' dataSort={ true } headerAlign='center' dataAlign='center'>Department</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Position' dataSort={ true } headerAlign='center' dataAlign='center'>Position</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Level' dataSort={ true } headerAlign='center' dataAlign='center'>Level</TableHeaderColumn>
                                    <TableHeaderColumn dataField='ReqBy' dataSort={ true } headerAlign='center' dataAlign='center'>Request By</TableHeaderColumn>
                                    <TableHeaderColumn dataField='ReqDate' dataSort={ true } headerAlign='center' dataAlign='center'>Request Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Total' dataSort={ true } headerAlign='center' dataAlign='center'>Total</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Status' dataSort={ true } headerAlign='center' dataAlign='center'>Status</TableHeaderColumn>
                                    <TableHeaderColumn hidden dataField='Action' headerAlign='center' dataAlign='center' dataFormat={BTViewdata}>Action</TableHeaderColumn>
                                    </BootstrapTable>
                                    <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Manpower Request Information</Modal.Title>
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
