/**
 * This function makes a singular form section
 * @param team the individual team to create a form segment for
 */
const renderFormSection = function(team) {
    let form = `<p>${team}</p>`;
    let form1 = `<input type="radio" id =${team + " 1"} name=${team} value=${team + " 1"} />`;
    let form2 = `<input type="radio" id =${team + " 2"} name=${team} value=${team + " 2"} />`;
    let form3 = `<input type="radio" id =${team + " 3"} name=${team} value=${team + " 3"} />`;
    return {
        form,
        form1,
        form2,
        form3
    };
}

/**
 * 
 * @param teams JSON file of the teams
 */
document.body.onload = function () {
    let teams = [{"name": "team 1"}, {"name": "team 2"}, {"name": "team 3"}];
    //var teamData = JSON.parse(teams);
    let formSections = [];
    for(let i=0; i<teams.length;i++){
        formSections[i] = renderFormSection(teams[i].name);
    }
    document.getElementById('vote').appendChild(formSections);
    
}




