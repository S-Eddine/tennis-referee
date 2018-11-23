import React from 'react';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
  });

  

function SetScore(props) {
    const { classes, scores, handlePlayerClick } = props;
        return (
            <Grid container spacing={24}>
            <Grid item xs={6} >
              <div className={classes.players} onClick={handlePlayerClick(0)}>Player 0</div>
            <Divider  />
            </Grid>
            <Grid item xs={6}>
              <div className={classes.players} onClick={handlePlayerClick(1)}>Player 1</div>
            <Divider  />
            </Grid>
            <Grid item xs={6}>
              <div className={classes.players}>{scores[0]}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.players}>{scores[1]}</div>
            </Grid>
          </Grid>
        );
}

SetScore.propTypes = {
    classes: PropTypes.object.isRequired,
    scores: PropTypes.array.isRequired,
    handlePlayerClick: PropTypes.func.isRequired,
  };
  
  export default withStyles(styles)(SetScore);
