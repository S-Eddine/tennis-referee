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
    setScoreTitle: {
      padding: theme.spacing.unit * 2,
      textAlign: 'left',
      fontSize: '3em',
      color: '#95a5a6',
    },
    setScoreTable: {
      textAlign: 'center',
      fontSize: '1.6em',
      color: '#34495e',
    }
  });

  

function setScore(props) {
    const { classes, setScorePlayer1, setScorePlayer2 } = props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div className={classes.setScoreTitle}>Game score</div>
                        <Divider  />
                    </Grid>

                    <Grid item xs={6}>
                    <Table>
                        <TableBody>
                        {setScorePlayer1.map((row, index) => {
                            return (
                            <TableRow key={index}>
                                <TableCell className={classes.setScoreTable} component="th" scope="row">
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
                      {setScorePlayer2.map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className={classes.setScoreTable} component="th" scope="row">
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

setScore.propTypes = {
    classes: PropTypes.object.isRequired,
    setScorePlayer1: PropTypes.array.isRequired,
    setScorePlayer2: PropTypes.array.isRequired,
  };
  
  export default withStyles(styles)(setScore);
