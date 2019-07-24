const { object, string, validate } = new Proxy(require('joi'), {
  get(target, property) {
    return target[property].bind(target);
  }
});

module.exports = { object, string, validate };
