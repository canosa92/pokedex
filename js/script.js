const input = document.getElementById('searchInput');
const buscadorSearch = document.getElementById ('searchBtn')
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const visible = document.getElementById('app');
const selector = document.getElementById('selector');
let paginaIncial =`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`

let nextpage;
let prevpage;
//creamos la funcion que nos llame al fetch de pokemon
const ObtenerPokemons = async(pagina) =>{
    try{
        const response = await fetch (pagina);
       
        if(!response.ok){
            throw new Error( 'ha surgido un error', response.status)
        }
        const data = await response.json();
        nextpage = data.next;
        prevpage = data.previous
        console.log(data)
    pokemonInfo(data)
    }    
    catch (error){
        console.log('error', error)
    }
}
//


//hacemos un bucle para hacer una peditcion al fetch y obtener los datos de los pokemon que queremos mostrar
const pokemonInfo=async(data)=>{
    try{
    let todos = data.results;
   

   for(let i = 0 ; i < todos.length ;i++){

    let nombrePokemon=todos[i].name

    
      const responseDescripcion = await  fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon}`)
      const descripcion = await responseDescripcion.json()

        let descripcionEspañol = descripcion.flavor_text_entries[26].flavor_text;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
        const pokemon = await response.json()
        console.log(pokemon)

         let name = pokemon.name.toUpperCase();
         let img = pokemon.sprites.other["official-artwork"].front_default;
         let id = pokemon.id
         let type = pokemon.types[0].type.name;
         let hp = pokemon.stats[0].stat.name.toUpperCase();
        let hpNumero = pokemon.stats[0].base_stat;
        let attack =pokemon.stats[1].stat.name.toUpperCase();
        let attackNumero =pokemon.stats[1].base_stat;
        let defense=pokemon.stats[2].stat.name.toUpperCase()
        let defenseNumero =pokemon.stats[2].base_stat
        let ataqueSpecial=pokemon.stats[3].stat.name.toUpperCase()
        let ataqueSpecialNumero =pokemon.stats[3].base_stat
        let defensaSpecial=pokemon.stats[4].stat.name.toUpperCase()
        let defensaSpecialNumero =pokemon.stats[4].base_stat
        let spreed=pokemon.stats[5].stat.name.toUpperCase()
        let spreedNumero =pokemon.stats[5].base_stat

 
        let infopokemon= `
         <div class="contenedorPokemon ${type}">
         <div class="pokemon-imagen">
         <img src="${img}"/>
         </div>
         <div class="pokemon-info">
         <h4>${id}.${name}</h4>
         <h3 class="tipo">${type}</h3>
         <p> ${descripcionEspañol}</p>
         </div>
         <div class="estadisticas">
         <label for="${hpNumero}">${hp}</label>
         <br>
         <progress id="${hpNumero}" max="100" value="${hpNumero}">${hpNumero}</progress>
          <br>
         <label for="${attackNumero}">${attack}</label>
         <br>
         <progress id="${attackNumero}" max="100" value="${attackNumero}">${attackNumero}</progress>
         <br>
         <label for="${defenseNumero}">${defense}</label>
         <br>
         <progress id="${defenseNumero}" max="100" value="${defenseNumero}">${defenseNumero}</progress>
         <br>
         <label for="${ataqueSpecialNumero}">${ataqueSpecial}</label>
         <br>
         <progress id="${ataqueSpecialNumero}" max="100" value="${ataqueSpecialNumero}">${ataqueSpecialNumero}</progress>
         <br>
         <label for="${defensaSpecialNumero}">${defensaSpecial}</label>
         <br>
         <progress id="${defensaSpecialNumero}" max="100" value="${defensaSpecialNumero}">${defensaSpecialNumero}</progress>
         <br>
         <label for="${spreedNumero}">${spreed}</label>
         <br>
         <progress id="${spreedNumero}" max="100" value="${spreedNumero}">${spreedNumero}</progress>
         <br>
             </div>
             </div>`
             visible.innerHTML += infopokemon
     }
    // }
    } catch (error) {
        console.error("error")
        }  
    }


//boton next
nextBtn.addEventListener('click', () => {
    visible.innerHTML = '';
    ObtenerPokemons(nextpage)
})    

//boton previus
prevBtn.addEventListener('click', () => {
    visible.innerHTML = '';
    ObtenerPokemons(prevpage)

})    

//Creamos un buscador para traer la informacion de un pokemon que querramos obtener

buscadorSearch.addEventListener('click',()=>{
let search = input.value.toLocaleLowerCase();
 fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
 .then(response => response.json())
    .then(data => {
        console.log('b',data)
        visible.innerHTML=''
     
        let name = data.name;
        let img = data.sprites.front_shiny;
     
       let infopokemon= `
        <div class="contenedorPokemon">
        <img src="${img}" />
        <h3> ${name}</h3>
        
            </div>`
            visible.innerHTML += infopokemon
        })
})

//reset
resetBtn.addEventListener('click', () => {
    visible.innerHTML =''
    location.reload();
   })

//para seleccionar cuantos pokemons queremos ver en cada pagina
selector.addEventListener('click',()=>{
    let limite = selector.value;
     paginaIncial= `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=0`
     console.log(paginaIncial)
     visible.innerHTML =''
     ObtenerPokemons(paginaIncial);
 })

//llamamos a la funcion de obtenerPokemons para cargarla y que nos aparezaca pokemons al cargar
 ObtenerPokemons(paginaIncial);

