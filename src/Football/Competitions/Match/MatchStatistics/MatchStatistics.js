import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

const MatchStatistics = (props) => {

  const createChartData = (localData, visitorData) => {
    return {
      labels: [
        'Local',
        'Visitor'
      ],
      datasets: [{
        data: [localData, visitorData],
        backgroundColor: [
        '#FF6384',
        '#36A2EB'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB'
        ]
      }]
    };
  }

  const dataPosession = createChartData(props.statistics.posessionLocal, props.statistics.posessionVisitor); 
  const dataCorners = createChartData(props.statistics.cornersLocal, props.statistics.cornersVisitor); 
  const dataOffsides = createChartData(props.statistics.offsideLocal, props.statistics.offsideVisitor); 

  return (
    <div className="row">
      <div className="col-sm-4">
        <h3>Posession</h3>
        <Doughnut data={dataPosession} />
      </div>
      <div className="col-sm-4">
      <h3>Corners</h3>
        <Doughnut data={dataCorners} />
      </div>
      <div className="col-sm-4">
      <h3>Offsides</h3>
        <Doughnut data={dataOffsides} />
      </div>
    </div>
  );
};

export default MatchStatistics;