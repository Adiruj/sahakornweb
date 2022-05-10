import React , {useState , useEffect} from 'react';
import NVD3Chart from 'react-nvd3';

const ID_Token = window.localStorage.getItem("Token");

const PieDonutChart = () => {
    const [hasError,setHaserror] = useState(false);
    const [datasummaryDeptall,setdatasummaryDeptall] = useState([]);

    async function getdatasummarydeptall() {
        const res = await fetch('http://13.250.116.42/node/express/api/department/getdept/manpower/summary',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': ID_Token
            }
        })
        .then(response => response.json()) 
        .then(data => setdatasummaryDeptall(data))
        .catch(Error => setHaserror(Error))
    }
    
    
    const datum = [
        {key: "Overall", y: datasummaryDeptall.map(val => (val.Overall)), color: "#04a9f5"},
        {key: "Actual", y: datasummaryDeptall.map(val => (val.Actual)), color: "#f4c22b"},
        {key: "Diff", y: datasummaryDeptall.map(val => (val.Overall - val.Actual)), color: "#ff8a65"}
    ];

    useEffect(()=> {
        getdatasummarydeptall();
    }, []);
console.log(datasummaryDeptall)

    return (
        <NVD3Chart id="chart" height={250} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
    )
}

export default PieDonutChart;