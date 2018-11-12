import React from 'react';
import './TableLeague.css';
import { Link } from 'react-router-dom';

const TableLeague = ( props ) => {

    return (
        <div className="TableLeague">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Position</td>
                        <td>Team</td>
                        <td>MW</td>
                        <td>MD</td>
                        <td>ML</td>
                        <td>Points</td>
                    </tr>
                </thead>
                <tbody>
                {props.teamStatsRoundList.map((item, index) => 
                    <tr key={index}>
                        <td>{item.position}</td>
                        <td className="iconAndNameColumn">
                        <Link to={{
                            pathname: '/teams/team-details/'+item.teamId
                        }}>
                            <div><img src={item.teamLogo.url} width="20" height="20"/>{item.teamName}</div>
                        </Link>
                        </td>
                        <td>{item.matchesWon}</td>
                        <td>{item.matchesDraw}</td>
                        <td>{item.matchesLost}</td>
                        <td><strong>{item.points}</strong></td>
                    </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
};

export default TableLeague;