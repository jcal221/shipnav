let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poison"]
    },
    {
      name: "Charizard",
      height: 1.7,
      types: ["fire", "flying"]
    },
    {
      name: "Squirtle",
      height: 1.0,
      types: ["water"]
    }
  ];

  // Function to check if two arrays are equal
  function arrayEquals(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
    // Do more with the Pokémon object in a later task
  }

  function addButtonEventListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  return {
    getAll: function() {
      return pokemonList;
    },
    add: function(pokemon) {
      const expectedKeys = ["name", "height", "types"];
      const pokemonKeys = Object.keys(pokemon);

      if (typeof pokemon === "object" && arrayEquals(pokemonKeys, expectedKeys)) {
        pokemonList.push(pokemon);
      } else {
        console.log("Invalid argument. Only objects with the expected keys can be added to the pokemonList.");
      }
    },
    findByName: function(name) {
      return pokemonList.filter(function(pokemon) {
        return pokemon.name.toLowerCase() === name.toLowerCase();
      });
    },
    addListItem: function(pokemon) {
      let ulElement = document.querySelector('.pokemon-list'); // Select the ul element with the class "pokemon-list"

      // Create a new li element
      let liElement = document.createElement('li');

      // Create a new button element
      let button = document.createElement('button');
      button.innerText = pokemon.name; // Set the button's text to the Pokémon's name
      button.classList.add('pokemon-button'); // Add a class to the button

      // Add event listener to the button
      addButtonEventListener(button, pokemon);

      // Append the button to the li element
      liElement.appendChild(button);

      // Append the li element to the ul element
      ulElement.appendChild(liElement);
    }
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

console.log(pokemonRepository.getAll()); // Logs the pokemonList array
pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] });
console.log(pokemonRepository.getAll()); // Logs the updated pokemonList array

console.log(pokemonRepository.findByName("Bulbasaur")); // Find Bulbasaur
