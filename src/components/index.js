import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import GameScore from './gameScore';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginLeft : '20%',
      marginRight: '20%',
    },
    players: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: '#0984e3', //theme.palette.text.secondary,
      fontSize: '5em',
      fontWeight: 'bold',
      cursor: 'pointer',
      userSelect: 'none',
    },
    matchEnd: {
      padding: theme.spacing.unit * 2,
      color: '#16a085', //theme.palette.text.secondary,
      fontSize: '4em',
      fontWeight: 'bold',
      userSelect: 'none',
    },
    tieBreak: {
      color: '#e74c3c', //theme.palette.text.secondary,
      fontSize: '5em',
    },
    gameScoreTable: {
      textAlign: 'center',
      fontSize: '1.2em',
      color: '#34495e',
    }
  });

class index extends Component {

    state = {
      scores : [0, 0],
      gameScorePlayer1 : [],
      gameScorePlayer2 : [],
      // setScorePlayer1 : [],
      // setScorePlayer2 : [],
      endGame: false,
      winner: null,
      isTieBreak: false,
    }

    handlePlayerClick = (playerNumber) => () => {
      let newScores = this.handleScore(this.state.scores[playerNumber], playerNumber);
      this.setState({scores: newScores});
    }

    componentDidUpdate() {
    };

    handleScore = (currentScore, playerNumber) => {
      let scores = this.state.scores;
      switch(currentScore) {
        case 0:
          scores[playerNumber] = 15;
          break;
        case 15:
          scores[playerNumber] = 30;
          break;
        case 30:
          scores[playerNumber] = 40;
          break;
        case 40:
          scores = this.handleDeuceRule(playerNumber, scores);
          break;
        case '40A':
          this.handleNewGameScorePlayer(playerNumber);
          scores = [0, 0];
          break;
        default:
           break;
      }
      return scores;
  }



  handleNewGameScorePlayer = (playerNumber) => {
    this.handleGlobaleScorePlayer(playerNumber);

    if(this.state.gameScorePlayer1.length === 6 && this.state.gameScorePlayer2.length<=4){
      this.setState({endGame: true, winner: 'Player 1'})
    }
    if(this.state.gameScorePlayer2.length === 6 && this.state.gameScorePlayer1.length<=4){
      this.setState({endGame: true, winner: 'Player 2'})
    }

    if(this.state.gameScorePlayer1.length === 5 && this.state.gameScorePlayer2.length === 7){
      this.setState({endGame: true, winner: 'Player 1'})
    }
    if(this.state.gameScorePlayer2.length === 5 && this.state.gameScorePlayer1.length === 7){
      this.setState({endGame: true, winner: 'Player 2'})
    }

    if(this.state.gameScorePlayer1.length === 6 && this.state.gameScorePlayer2.length === 6){
      this.setState({isTieBreak: true})
    }

  }

  handleGlobaleScorePlayer = (playerNumber) => {
    if(playerNumber){ // Player 2
      let newgameScorePlayer2 = this.state.gameScorePlayer2;
      newgameScorePlayer2.push(this.state.gameScorePlayer2.length+1);
      this.setState({gameScorePlayer2: newgameScorePlayer2});
    }else { // Player 1
      let newgameScorePlayer1 = this.state.gameScorePlayer1;
      newgameScorePlayer1.push(this.state.gameScorePlayer1.length+1);
      this.setState({gameScorePlayer1: newgameScorePlayer1});
    }
  }

  handleNewMatch = () => {
    let stateOfNewMatch = {
      scores : [0, 0],
      gameScorePlayer1 : [],
      gameScorePlayer2 : [],
      endGame: false,
      winner: null,
      isTieBreak: false,
    }
    this.setState(stateOfNewMatch)
  }

  handletieBreakRule = (playerNumber) =>  () => {
    this.handleGlobaleScorePlayer(playerNumber)
    const scorePlayer1 = this.state.gameScorePlayer1.length;
    const scorePlayer2 = this.state.gameScorePlayer2.length;
    if(scorePlayer1 - scorePlayer2 === 2){
      this.setState({endGame: true, winner: 'Player 1'})
    }
    if(scorePlayer2 - scorePlayer1 === 2){
      this.setState({endGame: true, winner: 'Player 2'})
    }

  }

  handleDeuceRule = (playerNumber, scores) => {
    if(playerNumber){ // PLAYER 1
      if(scores[0] === 40){
        scores[1] = '40A';
      }else if (scores[0] === '40A'){
        scores[0] = 40;
      }else {
        this.handleNewGameScorePlayer(playerNumber);
        scores = [0, 0];
      }
    }else { // Player 2
      if(scores[1] === 40){
        scores[0] = '40A';
      }else if (scores[1] === '40A'){
        scores[1] = 40;
      }else {
        this.handleNewGameScorePlayer(playerNumber);
        scores = [0, 0];
      }
    }
    return scores;
  }


    render() {
        return (
            <div className={this.props.classes.root}>
              <div hidden={!this.state.isTieBreak || this.state.endGame}>
                <Grid container spacing={24} >
                    <Grid item xs={12}>
                        <div className={this.props.classes.tieBreak} >Tie Break</div>
                        <Divider  />
                    </Grid>
                    <Grid item xs={6}>
                      <div className={this.props.classes.players} onClick={this.handletieBreakRule(0)}>Player 0</div>
                    <Divider  />
                    </Grid>
                    <Grid item xs={6}>
                      <div className={this.props.classes.players} onClick={this.handletieBreakRule(1)}>Player 1</div>
                    <Divider  />
                    </Grid>
                    <Grid item xs={6}>
                      <div className={this.props.classes.players}>{this.state.gameScorePlayer1[this.state.gameScorePlayer1.length-1]}</div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={this.props.classes.players}>{this.state.gameScorePlayer2[this.state.gameScorePlayer2.length-1]}</div>
                    </Grid>
                </Grid>
              </div>

              <div hidden={!this.state.endGame} >
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <div className={this.props.classes.matchEnd}>WINNER IS : {this.state.winner}</div>
                  <Button variant="outlined" onClick={this.handleNewMatch} color="primary"> New Match </Button>
                </Grid>
                <Grid item xs={6}>
                    <Table>
                        <TableBody>
                        {this.state.gameScorePlayer1.map((row, index) => {
                            return (
                            <TableRow key={index}>
                                <TableCell className={this.props.classes.gameScoreTable} component="th" scope="row">
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
                        {this.state.gameScorePlayer2.map((row, index) => {
                            return (
                            <TableRow key={index}>
                                <TableCell className={this.props.classes.gameScoreTable} component="th" scope="row">
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
              <div hidden={this.state.endGame || this.state.isTieBreak}>
              <Grid container spacing={24}>
                <Grid item xs={6} >
                  <div className={this.props.classes.players} onClick={this.handlePlayerClick(0)}>Player 0</div>
                <Divider  />
                </Grid>
                <Grid item xs={6}>
                  <div className={this.props.classes.players} onClick={this.handlePlayerClick(1)}>Player 1</div>
                <Divider  />
                </Grid>
                <Grid item xs={6}>
                  <div className={this.props.classes.players}>{this.state.scores[0]}</div>
                </Grid>
                <Grid item xs={6}>
                  <div className={this.props.classes.players}>{this.state.scores[1]}</div>
                </Grid>
              {/* GAME SCORE */}
                <Grid item xs={12} hidden={this.state.endGame}>
                  <GameScore gameScorePlayer1={this.state.gameScorePlayer1} gameScorePlayer2={this.state.gameScorePlayer2}/>
                </Grid>
              </Grid>
              </div>


            </div>
        );
    }
}


index.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(index);
