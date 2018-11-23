import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GameScore from './GameScore';
import MatchResults from './MatchResults';
import SetScore from './SetScore';


import TieBreak from './TieBreak';

const styles = () => ({
    root: {
      flexGrow: 1,
      marginLeft : '20%',
      marginRight: '20%',
    }
  });
class Index extends Component {

    state = {
      scores : [0, 0],
      gameScorePlayer1 : [],
      gameScorePlayer2 : [],
      endGame: false,
      winner: null,
      isTieBreak: false,
    }

    handlePlayerClick = (playerNumber) => () => {
      let newScores = this.handleScore(this.state.scores[playerNumber], playerNumber);
      this.setState({scores: newScores});
    }

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
    this.handleMatchScorePlayer(playerNumber);

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

  handleMatchScorePlayer = (playerNumber) => {
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

  handleTieBreakRule = (playerNumber) =>  () => {
    this.handleMatchScorePlayer(playerNumber)
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

              {/* TIE-BREAK Rule*/}
              <div hidden={!this.state.isTieBreak || this.state.endGame}>
                <TieBreak gameScorePlayer1={this.state.gameScorePlayer1} gameScorePlayer2={this.state.gameScorePlayer2} handleTieBreakRule={this.handleTieBreakRule}/>
              </div>

              {/* Match Results */}
              <div hidden={!this.state.endGame} >
                <MatchResults gameScorePlayer1={this.state.gameScorePlayer1} gameScorePlayer2={this.state.gameScorePlayer2} winner=       {this.state.winner} handleNewMatch={this.handleNewMatch}/>
              </div>

              {/** Set Score */}
              <div hidden={this.state.endGame || this.state.isTieBreak}>
                <SetScore scores={this.state.scores} handlePlayerClick={this.handlePlayerClick}/>
              </div>
              
              {/* GAME SCORE */}
              <div hidden={this.state.endGame}>
                <GameScore gameScorePlayer1={this.state.gameScorePlayer1} gameScorePlayer2={this.state.gameScorePlayer2}/>
              </div>

            </div>
        );
    }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Index);
