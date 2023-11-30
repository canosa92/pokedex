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
const pokemonInfo=(data)=>{
    let todos = data.results;
   //for(let i=0; i<=todos.length; i++){
    todos.forEach(element => {
     fetch(element.url)
     .then((response) => response.json())
     .then(data =>{
         console.log(data)
      
 
         let name = data.name.toUpperCase();
         let img = data.sprites.other["official-artwork"].front_default;
         let id = data.id
         let type = data.types[0].type.name;


 
        let infopokemon= `
         <div class="contenedorPokemon ${type}">
         <div class="pokemon-imagen">
         <img src="${img}"/>
         </div>
         <div class="pokemon-info">
         <h4>${id}.${name}</h4>
         </div>
         <div class="texto">
         <h4>${type}</h4>
         </div>
             </div>`
             visible.innerHTML += infopokemon
     })
    // }
    });
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

