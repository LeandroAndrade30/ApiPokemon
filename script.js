// pega o id do formuçário 
//e aguarda ouvir o evento de submit para submeter o formulário
document.getElementById('form-pokemon').addEventListener('submit', function(event) {
    // impede o carregamento da página ao submeter o formulário
    event.preventDefault(); 
    // pega o id do input do formulário pelo valor
    // que foi informado no campo
    const pokemonInput = document.getElementById('nome-pokemon').value.toLowerCase(); 
    // método que pega o que foi fornecido no input
    fetchPokemon(pokemonInput); 
});

// função assincrona que se comunica com a APi 
// passando o parâmentro pokemon na url da api
async function fetchPokemon(pokemon) {
    // constante que recebe a url da api com os parâmetro desejado
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    // tratamento de exceção que espera a resposta da api
    // sendo ok retorna a informação solicitada a api
    // senão retorna a menssagem de erro.
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Pokémon não localizado');
        }

        // guarda a resposta da api numa constante data
        // que mostra as  informações do pokmon solicitado
        const data = await response.json();
        mostrarPokemon(data); 
        
    } catch (error) { // faz o tratamento do erro caso não localizado

        console.error('Erro:', error);
        mostrarError('Pokémon não localizado'); 
    }
}

// função que mostra as informaçôes do pokmon 
// e mostra essas informações diretamente no htm

function mostrarPokemon(pokemon) {
    // contante que armazena as informaççoes do pokmon pelo id
    const pokemonInfo = document.getElementById('info-pokemon');
    // carraga as informações no documento html
    // com o nome do pokmon e a sua imagem
    pokemonInfo.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2> 
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;
}

// Função que carrega a informação de erro no html
// caso o pokmon não seja localizado
function mostrarError(message) {
    const pokemonInfo = document.getElementById('info-pokemon');
    pokemonInfo.innerHTML = `<p>${message}</p>`;
}
