import React from 'react';

const CompetitionSimulationMatchEvent = ( props ) => {

    let description = props.event.description+' '+ props.event.player1.name + ' '+ props.event.player1.surname;

    if (props.event.player2) {
        description += ' retires and ' + props.event.player2.name+' '+ props.event.player2.surname+' joins the game';
    }

    return (
        <div className="row">
            <div className="col-sm-3">
                {props.event.minute}
            </div>
            <div className="col-sm-9">
                 {description} 
            </div>
        </div>
    )
};

export default CompetitionSimulationMatchEvent;