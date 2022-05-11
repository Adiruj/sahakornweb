import React, { useState , useEffect} from 'react';
import {Row, Col ,Card, Form } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

const ID_Profile = window.localStorage.getItem("ID");
const ID_Token = window.localStorage.getItem("Token");

const SamplePage = () => {

    const [dataProfile,setdataProfile] = useState([]);
    async function getprofiledata() {
            await fetch('http://13.250.116.42/node/express/api/profile/getprofile/ID/'+ID_Profile,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
            .then(response => response.json())
            .then(data => setdataProfile(data))
            .catch(Error => console.log(Error));
    }

    useEffect(()=> {
        getprofiledata();
        //console.log(JSON.stringify(dataProfile));
    }, []);
    //console.log(JSON.stringify(dataProfile[0]))
    //console.log(dataProfile);

    return (
        <Aux>
            <Row>
                
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Profile Information</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                            <Col md={4}>
                                        <Form>
                                            <Form.Group controlId="formBasicEmail">
                                                <Card>
                                                    <Card.Img src='https://scontent.fbkk22-8.fna.fbcdn.net/v/t1.6435-9/176026697_10217995012017960_8350068395920015611_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFl81l6vXQ9Vlq70AMfnUX7TVl0R3WKp4BNWXRHdYqngA0rvjq5kaHkWcos_dV7Zq4&_nc_ohc=7lGTrHTR4BIAX84Ez9e&_nc_ht=scontent.fbkk22-8.fna&oh=00_AT9BW5q1TZJOiZKuglIMYCOD2DN2gIna1Wip2Q4yHBPxdQ&oe=6295A94D' />
                                                </Card>
                                            </Form.Group>
                                        </Form>
                                    </Col>

                                    {dataProfile.map(val => (
                                    <Col md={8}>
                                        <Row>
                                            <Col md={3}>
                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Code : </Form.Label>
                                                    <Form.Control as="input" disabled value={val.Code}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Group controlId="exampleForm.ControlInput2">
                                                    <Form.Label>Name : </Form.Label>
                                                    <Form.Control as="input" disabled value={val.Name}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                <Form.Group controlId="exampleForm.ControlInput3">
                                                    <Form.Label>Level : </Form.Label>
                                                    <Form.Control as="input" disabled value={val.Level}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group controlId="exampleForm.ControlInput4">
                                                    <Form.Label>Shift : </Form.Label>
                                                    <Form.Control as="input" disabled value={val.Shift}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group controlId="exampleForm.ControlInput7">
                                                    <Form.Label>Birthday : </Form.Label>
                                                    <Form.Control as="input" disabled value={val.Birthday}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group controlId="exampleForm.ControlInput8">
                                                    <Form.Label>Start Working : </Form.Label>
                                                    <Form.Control as="input" disabled value={val.Start_Date}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="exampleForm.ControlInput5">
                                                    <Form.Label>Position : </Form.Label>
                                                    <Form.Control as="input" disabled value={val.Position}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="exampleForm.ControlInput6">
                                                    <Form.Label>Department : </Form.Label>
                                                    <Form.Control as="input" disabled value={val.Dept}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Detail : </Form.Label>
                                                    <Form.Control as="textarea" rows="3" value={val.Detail}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>                                                                                                                                                                                                                                                   
                                    </Col>
                                    ))}

                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}


export default SamplePage;