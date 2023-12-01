//Nos traemos todo lo que nos interesa del Html para poder trabjar con el 
const input = document.getElementById('searchInput');
const buscadorSearch = document.getElementById ('searchBtn')
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const visible = document.getElementById('app');
const selector = document.getElementById('selector');
const azar = document.getElementById('azarBtn')

//creamos las variables para hacer la paginacion
let paginaIncial =`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
let nextpage;
let prevpage;
let limite;

//creamos la funcion para hacer la paginacion y para traernos el array de los pokemons
const ObtenerPokemons = async(pagina) =>{
    try{
        const response = await fetch (pagina);
        if(!response.ok){
            throw new Error( 'ha surgido un error', response.status)
        }
        const data = await response.json();
        nextpage = data.next;
        prevpage = data.previous
        let todos = data.results.nombre;
        todos.forEach((element) =>{
        console.log(data)
    pokemonNumero(element)
        } )   
    }    
    catch (error){
        console.log('error', error)
    }
}

//hacemos otra peticion fetch para traernos los datos que nos interesa de los pokemons y los ponemos en el HTML
const pokemonNumero=async(nombrePokemon)=>{
    try{
//creamos un bucle con la cantidad de pokemon que nos devuelve la primera peticion
  
//con el nombre de los pokemons hacemos una peticion para que nos devuelva las descripciones       
        const responseDescripcion = await  fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon}`)
        const descripcion = await responseDescripcion.json()
        let descripcionIngles = descripcion.flavor_text_entries[1].flavor_text; 
      
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
        const pokemon = await response.json()

        let name = pokemon.name.toUpperCase();
        let img = pokemon.sprites.other["official-artwork"].front_default;
        let id = pokemon.id
        let habilidad1 =pokemon.abilities[0].ability.name
        let habilidad2 =pokemon.abilities[1].ability.name
        let type = pokemon.types[0].type.name;
        let hpNumero = pokemon.stats[0].base_stat;
        let ataqueNumero =pokemon.stats[1].base_stat;
        let defenseNumero =pokemon.stats[2].base_stat
        let ataqueSpecialNumero =pokemon.stats[3].base_stat
        let defensaSpecialNumero =pokemon.stats[4].base_stat
        let spreedNumero =pokemon.stats[5].base_stat

        console.log(pokemon)
        pintarPokemon(habilidad2,habilidad1,descripcionIngles,name,img,id,type,hpNumero,defenseNumero,ataqueNumero,ataqueSpecialNumero,defensaSpecialNumero,spreedNumero)
   
 } catch(error){
    console.log('error', error)
   }
   }

const pintarPokemon =(habilidad2,habilidad1,descripcionIngles,name,img,id,type,hpNumero,defenseNumero,ataqueNumero,ataqueSpecialNumero,defensaSpecialNumero,spreedNumero) =>{      
     
        let infopokemon= `
         <div class="contenedorPokemon ${type}">
         <div class="pokemon-imagen">
         <img src="${img}"/>
         </div>
         <div class="pokemon-info">
         <h4>${id}.${name}</h4>
         <h3 class="tipo">${type}</h3>
         <div class="habilidades">
         <h4>${habilidad1}</h4>
         <h4>${habilidad2}</h4>
         </div>
         <div class="oculto">
         <article>
         <div class="descripcion">
         <p>${descripcionIngles}</p>
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
             visible.innerHTML += infopokemon
     }
    // }

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
visible.innerHTML=''
pokemonNumero(search)
})
  //  

//para seleccionar cuantos pokemons queremos ver en cada pagina
selector.addEventListener('click',()=>{
    limite = selector.value;
     paginaIncial= `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=0`
     console.log(paginaIncial)
     visible.innerHTML =''
     ObtenerPokemons(paginaIncial);
 })

 azar.addEventListener('click',()=>{
     visible.innerHTML=''
     for (let i =0; i<=limite;i++){
    let random = Math.floor((Math.random() * (1225- 1 + 1))+1);
    pokemonNumero(random)
     }
 })

//llamamos a la funcion de obtenerPokemons para cargarla y que nos aparezaca pokemons al cargar
 ObtenerPokemons(paginaIncial);

