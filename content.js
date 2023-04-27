
const video = document.querySelector('video');

const volumeBar = document.querySelector('.ytp-volume-slider-handle');

// selecione o path do svg dentro do botão
const volumePath = document.getElementById('ytp-id-15');

const style = document.createElement('style');
style.textContent = `
 
  .centralizarPlayer1 {
    z-index: 10000;
    position: absolute !important;   
    left: 50%;
    transform: translateX(-50%);
  }

  .square-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #007bff;
    position: relative;
    margin-right: 10px;
  }
  
  .inner-square {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: #007bff;
  }
`;
document.head.appendChild(style);

if(video && volumeBar)
{
  setTimeout(() => {
    if(document.getElementById('player'))
      document.getElementById('player').style.width = video.style.width;
    if(document.querySelector('.ytp-pip-button'))
      document.querySelector('.ytp-pip-button').style.display = '';
  }, 500);
  
  // Adicione um ouvinte de eventos de rolagem do mouse ao elemento de vídeo
  video.addEventListener('wheel', (event) => {
  // Verifique se o cursor do mouse está dentro da área do vídeo
  if (video.contains(event.target)) {
      // Impedir que a página role enquanto o usuário estiver controlando o volume do vídeo
      event.preventDefault();

      if(document.querySelector('.volumeTexto'))
          document.querySelector('.volumeTexto').remove();
      // Calcule o novo volume do vídeo baseado na rolagem do mouse
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      const newVolume = video.volume + (delta * 0.1);

      // Limite o volume do vídeo entre 0 e 1
      video.volume = Math.max(0, Math.min(1, newVolume));

      // Cria a div para mostrar o valor do volume
      let volumeValue = document.createElement('div');
      volumeValue.classList.add("volumeTexto");
      volumeValue.textContent = `${Math.round( video.volume * 100 ) }`;
      volumeValue.style.position = 'absolute';
      volumeValue.style.top = `${event.clientY - 50}px`;
      volumeValue.style.left = `${event.clientX}px`;
      //volumeValue.style.backgroundColor = '#000';
      volumeValue.style.color = '#fff';
      volumeValue.style.fontSize = '3rem';
      volumeValue.style.padding = '5px';
      volumeValue.style.zIndex = '10000';
      volumeValue.style.borderRadius = '15px';

      // altere o path para um círculo vazio
      if(volumePath){
          if(video.volume == 0)
          {
              volumePath.setAttribute(
                  "d",
                  "m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"
                );
          } else
          if (video.volume >= 0.5) {
              volumePath.setAttribute(
                "d",
                "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"
              );
            } else {
              volumePath.setAttribute(
                "d",
                "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z"
              );
            }
      }
      // Adiciona a div à página
      document.body.appendChild(volumeValue);

      volumeBar.style.left = `${getVolumeValue(video.volume)}px`;

      // Remove a div após 1 segundo
      setTimeout(() => {
          volumeValue.remove();
      }, 700);
  
  }
}, { passive: false });
}

function getVolumeValue(volume) {
    const maxVolumeValue = 40;
    const volumeValue = volume * maxVolumeValue;
    return volumeValue;
}

document.addEventListener('click', function(event) {
    const primaryElement = document.getElementById('primary');

    if(primaryElement){
      const isClickedInsidePrimary = primaryElement.contains(event.target);

      const elementBlack = document.getElementById('transposicaoLaion');
      if(elementBlack){
          const isClickedInsideelementBlack = elementBlack.contains(event.target);
          if(isClickedInsideelementBlack){
            elementBlack.remove();
            document.getElementById('player').style.width = video.style.width;
            document.getElementById('player').classList.remove("centralizarPlayer1");
          }
              
      }

      if (!isClickedInsidePrimary && !elementBlack) {
        const isClickedNearPrimary = Math.abs(event.clientX - primaryElement.getBoundingClientRect().x) < 50;
        if (isClickedNearPrimary) {
          // cria a div
          const overlay = document.createElement('div');
          // define os atributos
          overlay.setAttribute('style', 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:black;z-index:9998;');
          overlay.setAttribute('id', 'transposicaoLaion');
          // adiciona a div ao DOM
          document.body.appendChild(overlay);
          document.getElementById('player').style.zIndex = 10000;
          document.getElementById('player-theater-container').style.zIndex = 10000;
          document.getElementById('player').style.width = video.style.width;
          document.getElementById('player').classList.add("centralizarPlayer1");
        }
      }
    }
});

const scriptTags = document.querySelectorAll("script");

var ytInitialPlayerResponse_ = '';

if(scriptTags){
  scriptTags.forEach(scriptTag => {
    if(scriptTag.textContent.includes('var ytInitialPlayerResponse'))
      ytInitialPlayerResponse_ = JSON.parse(scriptTag.textContent.split('ytInitialPlayerResponse = ')[1].split(`;var meta = document.createElement('meta')`)[0]);
});
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getVideoData") {
    var videoData = {
      videoUrl: "",
      videoTitle: "",
    };

    if(ytInitialPlayerResponse_){
      // Get video URL
      var videoUrlElement =  ytInitialPlayerResponse_.streamingData.formats[ytInitialPlayerResponse_.streamingData.formats.length - 1];
      if (videoUrlElement) {
        videoData.videoUrl = videoUrlElement.url;
      }

      // Get video title
      var videoTitleElement = document.querySelector(
        "meta[itemprop=name]"
      );
      if (videoTitleElement) {
        videoData.videoTitle = videoTitleElement.getAttribute("content");
      }

      sendResponse({ videoData: videoData });

      var videoUrl = videoData.videoUrl;
      var fileName = videoData.videoTitle + ".mp4";

      try {
        const videoRequest = new Request(videoUrl);
        fetch(videoRequest)
          .then(() => {
            const link = document.createElement('a');
            link.href = videoUrl;
            link.setAttribute('download', fileName);
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (request.action == "pipVideo") {
    document.querySelector('video').removeAttribute("disablepictureinpicture");
    document.querySelector('video').requestPictureInPicture();    
  }
});

