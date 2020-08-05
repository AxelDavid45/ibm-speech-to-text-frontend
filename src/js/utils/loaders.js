function insertLoader(element) {
  element.innerHTML = `
   <div id="loader-inserted" class="progress">
        <div class="indeterminate"></div>
    </div>`;
}

function deleteLoaderInserted() {
  document.getElementById('loader-inserted').remove();
}

export {
  insertLoader,
  deleteLoaderInserted
}

