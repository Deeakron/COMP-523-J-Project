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
    this.state = { title: "", judges: [], participants: []};
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
  }


  render() {


    const listJudges = this.state.judges.map((judge) =>
      <li><a href="/?vote=true">{judge}</a></li>
    );
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
        </header>
      </div>
    );
  }
}


export default App;
