try {
require('isomorphic-fetch');
} catch (e) {
    //do nothing
}

function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
    
    document.getElementById("missionTarget").innerHTML = `
    <h2>Mission Destination</h2>
    <ul>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of moons: ${moons}</li>
    </ul>
    <img src='${image}' alt="cool planet">
    `;
}; // close addDestinationInfo;

function validateInput(testInput) {
    
    if (testInput == "") {
       return "Empty";
    } else if (isNaN(parseInt(testInput))) { 
        return "Not a Number";
    } else if (!isNaN(parseInt(testInput))) { 
        return "Is a Number";
    } else {
        return "Invalid Input. Please try again.";
    } 
 }; // close validateInput

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");
 
    let pilotValidation = validateInput(pilot);
    let copilotValidation = validateInput(copilot);
    let fuelLevelValidation = validateInput(fuelLevel);
    let cargoMassValidation = validateInput(cargoMass);

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");

    if (pilotValidation == "Empty") {
        window.alert("Pilot name required! Please try again."); // good
    } else if (pilotValidation === "Is a Number" ) {
        window.alert("Pilot name cannot be a number! Please try again."); // good
    } else {
        pilotStatus.innerHTML = `${pilot} ready!`;
    }

    if (copilotValidation == "Empty") {
        window.alert("Copilot name required! Please try again."); // good
    } else if (copilotValidation === "Is a Number" ) {
        window.alert("Copilot name cannot be a number! Please try again."); // good
    } else {
        copilotStatus.innerHTML = `${copilot} ready!`;
    }

    if (fuelLevelValidation == "Empty") {
        window.alert("Fuel level required! Please try again."); // good
    } else if (fuelLevelValidation == "Not a Number") {
        window.alert("Fuel level must be a number! Please try again."); // good
    } else if (fuelLevelValidation === "Is a Number") {
        if (Number(fuelLevel) < 10000 ) {
            fuelStatus.innerHTML = "Fuel level low! Minimum fuel required: 10,001 liters.";
            launchStatus.innerHTML = "Shuttle not ready for launch. Please inspect fuel tank.";
            launchStatus.style.color = "#de919a";
            faultyItems.style.visibility = "visible";
        } // close if
    } else {
        fuelStatus.innerHTML = "Fuel level sufficient for launch!"
    }

    if (cargoMassValidation == "Empty") {
        window.alert("Cargo mass required! Please try again."); // good
    } else if (cargoMassValidation == "Not a Number") {
        window.alert("Cargo mass must be a number! Please try again."); // good
    } else if (cargoMassValidation === "Is a Number") {
        if (Number(cargoMass) > 10000 ) {
            cargoStatus.innerHTML = "Cargo mass high! Maximum cargo mass allowed: 9,999 kilograms.";
            launchStatus.innerHTML = "Shuttle not ready for launch. Please inspect cargo hold.";
            launchStatus.style.color = "#de919a";
            faultyItems.style.visibility = "visible";
        } // close if
    } else {
        cargoStatus.innerHTML = "Cargo mass sufficient for launch!"
    }

    if (parseInt(fuelLevel) > 10000 && parseInt(cargoMass) < 10000) {
        launchStatus.innerHTML = "Shuttle ready for launch!"
        //launchStatus.style.color = "#b3ccba";
        launchStatus.style.color = "#132976";
    }
}; //close formsubmission

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    }); // close planetsReturned

    return planetsReturned;
}; // close myFetch

function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random() * planets.length);
    let selectedPlanet = planets[planetIndex];
    return selectedPlanet;
}; // close pickPlanet

try {
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
} catch (e) {
    // do nothing
}
