window.addEventListener("load", function() {
    
    let form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
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
    }).then(function () {
        let selectedPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
    }); // close listedPlanetsResponse
     
});