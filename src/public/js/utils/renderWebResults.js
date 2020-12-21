function renderWebResults (response, keyword) {
  const resultSection = document.getElementById('webSearch-results')
  let html = `
<div class="row">
<h5>Busqueda usando <strong>${keyword} </strong>como palabra clave</h5>`
  response.items.forEach((item) => {
    html += `
    <div class="col s5">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${item.htmlTitle}</span>
                        <p>${item.htmlSnippet}</p>
                    </div>
                    <div class="card-action">
                        <a target="_blank" href="${item.link}">Ir a este resultado 🛸</a>
                    </div>
                </div>
     </div>
    `
  })
  html += '</div>'
  resultSection.innerHTML += html
}

export default renderWebResults
