import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.122:3333', {
  autoConnect: false,
});

function subscribeToAddedDevs(subscribeFunction) {
  socket.on('add-dev', subscribeFunction);
}

function subscribeToRemovedDevs(subscribeFunction) {
  socket.on('remove-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToAddedDevs, subscribeToRemovedDevs };
