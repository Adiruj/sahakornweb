import React , {useState , useEffect } from 'react';
import {Row, Col, Card, Form, Table ,Button ,Tab , Tabs} from 'react-bootstrap';
import Aux from "../../../hoc/_Aux";

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
                                        <Table responsive hover>
                                        <thead>
                                            <tr className="text-center"> 
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
                                        {dataRegisterall.map((val,index) => (
                                            <tr key={val.index} className="text-center">
                                                <th scope="row">{val.Datacnt}</th>
                                                <td>{val.Name}</td>
                                                <td>{val.Dept}</td>
                                                <td>{val.Position}</td>
                                                <td>{val.Level}</td>
                                                <td><Button className="btn btn-primary" href={'http://13.250.116.42/node/express/api/dowload/resume/'+val.Id} target="_blank" >Resume</Button></td>
                                                <td><Button className="btn btn-success" >Accept</Button><Button className="btn btn-danger" onClick={(e) => handleDel(val.Id,index,e)}>Del</Button><Button className="btn btn-secondary">Edit</Button></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="Request" title="Request list">
                            <Row>
                                    <Col md={4}>
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
                                    <Col md={3}>
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
                                    <Col md={3}>
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
                                        <Table responsive hover>
                                        <thead>
                                            <tr className="text-center"> 
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
                                        {dataRequestrall.map((val,index) => (
                                            <tr key={val.index} className="text-center">
                                                <th scope="row">{val.Datacnt}</th>
                                                <td>{val.Department}</td>
                                                <td>{val.Position}</td>
                                                <td>{val.Level}</td>
                                                <td>{val.ReqBy}</td>
                                                <td>{val.ReqDate}</td>
                                                <td>{val.Total}</td>
                                                <td>{val.Status}</td>
                                                <td><Button className="btn btn-success btn-block" >Complete</Button></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
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
