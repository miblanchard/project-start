function buildPinchObject(pinchEventObject) {
  const pinchObject = {};
  pinchObject.center = pinchEventObject.center;
  pinchObject.deltaX = pinchEventObject.deltaX;
  pinchObject.deltaY = pinchEventObject.deltaY;
  pinchObject.velocityX = pinchEventObject.velocityX;
  pinchObject.velocityY = pinchEventObject.velocityY;
  pinchObject.direction = pinchEventObject.additionalEvent;
  pinchObject.deltaTime = pinchEventObject.deltaTime;
  pinchObject.rotation = pinchEventObject.rotation;
  pinchObject.angle = pinchEventObject.angle;
  pinchObject.start = false;
  pinchObject.end = false;
  return pinchObject;
}

const pinchEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinch', event => {
    const pinchData = {};
    pinchData.type = 'pinch';
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    imperio.socket.emit('pinch', imperio.room, pinchData);
    if (callback) callback(pinchData);
  });
  hammertime.on('pinchstart', event => {
    const pinchData = {};
    pinchData.type = 'pinch';
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    pinchData.start = true;
    imperio.socket.emit('pinch', imperio.room, pinchData);
    if (callback) callback(pinchData);
  });
  hammertime.on('pinchend', event => {
    const pinchData = {};
    pinchData.type = 'pinch';
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    pinchData.end = true;    
    imperio.socket.emit('pinch', imperio.room, pinchData);
    if (callback) callback(pinchData);
  });
};

module.exports = pinchEmitter;