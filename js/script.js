//Nos traemos todo lo que nos interesa del Html para poder trabjar con el 
const input = document.getElementById('searchInput');
const buscadorSearch = document.getElementById ('searchBtn')
const prevBtn = document.getElementById('prevBtn');
const nombres = document.getElementById('nombres')
const nextBtn = document.getElementById('nextBtn');
const visible = document.getElementById('app');
const selector = document.getElementById('selector');
const azar = document.getElementById('azarBtn');

let limite=30;
//creamos las variables para hacer la paginacion
let paginaIncial =`https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=0`
let nextpage;
let prevpage;


//creamos la funcion para hacer la paginacion y para traernos el array de los pokemons
const ObtenerPokemons =(pagina) =>{
    fetch (pagina)
    .then(response=>response.json())
    .then(data =>{
        nextpage = data.next;
        prevpage = data.previous
        let todos =data.results
    
    todos.forEach(todos => {
      
    pokemonNumero(todos.name)
    })
    })
}

//hacemos otra peticion fetch para traernos los datos que nos interesa de los pokemons y los ponemos en el HTML
const pokemonNumero=(nombrePokemon)=>{
    
    
//creamos un bucle con la cantidad de pokemon que nos devuelve la primera peticion
//con el nombre de los pokemons hacemos una peticion para que nos devuelva las descripciones   y la entrada    
fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
    .then(response =>response.json())
    .then(pokemon=>{
    
pokemonDescripcion = fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon}`)
        .then(response =>response.json())
        .then (pokemonDescripcion =>{
            
//let descripcionEspañol = descripcionPokemon(flavortextentries)
//para conseguir otros valores que nos interesan
//const habilidad=fetchDescripcion.abilities
//const detalles= detalle(habilidad)

        let name = pokemon.name.toUpperCase();
        let img = pokemon.sprites.other["official-artwork"].front_shiny;
        let id = pokemon.id
        let habilidad1 =pokemon.abilities[0].ability.name
        let type= pokemon.types[0].type.name
        let types = pokemon.types.map(type =>type.type.name)
            types =types.join('   ')
        let hpNumero = pokemon.stats[0].base_stat;
        let ataqueNumero =pokemon.stats[1].base_stat;
        let defenseNumero =pokemon.stats[2].base_stat
        let ataqueSpecialNumero =pokemon.stats[3].base_stat
        let defensaSpecialNumero =pokemon.stats[4].base_stat
        let spreedNumero =pokemon.stats[5].base_stat 
         // <p>${descripcionEspañol}</p>  
            let lista=document.createElement('li')
       
    let infopokemon=`
         <div class="contenedorPokemon div${type}">
             <div class="id">
                 <h4>${id}</h4>
             </div>
             <div class="pokemon-imagen">
                 <img src="${img}"/>
             </div>
            <div class="pokemon-info">
                 <h4>${name}</h4>
                 <h3 class="tipo ${types}">${types}</h3>
                 <div class="habilidades">
                     <h4>${habilidad1}</h4>
                 </div>
                 <div class="oculto">
                     <article>
                         <div class="descripcion">
                         
                         </div>
                         <div class="estadisticas">
                             <label for="${hpNumero}">HP</label>
                             <progress id="${hpNumero}" max="100" value="${hpNumero}">${hpNumero}</progress>
                             <label for="${ataqueNumero}">ATTACK</label>
                            <progress id="${ataqueNumero}" max="100" value="${ataqueNumero}">${ataqueNumero}</progress>
                            <label for="${defenseNumero}">DEFENSE</label>
                             <progress id="${defenseNumero}" max="100" value="${defenseNumero}">${defenseNumero}</progress>
                             <label for="${ataqueSpecialNumero}">SPECIAL ATTACK</label>
                             <progress id="${ataqueSpecialNumero}" max="100" value="${ataqueSpecialNumero}">${ataqueSpecialNumero}</progress>
                             <label for="${defensaSpecialNumero}">SPECIAL DEFENSE</label>
                             <progress id="${defensaSpecialNumero}" max="100" value="${defensaSpecialNumero}">${defensaSpecialNumero}</progress>
                             <label for="${spreedNumero}">SPREED</label>
                             <progress id="${spreedNumero}" max="100" value="${spreedNumero}">${spreedNumero}</progress>
                     </div>
                 </article>
             </div>
        </div>`
             lista.innerHTML = infopokemon   
            visible.appendChild(lista)
            
 })
    })
}
    // 
function descripcionPokemon(flavortextentries){
   
    const descripcionEspañol = flavortextentries.find(entry =>
        entry.language.name==='es');
        return descripcionEspañol ? descripcionEspañol.flavor_text :
        'No hay una descripción en español para este Pokémon'
    }

/*function detalle(habilidad){
    let arrayhabilidades =[]
    habilidad.forEach(ability=>{
        const urlHabilidad =ability.ability.url
        console.log(urlHabilidad)
        const response = fetch(`${urlHabilidad}`)
        const fetchHabilidad = response.json()
        console.log(fetchHabilidad)
 const abilityDetails ={
    nombre:fetchHabilidad.name.find(name=>name.language.name ==='es').name,
    descripcion:fetchHabilidad.effect_entries.find(entry=>entry.language.name ==='es').effect
 }
 arrayhabilidades.push(abilityDetails)
}) 
    } 
    */
                                     
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
    visible.innerHTML=''
let search = input.value.toLocaleLowerCase();
pokemonNumero(search)
})
//para seleccionar cuantos pokemons queremos ver en cada pagina
selector.addEventListener('click',()=>{
    limite = selector.value;
     paginaIncial= `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=0`
     console.log(paginaIncial)
     visible.innerHTML =''
     ObtenerPokemons(paginaIncial);
 })
//Creamos un boton para que nos de pokemons al azar
 azar.addEventListener('click',()=>{
     visible.innerHTML=''
     for (let i =0; i <limite;i++){
    let random = Math.floor((Math.random() * (1225- 1 + 1))+1);
    console.log(random)
    pokemonNumero(random)
     }
 })
/*creamos una lista con los distintos nombres de los pokemon, y hacemos un evento para que cuando le den click a los nombres se obtenga
la infomacion de los pokemons*/
    const nombresPoke = document.getElementById('nombres')
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0')
    .then(response =>response.json())
    .then(data=>{
            const nombresPokemon = data.results.map(pokemon => pokemon.name);
          nombresPokemon.forEach(nombre => {
            const listItem = document.createElement('li');
            listItem.textContent = nombre;

            // Agregar evento de clic
            listItem.addEventListener('click',() => {
                visible.innerHTML = ''
    
                pokemonNumero(nombre)
            });
            nombres.appendChild(listItem)
            })
        })
        .catch(error => console.error('Error al obtener los nombres de los pokemon'));
      
//llamamos a la funcion de obtenerPokemons para cargarla y que nos aparezaca pokemons al cargar
 ObtenerPokemons(paginaIncial);
