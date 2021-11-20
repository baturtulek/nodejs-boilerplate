const Transport = require("winston-transport");
const { logsController } = require("../../controllers");

module.exports = class DBRequestLogger extends Transport {
  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });
    if (info.message) {
      logsController.insertRequestLog(info.message);
    }
    callback();
  }
};
