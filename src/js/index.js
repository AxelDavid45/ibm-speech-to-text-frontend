'use strict'
import AudioService from './services/AudioService.js'
import AnalyzerService from './services/AnalyzerService.js'
import YoutubeAPI from './services/YoutubeAPI.js'
import { insertLoader, deleteLoaderInserted } from './utils/loaders.js';
import renderVideos from './utils/renderVideos.js';

const speechAudio = document.getElementById('speech')
const resultsTitle = document.getElementById('results-title');
const youtubeSectionTitle = document.getElementById('yt-results-title');
const submitButton = document.getElementById('submit-btn')
const file = document.getElementById('fileSource')
const player = document.getElementById('player')
const loader = document.getElementById('loader')
const youtubeResults = document.getElementById('youtube-results');

resultsTitle.style.display = 'none'
youtubeSectionTitle.style.display = 'none';
loader.style.display = 'none'

async function retrieveVideos (keyword) {
  try {
    const ytApi = new YoutubeAPI();
    youtubeSectionTitle.style.display = 'block';
    const response = await ytApi.retrieveVideos(keyword);
    // Load asynchronously
    setTimeout(renderVideos, 500, response, keyword);
  } catch (err) {
    console.log(err)
  }
}

async function analyzeText (text) {
  try {
    console.log(text)
    const payload = {
      'text': text
    }
    const analyzer = new AnalyzerService()
    const response = await analyzer.analyze(JSON.stringify(payload))
    if (response.status === 200) {
      resultsTitle.style.display = 'block'
      // TODO  call yt api
      insertLoader(youtubeResults);
      response.keywords.forEach(keyword => {
        retrieveVideos(keyword.text)
      });
      deleteLoaderInserted(youtubeResults);
    }
  } catch (err) {
    console.log(err)
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
    await analyzeText(transcriptFirstRequest.transcript)
    console.log(transcriptFirstRequest)
    loader.style.display = 'none'
  }
}

async function handleUploadFile (evt) {
  evt.preventDefault()
  //Get the file
  submitButton.style.display = 'none'
  const src = file.files[0]
  const audioService = new AudioService()
  const createJob = await audioService.upload(src)
  if (createJob.status === 201) {
    setTimeout(retrieveTranscript, 120, createJob)
  }
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
