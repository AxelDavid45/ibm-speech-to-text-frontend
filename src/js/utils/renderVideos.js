function renderVideos (response, keyword) {
  const resultSection = document.getElementById('youtube-results');
  let html = `
<div class="row">
<h5>Busqueda usando <strong>${keyword} </strong>como palabra clave</h5>`;
  response.items.forEach((searchResult) => {
    html += `
    <div class="col s6">
                <div class="card-panel">
                    <div class="video-container">
                        <iframe
                                src="https://www.youtube.com/embed/${searchResult.id.videoId}"
                                encrypted-media;
                                frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
    `;
  });
  html += '</div>';
  resultSection.innerHTML += html;
}

export default renderVideos;
