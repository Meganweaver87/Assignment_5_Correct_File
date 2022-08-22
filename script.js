// const addDestinationInfo = require("./scriptHelper.js");
// const myFetch = require('./scriptHelper.js');
// const validateInput = require("./scriptHelper.js");
// const formSubmission = require("./scriptHelper.js");
// const pickPlanet = require("./scriptHelper.js");

window.addEventListener("load", function() {
    console.log("LOAD PLEASE");
    
    let form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        console.log("submit");
        let list = document.getElementById("faultyItems");
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName");
        let fuelStatus = document.querySelector("input[name=fuelLevel]");
        let cargoStatus = document.querySelector("input[name=cargoMass]");
        event.preventDefault();
        formSubmission(document, list, pilotName.value, copilotName.value, fuelStatus.value, cargoStatus.value);
        
    }); // close event listener

    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets + " lp");
    }).then(function () {
        console.log(listedPlanets + " lp2");
        let selectedPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.imageUrl);
    }); // close listedPlanetsResponse
     
});