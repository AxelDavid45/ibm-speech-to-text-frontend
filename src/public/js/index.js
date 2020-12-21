'use strict'
import AudioService from './services/AudioService.js'
import AnalyzerService from './services/AnalyzerService.js'
import YoutubeAPI from './services/YoutubeAPI.js'
import WebSearch from './services/WebSearch.js';
import { insertLoader, deleteLoaderInserted } from './utils/loaders.js';
import renderVideos from './utils/renderVideos.js';
import renderWebResults from './utils/renderWebResults.js';

const speechAudio = document.getElementById('speech')
const resultsTitle = document.getElementById('results-title');
const webSearchTitle = document.getElementById('webSearch-title');
const youtubeSectionTitle = document.getElementById('yt-results-title');
const submitButton = document.getElementById('submit-btn')
const file = document.getElementById('fileSource')
const player = document.getElementById('player')
const loader = document.getElementById('loader')
const youtubeResults = document.getElementById('youtube-results');
const webSearchResults = document.getElementById('webSearch-results');

resultsTitle.style.display = 'none'
youtubeSectionTitle.style.display = 'none';
webSearchTitle.style.display = 'none';
loader.style.display = 'none'
async function retrieveWebSearchResults(keyword) {
  try {
    const webSearch = new WebSearch();
    webSearchTitle.style.display = 'block';
    const response = await webSearch.retrieveResults(keyword);
    setTimeout(renderWebResults, 500, response, keyword);
  } catch (err){
    console.log(err);
  }
}

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
      // Call Youtube API
      insertLoader(youtubeResults);
      response.keywords.forEach(keyword => {
        retrieveVideos(keyword.text)
      });
      deleteLoaderInserted(youtubeResults);

      // Call Google API
      insertLoader(webSearchResults);
      response.keywords.forEach(keyword => {
        retrieveWebSearchResults(keyword.text);
      });
      deleteLoaderInserted(webSearchResults);
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
