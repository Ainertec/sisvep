// ------------------------------------------------- classe dispositivos --------------------------------------------------------------------

// funcao responsavel por gerar a tela de ip de configuracao do dispositivo celular
function telaDeConfiguracaoDispositivo() {
  let codigoHTML = ''

  codigoHTML +=
    '<div class="modal fade" id="modalConfigDispositivo" tabindex="-1" role="dialog" aria-labelledby="modalDispositivo" aria-hidden="true">'
  codigoHTML +=
    '<div class="modal-dialog modal-dialog-scrollable" role="document">'
  codigoHTML += '<div class="modal-content">'
  codigoHTML += '<div class="modal-header">'
  codigoHTML +=
    '<h5 class="modal-title" id="modalDispositivo">Configurar Dispositivo</h5>'
  codigoHTML +=
    '<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
  codigoHTML += '<span aria-hidden="true">&times;</span>'
  codigoHTML += '</button>'
  codigoHTML += '</div>'
  codigoHTML += '<div class="modal-body">'
  codigoHTML +=
    '<p>Faça a leitura do código QR abaixo com seu dispositivo celular para efetuar a configuração básica!</p>'
  codigoHTML +=
    '<div class="qrcode rounded mx-auto d-block" id="qr" style="margin-top: 30px;" align="middle"></div>'
  codigoHTML +=
    '<h3 id="ipNumber" class="text-danger text-center" style="margin-top: 10px;"></h3>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'
  codigoHTML += '</div>'

  document.getElementById('modal').innerHTML = codigoHTML

  $('#modalConfigDispositivo').modal('show')
  animacaoSlideUp(['#qr'])

  pegarIpLocal()
}

// funcao responsavel por pegar o ip local da maquina
function pegarIpLocal() {
  window.RTCPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection // compatibility for Firefox and chrome
  const pc = new RTCPeerConnection({ iceServers: [] })
  const noop = function () { }
  pc.createDataChannel('') // create a bogus data channel
  pc.createOffer(pc.setLocalDescription.bind(pc), noop) // create offer and set local description
  pc.onicecandidate = function (ice) {
    if (ice && ice.candidate && ice.candidate.candidate) {
      const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
        ice.candidate.candidate
      )[1]
      document.getElementById('ipNumber').innerHTML = myIP
      gerarQRcodeDispositivo(myIP.toString())
      pc.onicecandidate = noop
    }
  }
}

// funcao responsavel por gerar o qrcode de configuracao de ip do dispositivo celular
function gerarQRcodeDispositivo(ip) {
  new QRCode('qr', {
    text: ip,
    width: 256,
    height: 256,
    colorDark: 'black',
    colorLight: 'white',
    correctLevel: QRCode.CorrectLevel.H,
  })

  animacaoSlideDown(['#qr'])
}
