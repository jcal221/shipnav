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
      }
    };
  })();
  
  pokemonRepository.getAll().forEach(function(pokemon) {
    let output = pokemon.name + " (height: " + pokemon.height + ")";
  
    if (pokemon.height > 1.0) {
      output += " - Wow, that's big!";
    }
  
    document.write(output + "<br>");
  });
  
  console.log(pokemonRepository.getAll()); // Logs the pokemonList array
  pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] });
  console.log(pokemonRepository.getAll()); // Logs the updated pokemonList array
  
  console.log(pokemonRepository.findByName("Bulbasaur")); // Find Bulbasaur
  