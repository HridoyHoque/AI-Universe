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
     <h5 class="card-title">Card title</h5>
     <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
     <hr>
     <h5>ChatGPT</h5>
     <i class="fa-regular fa-calendar-days"></i>
   
   `
   toolsContainer.appendChild(toolsDiv)

  });
}
loadAItools()