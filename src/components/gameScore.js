import React from 'react';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    gameScoreTitle: {
      padding: theme.spacing.unit * 2,
      textAlign: 'left',
      fontSize: '3em',
      color: '#95a5a6',
    },
    gameScoreTable: {
      textAlign: 'center',
      fontSize: '1.2em',
      color: '#34495e',
    }
  });

  

function gameScore(props) {
    const { classes, gameScorePlayer1, gameScorePlayer2 } = props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div className={classes.gameScoreTitle}>Game score</div>
                        <Divider  />
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
            </div>
        );
}

gameScore.propTypes = {
    classes: PropTypes.object.isRequired,
    gameScorePlayer1: PropTypes.array.isRequired,
    gameScorePlayer2: PropTypes.array.isRequired,
  };
  
  export default withStyles(styles)(gameScore);
