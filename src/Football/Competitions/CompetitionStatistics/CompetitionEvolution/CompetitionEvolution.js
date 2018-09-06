import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class CompetitionEvolution extends Component {

  render() {

    const data = {
      labels: this.props.displayData.rounds,
      datasets: [
        {
          label: 'Position',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.displayData.positions
        }
      ]
    };

    return (
      <div>
        <Line data={data} />
      </div>
    );
  }



}

export default CompetitionEvolution;