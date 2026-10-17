"use strict";

/*
 * Animal Adoption Board
 *
 * Complete the five TODO sections below, in order.
 *
 * The TODOs depend on each other, so some of them can't be fully tested
 * until a later TODO is complete. Each TODO has a note that tells you
 * what to expect when you test it.
 *
 * EXTRA CREDIT: If you build any extra credit features, list them here
 * (see README.md). Features that are not listed here will not be graded.
 *
 *   -
 *   -
 */

// ------------------------------------
// Animal Data
// ------------------------------------

const animals = [
	{ id: 1, name: "Luna", species: "cat", age: 3, adopted: false },
	{ id: 2, name: "Biscuit", species: "dog", age: 7, adopted: true },
	{ id: 3, name: "Pepper", species: "cat", age: 1, adopted: true },
	{ id: 4, name: "Moose", species: "dog", age: 5, adopted: false },
	{ id: 5, name: "Charly", species: "dog", age: 4, adopted: false },
	{ id: 6, name: "Bill", species: "cat", age: 0.5, adopted: true },
	{ id: 7, name: "Chompers", species: "rabbit", age: 0.5, adopted: false },
	{ id: 8, name: "Beowulf", species: "dog", age: 7, adopted: true },
];

// What the user currently wants to see. The page controls change these.
let activeFilter = "all";
let activeSort = "default";

// ------------------------------------
// Display Animals
// ------------------------------------

function displayAnimals(animalArray) {
	const animalList = document.querySelector("#animal-list");
	animalList.innerHTML = "";

	if (animalArray.length === 0) {
		const emptyMessage = document.createElement("p");
		emptyMessage.textContent = "There are no animals to show.";
		emptyMessage.classList.add("empty-message");
		animalList.appendChild(emptyMessage);
		return;
	}


    // This makes a card for every animal.
    animalArray.forEach(function(animal) {
        const card = document.createElement("div");
        card.classList.add("animal-card");

        if (animal.adopted) {
            card.classList.add("adopted");
        }

        const name = document.createElement("h3");
        name.textContent = animal.name;

        const details = document.createElement("p");
        details.textContent = animal.species + ", Age: " + animal.age;

        const status = document.createElement("p");
        status.textContent = animal.adopted ? "Adopted" : "Available";

        const button = document.createElement("button");
        button.textContent = animal.adopted ? "Return" : "Adopt";

        // This runs when someone clicks the button.
        // The animal's id tells it which animal to change.
        button.addEventListener("click", function() {
            toggleAdoption(animal.id);
        });

        card.append(name, details, status, button);
        animalList.appendChild(card);
    });

}

// ------------------------------------
// Adopt or Return an Animal
// ------------------------------------

function toggleAdoption(animalId) {

    // Find the animal that matches the id.
    const animal = animals.find(function(item) {
        return item.id === animalId;
    });

    // Stop if the animal doesn't exist.
    if (!animal) {
        return;
    }

    // Change the animal's adoption status.
    animal.adopted = !animal.adopted;

    // Refresh the animal cards.
    updateDisplay();

}

// ------------------------------------
// Filter, Sort, and Update
// ------------------------------------

function updateDisplay() {
	
    // Make a copy so sorting doesn't change the original animal order.
    let visibleAnimals = animals.slice();

    // Show only animals that are available.
    if (activeFilter === "available") {
        visibleAnimals = visibleAnimals.filter(function(animal) {
            return animal.adopted === false;
        });
    }

    // Show only animals that are adopted.
    if (activeFilter === "adopted") {
        visibleAnimals = visibleAnimals.filter(function(animal) {
            return animal.adopted === true;
        });
    }

    // Sort animals alphabetically by name.
    if (activeSort === "name") {
        visibleAnimals.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    // Sort animals by age, youngest first.
    if (activeSort === "age") {
        visibleAnimals.sort(function(a, b) {
            return a.age - b.age;
        });
    }

    // Show the updated animals and count.
    displayAnimals(visibleAnimals);
    updateCount();

}

// ------------------------------------
// Available Count
// ------------------------------------

function updateCount() {

    // Find where the animal count goes on the page.
    const countElement = document.querySelector("#animal-count");

    // Count the animals that are not adopted.
    const availableAnimals = animals.filter(function(animal) {
        return animal.adopted === false;
    });

    // Show how many animals are still available.
    countElement.textContent = availableAnimals.length +
        " of " + animals.length +
        " animals are available for adoption.";

}

// ------------------------------------
// Page Controls
// ------------------------------------

const allButton = document.querySelector("#show-all");
const availableButton = document.querySelector("#show-available");
const adoptedButton = document.querySelector("#show-adopted");
const sortSelect = document.querySelector("#sort-animals");


    // Show all the animals when All is clicked.
    allButton.addEventListener("click", function() {
        activeFilter = "all";
        updateDisplay();
    });

    // Show only animals that are available.
    availableButton.addEventListener("click", function() {
        activeFilter = "available";
        updateDisplay();
    });

    // Show only animals that have been adopted.
    adoptedButton.addEventListener("click", function() {
        activeFilter = "adopted";
        updateDisplay();
    });

    // Change the order when someone picks a sort option.
    sortSelect.addEventListener("change", function() {
        activeSort = sortSelect.value;
        updateDisplay();
    });


// Display the original list and the count when the page first opens.
displayAnimals(animals);
updateCount();
