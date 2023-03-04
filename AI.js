const loadAItools = (datalimit) => {
   url = `https://openapi.programming-hero.com/api/ai/tools`
   fetch(url)
      .then(res => res.json())
      .then(data => showData(data.data.tools, datalimit))
}

const showData = (tools, datalimit) => {
   togglespinner(true)
   const toolsContainer = document.getElementById('tools-container')
   // console.log(tools)
   toolsContainer.innerHTML = ''
   /* Show 6 tools */
   const seeMoreBtn = document.getElementById("btn-SeeMore")
   if (datalimit && tools.length > 6) {
      tools = tools.slice(0, 6)
      seeMoreBtn.classList.remove('d-none')
   }
   else {
      seeMoreBtn.classList.add('d-none')
   }
   tools.forEach(singletool => {
      // console.log(singletool) ...
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
     <p class="card-text p-0 m-0">3. ${singletool.features[2] ? singletool.features[2] : "No data Found"} </p>
     </div>
     <hr>
     <h5>${singletool.name}</h5>
     <div class="d-flex">
     <i class="fa-regular fa-calendar-days mt-1"></i>
     <p class="mx-2">${singletool.published_in}</p>
     <i onclick="loadToolsDetails('${singletool.id}')" class="fa-solid fa-circle-arrow-right ms-auto" data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#card-Modal"></i>
     </div>
   `
      toolsContainer.appendChild(toolsDiv)
      /* Stop Loader Spinner */
      togglespinner(false)

   });
}

/* See more  */
document.getElementById('btn-SeeMore').addEventListener('click', function () {
   loadAItools()
})

/* Start Loader Spinner */

const togglespinner = (isloading) => {
   const spinner = document.getElementById("spinner")
   if (isloading) {
      spinner.classList.remove("d-none")
   }
   else {
      spinner.classList.add("d-none")
   }
}

const loadToolsDetails = async id => {
   const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
   const res = await fetch(url)
   const data = await res.json();
   showToolsDetails(data.data)
}

const showToolsDetails = data => {
   console.log(data)
   const modalContainer = document.getElementById("modal")
   modalContainer.innerHTML = ''
   const modalDiv = document.createElement('div')
   modalDiv.classList.add("modal-content")
   modalDiv.innerHTML = `
  
      <div class="modal-header ">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
        <div class="modal-body ">
        <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col bg-secondary rounded-3">
        <div class="">
            <div class="card-body">
                <h5 class="card-title">${data.description ? data.description : 'Did not found any discription'}</h5>
                <p class="card-text"></p>
                <div class="row d-flex justify-content-between mb-3 gap-3 ">
                    <div class="col bg-light rounded-3 d-flex align-items-center justify-content-center">
                        <p class="text-center text-success">${data.pricing ? data.pricing[0].price + ' <br>' + data.pricing[0].plan : 'Free of Cost/Basic'}</p>
                    </div>
                    <div class="col bg-light rounded-3 d-flex align-items-center justify-content-center">
                        <p class="text-center text-primary">${data.pricing ? data.pricing[1].price + ' <br>' + data.pricing[1].plan : 'Free Of Cost/Pro'}</p>
                    </div>
                    <div class="col bg-light rounded-3 d-flex align-items-center justify-content-center">
                        <p class="text-center text-info">${data.pricing ? data.pricing[2].price + ' <br>' + data.pricing[2].plan : 'Free of Cost /Enterprise'}</p>
                    </div>
                </div>
        
        <div class="row d-flex justify-content-between gap-3">
            <div class="col ">
                <h3>Features</h3>
                <p class="m-0 p-0">${data.features ? data.features[1].feature_name : 'No features found'}</p>
                <p class="m-0 p-0">${data.features ? data.features[2].feature_name : 'No features found'}</p>
                <p class="m-0 p-0">${data.features ? data.features[3].feature_name : 'No features found'}</p>
            </div>
            <div class="col">
                <h3>Integrations</h3>
                <li>${(data.integrations === null || data.integrations[0] === undefined) ? 'No data found' : data.integrations[0]}</li>
                <li>${(data.integrations === null || data.integrations[1] === undefined) ? 'No data found' : data.integrations[1]}</li>
                <li>${(data.integrations === null || data.integrations[2] === undefined) ? 'No data found' : data.integrations[2]}</li>
	             <li>${(data.integrations === null || data.integrations[3] === undefined) ? 'No data found' : data.integrations[3]}</li>
            </div>
        </div>
    </div>
  </div>
</div>
<div class="col rounded-3">
  <div class="card position-relative">
    <img src="${data.image_link ? data.image_link[0] : "Can't find any image"}" class="card-img-top" alt="...">
    <button id="score" class="btn btn-danger position-absolute top-0 end-0 " weight="100px">${data.accuracy.score}%accuracy</button>
    <p ></p>
    <div class="card-body text-center">
      <h5 class="card-title">${data.input_output_examples ? data.input_output_examples[0].input : 'No data Found'}</h5>
      <p class="card-text">${data.input_output_examples ? data.input_output_examples[1].output : 'No data Found'}</p>
    </div>
  </div>
</div>

</div>
</div>

  `
   modalContainer.appendChild(modalDiv)

   /* Show and hide score button */

   const scoreBtn = document.getElementById("score")
   if (data.accuracy.score === null) {
      scoreBtn.classList.add("d-none")
   }
   else {
      scoreBtn.classList.remove("d-none")
   }

}
// loadAItools()