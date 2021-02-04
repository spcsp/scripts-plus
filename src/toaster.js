const toast = require("./toast");

const createToaster = (title) => (message) => toast(message, { title });

module.exports = createToaster;
