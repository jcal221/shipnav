let pokemonRepository = (function() {
  let pokemonList = [];

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
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function addButtonEventListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return Promise.all(
          data.results.map(function(pokemon) {
            return fetch(pokemon.url)
              .then(function(response) {
                return response.json();
              })
              .then(function(details) {
                return {
                  name: pokemon.name,
                  detailsUrl: pokemon.url,
                  imgUrl: details.sprites.front_default,
                  height: details.height
                };
              })
              .catch(function(error) {
                console.log('Error loading Pokémon details:', error);
              });
          })
        );
      })
      .then(function(pokemons) {
        pokemonList = pokemons;
      })
      .catch(function(error) {
        console.log('Error loading Pokémon list:', error);
      });
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        pokemon.imgUrl = details.sprites.front_default;
        pokemon.height = details.height;
        // Assign other details as needed
      })
      .catch(function(error) {
        console.log('Error loading Pokémon details:', error);
      });
  }

  // Function to create and display the modal
  function showModal(pokemon) {
    // Create modal container
    let modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    // Create modal content
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Create close button
    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';

    // Add event listener to close button
    closeButton.addEventListener('click', hideModal);

    // Create Pokemon name element
    let pokemonName = document.createElement('h2');
    pokemonName.innerText = pokemon.name;

    // Create Pokemon height element
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height: ' + pokemon.height;

    // Create Pokemon image element
    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imgUrl;
    pokemonImage.alt = pokemon.name;
    pokemonImage.classList.add('modal-image');

    // Append elements to modal content
    modalContent.appendChild(closeButton);
    modalContent.appendChild(pokemonName);
    modalContent.appendChild(pokemonHeight);
    modalContent.appendChild(pokemonImage);

    // Append modal content to modal container
    modalContainer.appendChild(modalContent);

    // Append modal container to body
    document.body.appendChild(modalContainer);

    // Add event listener to close modal when clicking outside of it
    modalContainer.addEventListener('click', function(event) {
      if (event.target === modalContainer) {
        hideModal();
      }
    });

    // Add event listener to close modal when pressing Escape key
    window.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        hideModal();
      }
    });
  }

  // Function to hide the modal
  function hideModal() {
    let modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
      modalContainer.remove();
    }
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
    },
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

console.log(pokemonRepository.findByName("Bulbasaur")); // Find Bulbasaur.
