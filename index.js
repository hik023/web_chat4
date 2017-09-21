navigator.webkitGetUserMedia({video: true, audio: false}, function (stream) {

    var Peer = require('simple-peer')
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    })

    peer.on('signal', function (data) {
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', function () {
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click', function () {
        var yourMessage = document.getElementById('yourMessage').value
        var video = document.getElementById('vid')
        video.width = 400
        peer.send(yourMessage)
    })

    peer.on('data', function (data) {
        document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream', function (stream) {
        var video = document.createElement('video')
        video.id = 'vid'
        document.body.appendChild(video)
        video.src = window.URL.createObjectURL(stream)
        video.width = 40
        video.play()
    })

}, function (err) {
    console.error(err)
})