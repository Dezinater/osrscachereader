export default class RawSound {
    constructor(var1, var2, var3, var4) {
        this.sampleRate = var1;
        this.samples = var2;
        this.start = var3;
        this.end = var4;
    }

    toWav() {
        const HEADER_SIZE = 44;
        const CHUNK_SIZE = 16;
        const AUDIO_FORMAT = 1;
        const CHANNELS = 2;
        const BITS_PER_SAMPLE = 16;
        const BYTE_RATE = (this.sampleRate * BITS_PER_SAMPLE * CHANNELS) / 8;
        const BLOCK_ALIGN = (BITS_PER_SAMPLE * CHANNELS) / 8;

        let header = new DataView(new ArrayBuffer(HEADER_SIZE));
        header.writeString("RIFF");//RIFF
        header.writeUint32(header.byteLength + this.samples.length, true);//totalsize
        header.writeString("WAVE");//WAVE
        header.writeString("fmt ");//fmt
        header.writeUint32(CHUNK_SIZE, true);//chunksize - short
        header.writeUint16(AUDIO_FORMAT, true);//audioformat - short
        header.writeUint16(CHANNELS, true);//numchannels - short
        header.writeUint32(this.sampleRate, true);//sampling rate - int
        header.writeUint32(BYTE_RATE, true);//byte rate - int
        header.writeUint16(BLOCK_ALIGN, true);//block align - short
        header.writeUint16(BITS_PER_SAMPLE, true);//bits per sample - short
        header.writeString("data");//data
        header.writeUint32(this.samples.length + 8, true);//datasize - int
console.log(header.byteLength + this.samples.length, header.byteLength);
        let wav = new Uint8Array(header.byteLength + this.samples.length + 8);
        wav.set(new Uint8Array(header.buffer), 0);
        wav.set(this.samples, HEADER_SIZE);
        return wav;
    }
}