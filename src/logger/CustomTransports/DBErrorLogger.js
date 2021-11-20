const Transport = require("winston-transport");
const { logsController } = require("../../controllers");

module.exports = class DBErrorLogger extends Transport {
  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });
    if (info) {
      logsController.insertErrorLog(info);
    }
    callback();
  }
};
