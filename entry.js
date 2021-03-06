const defined = require('terriajs-cesium/Source/Core/defined');
const deprecationWarning = require('terriajs-cesium/Source/Core/deprecationWarning');
const Promise = require('terriajs/lib/Core/Promise');
const globeGif = require('./lib/Styles/globe.gif');
require('./lib/Styles/loader.css');

function loadMainScript() {
    //polyfill promoise since require.ensure relies on Promise
    if (!defined(window.Promise)) {
        deprecationWarning('promise-polyfill', 'This browser does not have Promise support. It will be polyfilled automatically, but an external polyfill (e.g. polyfill.io) will be required starting in TerriaJS v7.0');
        window.Promise = Promise;
    }
    // load the main chunk
    return new Promise((resolve, reject) => {
        require.ensure(['./index'], function(require) {
            resolve(require('./index'));
        }, function(error) {
            reject(error);
        }, 'index'); 
    });
}

function createLoader() {
    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add("loader-ui");
    const loaderGif = document.createElement('img');
    loaderGif.src = globeGif;
    const loaderLeft = document.createElement('div');
    loaderLeft.classList.add("loader-ui-left");
    const loaderGrabber = document.createElement('div');
    loaderGrabber.classList.add('loader-ui-grabber');
    const loaderRight = document.createElement('div');
    loaderRight.classList.add("loader-ui-right");
    loaderRight.append(loaderGif);

    loaderDiv.append(loaderLeft);
    loaderDiv.append(loaderRight);
    loaderDiv.append(loaderGrabber);
    loaderDiv.style.backgroundColor ='#383F4D';
    document.body.appendChild(loaderDiv);

    loadMainScript().then(() => {
        loaderDiv.classList.add('loader-ui-hide');
        setTimeout(()=> {
            document.body.removeChild(loaderDiv);
        }, 2000);
    });
}

createLoader();


