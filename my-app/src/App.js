import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import * as spreadsheet from "./spreadsheet";

(async () => {
  var sheetId = '194iz66ka28ejiDV6_iHtGyV7V6gK8QSl9eFb8cMC1IM';
  //await spreadsheet.vote(sheetId, 'Judge A', 'Due Diligence', 'Elm', 'Birch', 'Fir');
  //await spreadsheet.vote(sheetId, 'Judge B', 'Partner Meeting', 'Birch', 'Ash', 'Dogwood');
  //await spreadsheet.vote(sheetId, 'Judge C', 'Written Deliverables', 'Dogwood', 'Birch', 'Cherry');
  //await spreadsheet.vote(sheetId, 'Judge D', 'Due Diligence', 'Cherry', 'Dogwood', 'Ash');
  //await spreadsheet.vote(sheetId, 'Judge E', 'Partner Meeting', 'Ash', 'Fir', 'Elm');
})();

class App extends Component {
  constructor() {
    super();
    this.state = { title: "", judges: [], participants: [], voting: false};
  }

  async componentDidMount() {
    var url = new URL(window.location.href);
    
    var sheetId = '194iz66ka28ejiDV6_iHtGyV7V6gK8QSl9eFb8cMC1IM';
    const title = await spreadsheet.getTitle(sheetId);
    this.setState({'title': title});
    var judges = [];
    if (!url.searchParams.get('vote')) {
      judges = await spreadsheet.getJudges(sheetId);
    }
    this.setState({'judges': judges});
    var participants = [];
    if (url.searchParams.get('vote')) {
      participants = await spreadsheet.getParticipants(sheetId);
    }
    this.setState({ 'participants': participants});

    if (url.searchParams.get('vote')) {
      this.setState({ 'voting': true});
    }
  }



  render() {
    var sheetId = '194iz66ka28ejiDV6_iHtGyV7V6gK8QSl9eFb8cMC1IM';

    const listJudges = this.state.judges.map((judge) =>
      <li><a href="/?vote=true">{judge}</a></li>
    );
    var formPart1 = <div></div>;
    var formPart2 = <div></div>;
    var formPart3 = <div></div>;
    if (this.state.voting) {
      formPart1 = formPart;
      formPart2 = this.state.participants.map((participant) =>
        <li>{generateRadioButtons(participant)}</li>
      )
      formPart3 = <SubmitButton value={sheetId, 'Judge A'}/>;
    }

    const listParticipants = this.state.participants.map((participant) =>
      <li>{participant}</li>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.title}</h1>
          <ul>{listJudges}</ul>
          <ul>{listParticipants}</ul>
          <form id='form'>{formPart1}{formPart2}{formPart3}</form>
        </header>
      </div>
    );
  }
}

const formPart = 
  <React.Fragment>
        <p> Round: </p>
        <div>
          <input type="radio" id ="due diligence" name="round" value="due diligence" />
          <label for="due diligence">Due Diligence</label>
          <input type="radio" id ="written deliverables" name="round" value="written deliverables" />
          <label for="written deliverables">Written Deliverables</label>
          <input type="radio" id ="partner meeting" name="round" value="partner meeting" />
          <label for="partner meeting">Partner Meeting</label>
        </div>
        <p> Vote: </p>
        <p> Indicate your choices for First, Second, and Third places.</p>
  </React.Fragment>

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        parent: document.getElementById('form')
    };
  }

  handleClick = () => {
    //console.log(this.props.value[1]);
    //console.log(this.state.parent['1button'].value);
    submit(this.state.parent, this.props.value[1], this.props.value[0]);
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Submit
      </button>
    )
  }
}

function generateRadioButtons(participant) {
  return (
    <React.Fragment>
      {participant}
      <input type="radio" id ={participant + ' 1'} name={'1button'} value={participant} />
      <input type="radio" id ={participant + ' 2'} name={'2button'} value={participant} />
      <input type="radio" id ={participant + ' 3'} name={'3button'} value={participant} />
    </React.Fragment>
  )
}

function submit(form, judge, sheet) {
  if(form['1button'].value == form['2button'].value || form['2button'].value == form['3button'].value || form['1button'].value == form['3button'].value ){
    alert('Do not vote for a team multiple times');
  } else {
    console.log(sheet, judge, form['round'].value, form['1button'].value,form['2button'].value, form['3button'].value );
    //spreadsheet.vote(sheetId)
  }
}

export default App;
