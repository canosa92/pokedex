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
    const arrayhabilidades = await detalle(pokemon.abilities)
    const habilidades= arrayhabilidades.map(habilidad =>`<div class="hab"><h4>${habilidad.nombre}</h4><p>${habilidad.descripcion}</p></div>`).join('')
    console.log(arrayhabilidades)

    const descripcionEspañol = descripcionPokemon(descripcion.flavor_text_entries);
    // Obtener detalles del Pokemon y la descripción
    const name = pokemon.name.toUpperCase();
    const img = pokemon.sprites.other['official-artwork'].front_shiny;
    const id = pokemon.id;
   
    const type = pokemon.types[0].type.name;
    const types = pokemon.types.map((type) =>`<h4 class="tipo_texto ${type.type.name}">${type.type.name}<h4>`).join('   ');
    const estadisticas =pokemon.stats.map((stats)=>`<label for="${stats.stat.name}">${stats.stat.name}</label>
    <progress id="${stats.stat.name}" max="100" value="${stats.base_stat}">${stats.base_stat}</progress>`).join(' ');
    const peso = `${pokemon.weight / 10} kg`;
    const height = `${pokemon.height / 10} mts`;



    // Crear un elemento contenedor y establecer su contenido HTML
    const contenedorPokemon = document.createElement('div');
    contenedorPokemon.classList.add('contenedorPokemon', `div${type}`);
    contenedorPokemon.innerHTML = `
    <div class="infoBasica">
        <div class="id">
        <h3>${id}</h3>
        </div>
        <div class="nombre">
        <h3>${name}</h3>
        </div>
    </div>
    <div class="pokemon-imagen">
        <img src="${img}"/>
    </div>
   <div class="pokemon-info">
        <div class="tipos_Altura">
        ${types}
        </div>
        <div class="peso_altura">
        <h4 class="medida">  ${peso}</h4>
        <h4 class="medida"> ${height}</h4>
        </div>
        <div class="descripcion">
                <p>${descripcionEspañol}</p>
                </div>
        <div class="oculto">
            <article>
                <div class="habilidades">
                <h4>Habilidades</h4>
                 ${habilidades}
                 </div>
                <div class="estadisticas">
                    ${estadisticas}
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

async function detalle(habilidad) {
  let arrayhabilidades = await
  Promise.all(
    habilidad.map(async (ability) =>{

    const urlHabilidad = ability.ability.url;

    const response = await fetch(`${urlHabilidad}`)
    const fetchHabilidad = await response.json()
  
        return {
          nombre: fetchHabilidad.names.find((name) => name.language.name === 'es')
            .name,
          descripcion: fetchHabilidad.flavor_text_entries.find(
            (entry) => entry.language.name === 'es'
          ).flavor_text,
        };
       })
      );
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
  visible.innerHTML = '';
  ObtenerPokemons(paginaIncial);
});
//Creamos un boton para que nos de pokemons al azar
azar.addEventListener('click', () => {
  visible.innerHTML = '';
  for (let i = 0; i < limite; i++) {
    let random = Math.floor(Math.random() * (1225 - 1 + 1) + 1);
    pokemonNumero(random);
  }
});
/*creamos una lista con los distintos nombres de los pokemon, y hacemos un evento para que cuando le den click a los nombres se obtenga
la infomacion de los pokemons*/
const nombresPoke = document.getElementById('nombres');
let listaNombres = [];
fetch('https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0')
  .then((response) => response.json())
  .then((data) => {
    const nombresPokemon = data.results.map((pokemon) => pokemon.name);
    nombresPokemon.forEach((nombre) => {
      listaNombres.push(nombre)
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
    console.error('Error al obtener los nombres de los pokemon', error)
  );
console.log(listaNombres)
//llamamos a la funcion de obtenerPokemons para cargarla y que nos aparezaca pokemons al cargar
ObtenerPokemons(paginaIncial);
