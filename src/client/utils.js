Array.prototype.pop = function (index = null) {
  if (this.length == 0) return;
  if (index == null) index = this.length - 1;
  return this.splice(index, 1)[0];
};

export default class Utils {
  static defaults(defaults, additional) {
    return Object.assign(Utils.copy(defaults), additional);
  }

  static copy(obj) {
    return Object.assign({}, obj);
  }

  static textToBase64(text) {
    return btoa(text);
  }
}
