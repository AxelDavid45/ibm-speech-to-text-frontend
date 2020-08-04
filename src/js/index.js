'use strict'
import AudioService from './services/AudioService.js';

const speechAudio = document.getElementById('speech');
const file = document.getElementById('start');
const stopRecord = document.getElementById('stop');
const player = document.getElementById('player');
const audioRecorded = document.getElementById('audio-recorded');

async function handleUploadFile(file) {
  const audioService = new AudioService();
  const response = await audioService.upload(file);
  console.log(response);

}

async function handleRecord(evt) {
  const stream = await navigator.mediaDevices.getUserMedia({audio:true, video: false});
  const recorder = new MediaRecorder(stream);
  recorder.start();
  const audioChunks= [];
  let file;

  recorder.addEventListener('dataavailable', evt => audioChunks.push(evt.data));
  recorder.addEventListener('stop', () => {
    file = new File(audioChunks, 'speech.mp3', {type: 'audio/mpeg'});
    console.log(file.type);
    player.src = URL.createObjectURL(file);
    handleUploadFile(file);
  });
  stopRecord.addEventListener('click', () => {
    recorder.stop();
  });
}
speechAudio.addEventListener('submit', handleUploadFile);
file.addEventListener('click', handleRecord);
