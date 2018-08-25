import React, { Component } from 'react';
import apiInstance from '../../utilities/axios-test';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class CompetitionsOverview extends Component {

    constructor(props){
        super(props);
        apiInstance.get('competition').then(response => {
          this.setState({
            competitions: response.data
          });
        })
      }

    render () {

        let competitionList = null;
        let totalTable = null;
        if (this.state && this.state.competitions) {
            competitionList = this.state.competitions.map(competition =>
                <TableRow key={competition.id}>
                    <TableCell component="th" scope="row">
                    <Link to={{
                            pathname: this.props.match.url+'/competition-details/'+competition.id
                        }}>
                        <div>{competition.name}</div>
                    </Link>
                    </TableCell>
                </TableRow>             
            )
            totalTable = <Paper className={CompetitionsOverview.propTypes.classes.root}>
                <Table className={CompetitionsOverview.propTypes.classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Competition name</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {competitionList}
                    </TableBody>
                </Table>
            </Paper>;
        }   

        return (
            <div>{totalTable}</div>
        );
    }
}

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

  CompetitionsOverview.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CompetitionsOverview);
