//Nos traemos todo lo que nos interesa del Html para poder trabjar con el
const input = document.getElementById('searchInput');
const buscadorSearch = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nombres = document.getElementById('nombres');
const nextBtn = document.getElementById('nextBtn');
const visible = document.getElementById('app');
const selector = document.getElementById('selector');
const azar = document.getElementById('azarBtn');

let limite = 30;
//creamos las variables para hacer la paginacion
let paginaIncial = `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=0`;
let nextpage;
let prevpage;

//creamos la funcion para hacer la paginacion y para traernos el array de los pokemons

const ObtenerPokemons = async (pagina) => {
  try {
    const response = await fetch(pagina);
    const data = await response.json();
    nextpage = data.next;
    prevpage = data.previous;
    let todos = data.results;

    for (const pokemon of todos) {
     await pokemonNumero(pokemon.name);
    }
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
  }
};

const pokemonNumero = async (nombrePokemon) => {
  try {
    const [pokemon, descripcion] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`).then(
        (response) => response.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon}`).then(
        (response) => response.json()
      ),
    ]);
    const arrayhabilidades=detalle(pokemon.abilities)

const descripcionEspañol=descripcionPokemon(descripcion.flavor_text_entries);
    // Obtener detalles del Pokemon y la descripción
    const name = pokemon.name.toUpperCase();
    const img = pokemon.sprites.other['official-artwork'].front_shiny;
    const id = pokemon.id;
    //const habilidad1 = arrayhabilidades[1].name;
 //<h4>${habilidad1}</h4>
    const type = pokemon.types[0].type.name;
    const types = pokemon.types.map((type) => type.type.name).join('   ');
    const hpNumero = pokemon.stats[0].base_stat;
    const ataqueNumero = pokemon.stats[1].base_stat;
    const defenseNumero = pokemon.stats[2].base_stat;
    const ataqueSpecialNumero = pokemon.stats[3].base_stat;
    const defensaSpecialNumero = pokemon.stats[4].base_stat;
    const spreedNumero = pokemon.stats[5].base_stat;
    const peso = `${pokemon.weight / 10} kg`;
    const height= `${pokemon.height / 10} mts`;

   

    // Crear un elemento contenedor y establecer su contenido HTML
    const contenedorPokemon = document.createElement('div');
    contenedorPokemon.classList.add('contenedorPokemon', `div${type}`);
    contenedorPokemon.innerHTML = `
        <div class="id">
        <h4>${id}</h4>
    </div>
    <div class="pokemon-imagen">
        <img src="${img}"/>
    </div>
   <div class="pokemon-info">
        <h4>${name}</h4>
        <h3 class="tipo ${types}">${types}</h3>
        <h4> peso: ${peso} <br>altura: ${height}
        <div class="habilidades">
           
        </div>
        <div class="oculto">
            <article>
                <div class="descripcion">
                <p>${descripcionEspañol}</p>
                </div>
                <div class="estadisticas">
                    <label for="${hpNumero}">HP</label>
                    <progress id="${hpNumero}" max="100" value="${hpNumero}">${hpNumero}</progress>
                    <label for="${ataqueNumero}">ATAQUE</label>
                   <progress id="${ataqueNumero}" max="100" value="${ataqueNumero}">${ataqueNumero}</progress>
                   <label for="${defenseNumero}">DEFENSA</label>
                    <progress id="${defenseNumero}" max="100" value="${defenseNumero}">${defenseNumero}</progress>
                    <label for="${ataqueSpecialNumero}">ATAQUE ESPECIAL</label>
                    <progress id="${ataqueSpecialNumero}" max="100" value="${ataqueSpecialNumero}">${ataqueSpecialNumero}</progress>
                    <label for="${defensaSpecialNumero}">DEFENSA ESPECIAL</label>
                    <progress id="${defensaSpecialNumero}" max="100" value="${defensaSpecialNumero}">${defensaSpecialNumero}</progress>
                    <label for="${spreedNumero}">VELOCIDAD</label>
                    <progress id="${spreedNumero}" max="100" value="${spreedNumero}">${spreedNumero}</progress>
            </div>
        </article>
    </div>
        `;

    // Agregar el nuevo Pokémon al contenedor 'visible'
    visible.appendChild(contenedorPokemon);
  } catch (error) {
    console.error('Error al obtener detalles del Pokémon:', error);
  }
};

function descripcionPokemon(flavortextentries) {
  const descripcionEspañol = flavortextentries.find(
    (entry) => entry.language.name === 'es'
  );
  return descripcionEspañol
    ? descripcionEspañol.flavor_text
    : 'No hay una descripción en español para este Pokémon';
}

function detalle(habilidad) {
  let arrayhabilidades = [];

  habilidad.forEach((ability) => {
    const urlHabilidad = ability.ability.url;

    fetch(`${urlHabilidad}`)
    .then((response) => response.json())
    .then((fetchHabilidad) => {
    
    const abilityDetails = {
      nombre: fetchHabilidad.names.find((name) => name.language.name === 'es')
        .name,
      descripcion: fetchHabilidad.flavor_text_entries.find(
        (entry) => entry.language.name === 'es'
      ).flavor_text,
    };
    arrayhabilidades.push(abilityDetails);
  });
})
return arrayhabilidades
}

nextBtn.addEventListener('click', () => {
  visible.innerHTML = '';
  ObtenerPokemons(nextpage);
});
//boton previus
prevBtn.addEventListener('click', () => {
  visible.innerHTML = '';
  ObtenerPokemons(prevpage);
});
//Creamos un buscador para traer la informacion de un pokemon que querramos obtener
buscadorSearch.addEventListener('click', () => {
  visible.innerHTML = '';
  let search = input.value.toLocaleLowerCase();
  pokemonNumero(search);
});
//para seleccionar cuantos pokemons queremos ver en cada pagina
selector.addEventListener('click', () => {
  limite = selector.value;
  paginaIncial = `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=0`;
  console.log(paginaIncial);
  visible.innerHTML = '';
  ObtenerPokemons(paginaIncial);
});
//Creamos un boton para que nos de pokemons al azar
azar.addEventListener('click', () => {
  visible.innerHTML = '';
  for (let i = 0; i < limite; i++) {
    let random = Math.floor(Math.random() * (1225 - 1 + 1) + 1);
    console.log(random);
    pokemonNumero(random);
  }
});
/*creamos una lista con los distintos nombres de los pokemon, y hacemos un evento para que cuando le den click a los nombres se obtenga
la infomacion de los pokemons*/
const nombresPoke = document.getElementById('nombres');
fetch('https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0')
  .then((response) => response.json())
  .then((data) => {
    const nombresPokemon = data.results.map((pokemon) => pokemon.name);
    nombresPokemon.forEach((nombre) => {
      const listItem = document.createElement('li');
      listItem.textContent = nombre;

      // Agregar evento de clic
      listItem.addEventListener('click', () => {
        visible.innerHTML = '';

        pokemonNumero(nombre);
      });
      nombres.appendChild(listItem);
    });
  })
  .catch((error) =>
    console.error('Error al obtener los nombres de los pokemon')
  );

//llamamos a la funcion de obtenerPokemons para cargarla y que nos aparezaca pokemons al cargar
ObtenerPokemons(paginaIncial);
