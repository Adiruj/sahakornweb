import React , {useState , useEffect } from 'react';

const ID_Token = window.localStorage.getItem("Token");
const Department_storage = window.localStorage.getItem("Department");

const PDNotify = () => {
    const [totalRequest,settotalRequest] = useState([]);

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
        .then(data => settotalRequest(data))
        .catch(Error => console.log(Error))
    }

    useEffect(() => {
        getPdapprove();
    },[])

    return(
        <div>
            <h6>3</h6>
        </div>
    )
}
export default PDNotify;