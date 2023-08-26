export default class WorkerPool {

    workers;
    workQueue = new Array();
    promises = new Array();

    constructor(size = 8) {
        this.workers = new Array(size).fill().map((x, i) => ({
            id: i,
            worker: new Worker(new URL('./worker.js', import.meta.url)),
            active: false,
        }));
        
        this.workers.forEach(workerObject => workerObject.worker.onmessage = (event) => {
            const data = event.data;
            data.decompressedData = new Uint8Array(data.decompressedData);

            const promise = this.promises[data.index.id][data.archiveId];
            promise.resolve(data);

            this.promises[data.index.id][data.archiveId] = undefined;

            if (this.workQueue.length != 0) {
                const newWork = this.workQueue.shift();
                workerObject.worker.postMessage(newWork, [newWork.compressedData]);
            } else {
                workerObject.active = false;
            }
        });

    }

    doWork(index, segment, archiveId, compressedData, key) {
        if (this.promises[index] == undefined) this.promises[index] = {};

        if (this.promises[index][archiveId] == undefined) { 
            let resolveMethod;
            let promise = new Promise((resolve, reject) => {
                resolveMethod = resolve;
            });
            this.promises[index][archiveId] = { resolve: resolveMethod, promise };
        } else { //if its already being loaded
            return this.promises[index][archiveId].promise;
        }

        const unactiveWorker = this.workers.find(x => !x.active);
        if (unactiveWorker == undefined) {
            this.workQueue.push({ index, segment, archiveId, compressedData, key });
            return;
        }
        
        unactiveWorker.active = true;
        unactiveWorker.worker.postMessage({ index, segment, archiveId, compressedData, key }, [compressedData]);

        return this.promises[index][archiveId].promise;
    }

}