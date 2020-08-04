'use strict'
class RecorderService {
  constructor(player) {
    this.chunks = [];
    this.pushChunks = this.pushChunks.bind(this);
  }

  async verifyPermissions() {
    const allowed  = await navigator.permissions.query({name:'microphone'});
    return allowed.state;
  }

  pushChunks(evt) {
    this.chunks.push(evt.data);
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({audio:true, video: false});
    this.recorder = new MediaRecorder(stream);
    this.recorder.start();
    this.recorder.addEventListener('dataavailable', this.pushChunks);
  }

  stopRecording() {
    this.recorder.addEventListener('stop', () => {
      this.file  = new Blob(this.chunks);
      this.url = URL.createObjectURL(this.file);
    });

    this.recorder.stop();
  }
}

export default RecorderService;
