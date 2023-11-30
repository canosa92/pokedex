const input = document.getElementById('searchInput');
const buscadorSearch = document.getElementById ('searchBtn')
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const visible = document.getElementById('app');
let paginaIncial= `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
let nextpage;
let prevpage;
//let url = "https://pokeapi.co/api/v2/pokemon/"
"https://pokeapi.co/api/v2/pokemon?offset=10&limit=10"
​
const ObtenerPokemons = async(pagina) =>{
    try{
        const response = await fetch (pagina);
       
        if(!response.ok){
            throw new Error( 'ha surgido un error', response.status)
        }
        const data = await response.json();
​
        nextpage = data.next;
        prevpage = data.previous
        console.log(data)
        
​
    pokemonInfo(data)
​
    }    
    catch (error){
        console.log('error', error)
    }
}
ObtenerPokemons(paginaIncial);
​
​
//hacemos un bucle para hacer una peditcion al fetch y obtener los datos de los pokemon que queremos mostrar
const pokemonInfo=(data)=>{
    let todos = data.results;
​
   //for(let i=0; i<=todos.length; i++){
    todos.forEach(element => {
​
     fetch(element.url)
     .then((response) => response.json())
     .then(data =>{
         console.log('d',data)
        
 
         let name = data.name;
         let img = data.sprites.front_shiny;
      console.log('n', name)
 
        let infopokemon= `
         <div class="contenedorPokemon">
         <h3> ${name}</h3>
         <img src="${img}" />
             </div>`
             visible.innerHTML += infopokemon
     })
    // }
    });
}
​
​
//boton next
nextBtn.addEventListener('click', () => {
    visible.innerHTML = '';
    ObtenerPokemons(nextpage)
})    
​
​
//boton previus
prevBtn.addEventListener('click', () => {
    visible.innerHTML = '';
    ObtenerPokemons(prevpage)
​
})    
​
​
//buscador
​
buscadorSearch.addEventListener('click',()=>{
let search = input.value.toLocaleLowerCase();
​
​
 fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
 .then(response => response.json())
    .then(data => {
        console.log('b',data)
        visible.innerHTML=''
     
        let name = data.name;
        let img = data.sprites.front_shiny;
     console.log('n', name)
​
       let infopokemon= `
        <div class="contenedorPokemon">
        <h3> ${name}</h3>
        <img src="${img}" />
            </div>`
            visible.innerHTML += infopokemon
        })
})
​
//reset
resetBtn.addEventListener('click', () => {
    location.reload();
   })
   
