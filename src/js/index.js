'use strict'
import AudioService from './services/AudioService.js'
import AnalyzerService from './services/AnalyzerService.js';

const speechAudio = document.getElementById('speech')
const resultsTitle = document.getElementById('results-title');
const submitButton = document.getElementById('submit-btn')
const file = document.getElementById('fileSource')
const player = document.getElementById('player')
const results = document.getElementById('results')
const loader = document.getElementById('loader')

resultsTitle.style.display = 'none';
loader.style.display = 'none'

async function analyzeText(text) {
  try {
    console.log(text);
    const payload = {
      'text': text
    };
    const analyzer = new AnalyzerService();
    const response = await analyzer.analyze(JSON.stringify(payload));
    if (response.status === 200) {

    }
  } catch(err) {
    console.log(err);
  }
}

async function retrieveTranscript (job, delay) {
  const audioService = new AudioService()
  const transcriptFirstRequest = await audioService.retrieveResult(job.id)
  if (transcriptFirstRequest.message === 'processing') {
    loader.style.display = 'block'
    setTimeout(retrieveTranscript, delay, transcriptFirstRequest, 200)
  } else if (transcriptFirstRequest.message === 'completed') {
    // TODO call analyzer service
    await analyzeText(transcriptFirstRequest.transcript);
    console.log(transcriptFirstRequest)
    loader.style.display = 'none';
  }
}

async function handleUploadFile (evt) {
  //Get the file
  submitButton.style.display = 'none';
  const src = file.files[0]
  const audioService = new AudioService()
  const createJob = await audioService.upload(src)
  if (createJob.status === 201) {
    setTimeout(retrieveTranscript, 120, createJob)
  }
  evt.preventDefault();
}

function loadAudio () {
  const src = file.files[0]
  if (src.size >= 100) {
    player.src = URL.createObjectURL(src)
    submitButton.style.display = 'block '
  }
}

submitButton.style.display = 'none'
file.addEventListener('change', loadAudio)
speechAudio.addEventListener('submit', handleUploadFile)
