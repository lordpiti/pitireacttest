import React from 'react';
import styles from './TableLeague.module.css';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@material-ui/core';

interface TableLeagueProps {
  teamStatsRoundList: any[];
}

const TableLeague = (props: TableLeagueProps) => {
  return (
    <Card>
      <CardHeader title='Table' />
      <CardContent>
        <div className={styles.TableLeague}>
          <table className='table table-striped'>
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
              {props.teamStatsRoundList.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.position}</td>
                  <td className={styles.iconAndNameColumn}>
                    <Link
                      to={{
                        pathname: `/teams/team-details/${item.teamId}`,
                      }}
                    >
                      <div>
                        <img
                          src={item.teamLogo.url}
                          width='20'
                          height='20'
                          alt=''
                        />
                        {item.teamName}
                      </div>
                    </Link>
                  </td>
                  <td>{item.matchesWon}</td>
                  <td>{item.matchesDraw}</td>
                  <td>{item.matchesLost}</td>
                  <td>
                    <strong>{item.points}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableLeague;
