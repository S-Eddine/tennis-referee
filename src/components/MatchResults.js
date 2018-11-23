import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from "@material-ui/core/TableRow";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginLeft : '20%',
      marginRight: '20%',
    },
    matchEnd: {
      padding: theme.spacing.unit * 2,
      color: '#16a085',
      fontSize: '4em',
      fontWeight: 'bold',
      userSelect: 'none',
    },
    gameScoreTable: {
      textAlign: 'center',
      fontSize: '1.2em',
      color: '#34495e',
    }
  });

function MatchResults(props){
    const { classes, gameScorePlayer1, gameScorePlayer2 , winner, handleNewMatch} = props;
        return (
            <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={classes.matchEnd}>WINNER IS : {winner}</div>
              <Button variant="outlined" onClick={handleNewMatch} color="primary"> New Match </Button>
            </Grid>
            <Grid item xs={6}>
                <Table>
                    <TableBody>
                    {gameScorePlayer1.map((row, index) => {
                        return (
                        <TableRow key={index}>
                            <TableCell className={classes.gameScoreTable} component="th" scope="row">
                            {row}
                            </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </Grid>
                <Grid item xs={6}>
                <Table>
                    <TableBody>
                    {gameScorePlayer2.map((row, index) => {
                        return (
                        <TableRow key={index}>
                            <TableCell className={classes.gameScoreTable} component="th" scope="row">
                            {row}
                            </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </Grid>
                
          </Grid>
        );
}


MatchResults.propTypes = {
    classes: PropTypes.object.isRequired,
    gameScorePlayer1: PropTypes.array.isRequired,
    gameScorePlayer2: PropTypes.array.isRequired,
    winner: PropTypes.string,
    handleNewMatch: PropTypes.func.isRequired,
};
  
export default withStyles(styles)(MatchResults);
