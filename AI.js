const loadAItools = () => {
   url = `https://openapi.programming-hero.com/api/ai/tools`
   fetch(url)
   .then(res => res.json())
   .then(data => showData(data.data.tools))
}

const showData = (data) => {
   const toolsContainer = document.getElementById('tools-container')
   // console.log(tools)
  data.forEach(singletool => {
   console.log(singletool)
   const toolsDiv = document.createElement('div')
   toolsDiv.classList.add('col')
   toolsDiv.innerHTML = `
   <div class="card h-100">
   <img class="img-fluid" src="${singletool.image}" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Features</h5>
     <div>
     <p class="card-text p-0 m-0">1. ${singletool.features[0]}</p>
     <p class="card-text p-0 m-0">2. ${singletool.features[1]}</p>
     <p class="card-text p-0 m-0">3. ${singletool.features[2]}</p>
     </div>
     <hr>
     <h5>${singletool.name}</h5>
     <i class="fa-regular fa-calendar-days"></i>
   
   `
   toolsContainer.appendChild(toolsDiv)

  });
}
loadAItools()