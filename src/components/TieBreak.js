import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginLeft : '20%',
      marginRight: '20%',
    },
    players: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: '#0984e3',
      fontSize: '5em',
      fontWeight: 'bold',
      cursor: 'pointer',
      userSelect: 'none',
    },
    tieBreak: {
      color: '#e74c3c',
      fontSize: '5em',
    },
  });


function TieBreak(props) {
    const { classes, gameScorePlayer1, gameScorePlayer2 , handleTieBreakRule} = props;
    return (
        <Grid container spacing={24} >
            <Grid item xs={12}>
                <div className={classes.tieBreak} >Tie Break</div>
                <Divider  />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.players} onClick={handleTieBreakRule(0)}>Player 0</div>
            <Divider  />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.players} onClick={handleTieBreakRule(1)}>Player 1</div>
            <Divider  />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.players}>{gameScorePlayer1[gameScorePlayer1.length-1]}</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.players}>{gameScorePlayer2[gameScorePlayer2.length-1]}</div>
            </Grid>
        </Grid>
    );
}


TieBreak.propTypes = {
    classes: PropTypes.object.isRequired,
    handleTieBreakRule: PropTypes.func.isRequired,
    gameScorePlayer1: PropTypes.array.isRequired,
    gameScorePlayer2: PropTypes.array.isRequired,

  };
  
  export default withStyles(styles)(TieBreak);
