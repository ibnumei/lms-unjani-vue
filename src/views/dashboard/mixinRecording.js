import RecordRTC from 'recordrtc';
import moment from 'moment';

const requiredMixin = {
  data() {
    return {
      startRecordTimestamp: null
    };
  },
  methods: {
    async startRecording() {
      this.startRecordTimestamp = moment().format('DDMMYYYY_HHmmss');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.$refs.video.srcObject = stream;

      this.recorder = new RecordRTC(stream, {
        type: 'video',
      });

      this.recorder.startRecording();
    },
    async stopRecording(kodePinjam = '') {
      await this.recorder.stopRecording(async () => {
        const blob = this.recorder.getBlob();
        this.videoUrl = URL.createObjectURL(blob);

        this.$refs.video.srcObject.getTracks().forEach(track => track.stop());

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = this.videoUrl;
        a.download = `${this.startRecordTimestamp}_${kodePinjam}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        this.goBack();
      });
    },
  },
  computed: {
  },
  created () {
  },
  watch: {
  }
}

export default requiredMixin;
