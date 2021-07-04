onmessage = function(e) {
    var workerResult = 'Result: ' + (e.data[0]);
    //console.log(e);
    postMessage(workerResult);
  }