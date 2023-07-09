module.exports = function props(status, error, message) {
  var obj = { timestamp: Date.now(), status, error, message };
  return obj;
};
