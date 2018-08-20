import React from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr/dist/browser/signalr';

const CompetitionSimulation = ( props ) => {

    let connection = new HubConnectionBuilder()
    .withUrl("https://footballpitiapi.azurewebsites.net/loopy")
    .build();
 
    connection.on("StartSimulation", data => {
        console.log(data);
    });

    connection.on('SendCreateMatch', data => {
        console.log(data);
    });

    connection.on('Send', data => {
        console.log(data);
    });
    
    connection.start()
        .then(() => connection.invoke("send", "Hello"));

    return (
        <div>
            competition simulation
        </div>
    )
};

export default CompetitionSimulation;