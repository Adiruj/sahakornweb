import React , {useState , useEffect} from 'react';
import NVD3Chart from 'react-nvd3';
import { useParams } from 'react-router-dom';

const ID_Token = window.localStorage.getItem("Token");

const PieDonutChart = () => {
    const { Dept } = useParams();
    const [hasError,setHaserror] = useState(false);
    const [datasummaryDept,setdatasummaryDept] = useState([]);

    async function getdatasummarydept() {
        const res = await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/dept/summary/' + Dept,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatasummaryDept(data))
        .catch(Error => setHaserror(Error))
    }
    
    
    const datum = [
        {key: "Overall", y: datasummaryDept.map(val => (val.Overall)), color: "#04a9f5"},
        {key: "Actual", y: datasummaryDept.map(val => (val.Actual)), color: "#f4c22b"},
        {key: "Diff", y: datasummaryDept.map(val => (val.Overall - val.Actual)), color: "#ff8a65"}
    ];

    useEffect(()=> {
        getdatasummarydept();
    }, []);

    return (
        <NVD3Chart id="chart" height={250} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
    )
}

export default PieDonutChart;