import React from 'react';
import NVD3Chart from 'react-nvd3';

function getDatum() {
    var Overall = [],
        Actual = [],
        Diff = [];
    for (var i = 0; i < 30; i++) {
        Overall.push({
            'x': i,
            'y': Math.sin(i / 10)
        });
        Actual.push({
            'x': i,
            'y': Math.sin(i / 10) * 0.25 + 0.5
        });
        Diff.push({
            'x': i,
            'y': .5 * Math.cos(i / 10)
        });
    }
    return [
        {
            values: Overall,
            key: 'Overall',
            color: '#A389D4'
        },
        {
            values: Actual,
            key: 'Actual',
            color: '#04a9f5'
        },
        {
            values: Diff,
            key: 'Diff',
            color: '#1de9b6',
            area: true
        }
    ];
}

class LineChart extends React.Component {

    render() {
        const data = getDatum();
        return (
            <div>
                {
                    React.createElement(NVD3Chart, {
                        xAxis: {
                            tickFormat: function(d){ return d; },
                            axisLabel: 'Date'
                        },
                        yAxis: {
                            axisLabel: 'Manpower',
                            tickFormat: function(d) {return parseFloat(d).toFixed(2); }
                        },
                        type:'lineChart',
                        datum: data,
                        x: 'x',
                        y: 'y',
                        height: 300,
                        renderEnd: function(){
                            console.log('renderEnd');
                        }
                    })
                }
            </div>
        )
    }
}

export default LineChart;