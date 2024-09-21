let currentPokemonId = 1; // Inicia com o primeiro Pokémon

// Pega o id do formulário e aguarda 
//ouvir o evento de submit para submeter o formulário
document.getElementById('form-pokemon').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const pokemonInput = document.getElementById('nome-pokemon').value.toLowerCase(); 
    fetchPokemon(pokemonInput); 
});

// Função para buscar o Pokémon pela API
async function fetchPokemon(pokemon) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Pokémon não localizado');
        }

        const data = await response.json();
        currentPokemonId = data.id; 
        await fetchPokemonSpecies(data.species.url); 
        
    } catch (error) {
        console.error('Erro:', error);
        mostrarError('Pokémon não localizado');
    }
}

// Busca pela espécie do Pokémon e a descrição
async function fetchPokemonSpecies(url) {
    try {
        const response = await fetch(url);
        const speciesData = await response.json();
        mostrarPokemon(speciesData);
    } catch (error) {
        console.error('Erro ao buscar espécie do Pokémon:', error);
        mostrarError('Erro ao carregar informações do Pokémon');
    }
}

// Mostra o Pokémon, a imagem e a descrição com fallback para inglês
function mostrarPokemon(species) {
    const pokemonInfo = document.getElementById('info-pokemon');

    // Buscando a descrição em português, ou fallback para inglês se não disponível
    const descriptionEntry = species.flavor_text_entries.find(entry => entry.language.name === 'pt') || 
                             species.flavor_text_entries.find(entry => entry.language.name === 'en'); // Fallback para inglês
                             
    const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n/g, ' ') : 'Descrição não disponível.';

    pokemonInfo.innerHTML = `
        <h2>${species.name.toUpperCase()}</h2> 
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemonId}.png" alt="${species.name}">
        <p>${description}</p>
    `;
    
    document.getElementById('prev').disabled = currentPokemonId <= 1;
    document.getElementById('next').disabled = currentPokemonId >= 898;
}

// Exibe uma mensagem de erro
function mostrarError(message) {
    const pokemonInfo = document.getElementById('info-pokemon');
    pokemonInfo.innerHTML = `<p>${message}</p>`;
}

// Botão para avançar ao próximo Pokémon
document.getElementById('next').addEventListener('click', function() {
    currentPokemonId++;
    fetchPokemonById(currentPokemonId);
});

// Botão para voltar ao Pokémon anterior
document.getElementById('prev').addEventListener('click', function() {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemonById(currentPokemonId);
    }
});

// Função para buscar Pokémon pelo ID
async function fetchPokemonById(id) {
    await fetchPokemon(id);
}







