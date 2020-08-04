'use strict'
import AudioService from './services/AudioService.js'


const speechAudio = document.getElementById('speech');

function handleUploadFile(evt) {
  const file = document.getElementById('file').files[0];
  const audioService = new AudioService();
  audioService.upload(file)
  evt.preventDefault();
}

speechAudio.addEventListener('submit', handleUploadFile);
