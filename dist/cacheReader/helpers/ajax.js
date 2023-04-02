export function getFile(file) {
    var xhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                resolve(this.responseText);
            }
        };
        xhttp.open("GET", file, true);
        try {
            xhttp.send();
        }
        catch (e) { }
    });
}
export function getFileBytes(file) {
    var xhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                resolve(new Uint8Array(this.response));
            }
        };
        xhttp.open("GET", file, true);
        xhttp.responseType = "arraybuffer";
        try {
            xhttp.send();
        }
        catch (e) { }
    });
}
