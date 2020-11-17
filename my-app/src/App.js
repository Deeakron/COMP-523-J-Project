import React, { Component } from "react";
import "./App.css";

import * as spreadsheet from "./spreadsheet";

var sheetId;

var section = <div></div>;
class App extends Component {
  constructor() {
    super();
    this.state = { sheetId: "", thisJudge: "", title: "", judges: [], participants: [], page: 'judges'};
  }

  // Loading the Page
  async componentDidMount() {
    var url = new URL(window.location.href);
    
    if (url.searchParams.get('sheetId')) {
      sheetId = url.searchParams.get('sheetId');
      if (url.searchParams.get('judge')) {
        this.setState({'thisJudge': url.searchParams.get('judge')});
      }
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
        this.setState({ 'page': 'voting'});
      }

    } else {
      this.setState({ 'page': 'thanks'});
    }
    
  }

  // Rendering the Page
  render() {
    const listURL = this.state.judges.map((judge) =>
      [`/?sheetId=${sheetId}&judge=${judge}&vote=true`,judge]
    );

    const listJudges = listURL.map((url) =>
      <li><a href={url[0]}>{url[1]}</a></li>
    );
    // Various Parts of the form, conditional on what the current page is
    var formPart1 = <div></div>;
    var formPart2 = <div></div>;
    var formPart3 = <div></div>;
    if (this.state.page === 'voting') {
      section = <form id='form'></form>;
      formPart1 = formPart;
      formPart2 = generateTable(this.state.participants);
      formPart3 = <SubmitButton value={this.state.thisJudge}/>;
      section = <div>{formPart1}{formPart2}{formPart3}</div>;
    } else if (this.state.page === 'judges') {
      section = <ul>{listJudges}</ul>;
    } else if (this.state.page === 'thanks') {
      section = endPage;
    }

    return (
      <div className="App" color="#f5f5f5">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>
          <div><form id='form'>{section}</form></div>
        </header>
      </div>
    );
  }
}

// Outside constant for creating the round selection part of the form
const formPart = 
  <React.Fragment>
        <p> Round: </p>
        <table> <tr>
          <td class="td3"><input type="radio" id ="Due Diligence" name="round" value="Due Diligence" />
          <label for="Due Diligence">Due Diligence</label></td>
          <td class="td3"><input type="radio" id ="Written Deliverables" name="round" value="Written Deliverables" />
          <label for="Written Deliverables">Written Deliverables</label></td>
          <td class="td3"><input type="radio" id ="Partner Meeting" name="round" value="Partner Meeting" />
          <label for="Partner Meeting">Partner Meeting</label></td>
        </tr></table>
        <p> Vote: </p>
        <p> Indicate your choices for First, Second, and Third places.</p>
  </React.Fragment>

// Outside constant for the end page
const endPage = 
  <React.Fragment>
    <div>
        <p>Thanks for voting!</p>
        <p><a href="https://www.vcic.org/">Back to events top</a></p>
    </div>
  </React.Fragment>

// Outside class for the submit button
class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        parent: document.getElementById('form')
    };
  }

  handleClick = async () => {
    submit(this.state.parent, this.props.value, sheetId);
  }

  render() {
    return (
        <button type="button" onClick={this.handleClick}>
          Submit
        </button>
    )
  }
}

// Generating the rows of radio buttons
function generateRadioButtons(participant) {
  return (
    <React.Fragment>
      <tr>
      <td>{participant}</td>
      <td class="td2"></td>
      <td><input type="radio" id ={participant + ' 1'} name={'1button'} value={participant} /></td>
      <td class="td2"></td>
      <td><input type="radio" id ={participant + ' 2'} name={'2button'} value={participant} /></td>
      <td class="td2"></td>
      <td><input type="radio" id ={participant + ' 3'} name={'3button'} value={participant} /></td>
      </tr>
    </React.Fragment>
  )
}

// Actually submitting the results to the google form; if any team is selected twice or more it does not submit
async function submit(form, judge, sheet) {
  if(form['1button'].value === form['2button'].value || form['2button'].value === form['3button'].value || form['1button'].value === form['3button'].value ){
    alert('Do not vote for a team multiple times');
  } else {
    console.log(sheet, judge, form['round'].value, form['1button'].value,form['2button'].value, form['3button'].value );
    if (await spreadsheet.vote(sheetId,judge,form['round'].value,form['1button'].value,form['2button'].value, form['3button'].value)) {
      window.location.assign(window.location.pathname);
    }
  }
}

// Outside function for generating tables
function generateTable(participants) {
  return (
  <table>
    <tr>
      <th>Team</th><th class="th2"></th><th>First</th><th class="th2"></th><th>Second</th><th class="th2"></th><th>Third</th>
    </tr>
    {participants.map(element => generateRadioButtons(element))}
  </table>);
}

export default App;

