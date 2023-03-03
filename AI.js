const loadAItools = (datalimit) => {
   url = `https://openapi.programming-hero.com/api/ai/tools`
   fetch(url)
   .then(res => res.json())
   .then(data => showData(data.data.tools , datalimit))
}

const showData = (tools , datalimit) => {
   togglespinner(true)
   const toolsContainer = document.getElementById('tools-container')
   // console.log(tools)
   toolsContainer.innerHTML = ''
   /* Show 6 tools */
   const seeMoreBtn = document.getElementById("btn-SeeMore")
   if(datalimit && tools.length > 6){
      tools = tools.slice(0,6)
      seeMoreBtn.classList.remove('d-none')
   }
   else{
      seeMoreBtn.classList.add('d-none')
   }
  tools.forEach(singletool => {
   console.log(singletool)
   const toolsDiv = document.createElement('div')
   toolsDiv.classList.add('col')
   toolsDiv.innerHTML = `
   <div class="card h-100">
   <img class="p-2 h-100" src="${singletool.image}" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Features</h5>
     <div>
     <p class="card-text p-0 m-0">1. ${singletool.features[0]}</p>
     <p class="card-text p-0 m-0">2. ${singletool.features[1]}</p>
     <p class="card-text p-0 m-0">3. ${singletool.features[2]}</p>
     </div>
     <hr>
     <h5>${singletool.name}</h5>
     <div class="d-flex">
     <i class="fa-regular fa-calendar-days mt-1"></i>
     <p class="mx-2">${singletool.published_in}</p>
     <i class="fa-solid fa-circle-arrow-right ms-auto"></i>
     </div>
   `
   toolsContainer.appendChild(toolsDiv)
   /* Stop Loader Spinner */
   togglespinner(false)
  
  });
}

/* See more  */
document.getElementById('btn-SeeMore').addEventListener('click' , function(){
   loadAItools()
})

/* Start Loader Spinner */

const togglespinner = (isloading) => {
const spinner = document.getElementById("spinner")
   if(isloading){
      spinner.classList.remove("d-none")
   }
   else{
      spinner.classList.add("d-none")
   }
}
// loadAItools()