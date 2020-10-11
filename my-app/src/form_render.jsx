import ReactDOM from `react-dom`
function renderForm() {
    let teams = [{"name": "team 1"}, {"name": "team 2"}, {"name": "team 3"}];
    //var teamData = JSON.parse(teams);
    let formSections = [];
    for(let i=0; i<teams.length;i++){
        formSections[i] = renderFormSection(teams[i].name);
    }
    ReactDOM.render(
        formSections,
        document.getElementById('vote')
    );
    //document.getElementById("vote").innerHTML = formSections;

}

function renderFormSection(team) {
    let id1 = team + "yay";
    let id2 = team + "yay1";
    let id3 = team + "yay2";
    console.log(id1);
    let form = `<p>${team}</p>`;
    let form1 = `<input type="radio" id =${id1} name=${id1} value=${id1} />`;
    let form2 = `<input type="radio" id =${id2} name=${id1} value=${id2} />`;
    let form3 = `<input type="radio" id =${id3} name=${id1} value=${id3} />`;
    form += form1;
    form += form2;
    form += form3;
    console.log(form);
    return form;
}




