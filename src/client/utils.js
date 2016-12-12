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

  static shallowEquals(object1, object2) {
    for (var key in object1) {
      if (object1[key] !== object2[key]) return false;
    }

    for (var key in object2) {
      if (object1[key] !== object2[key]) return false;
    }

    return true;
  }

  static escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  static updateArray(sourceArray, destArray, keyComparator, replaceAction = null) {
    var index = 0;

    while (index < destArray.length) {
      if (index == sourceArray.length) {
        // No more items in source list - remove remaining items
        destArray.splice(index, destArray.length - index);
        break;
      }

      var comarasonResult = keyComparator(sourceArray[index], destArray[index]);

      if (comarasonResult < 0) {
        // New item - insert into list
        destArray.splice(index, 0, sourceArray[index]);
        index++;
      } else if (comarasonResult == 0) {
        // Same item - replace
        if (replaceAction) {
          destArray[index] = replaceAction(sourceArray[index], destArray[index]);
        }

        index++;
      } else if (comarasonResult > 0) {
        // Item removed - remove item at position
        destArray.pop(index);
      }
    }

    // Adds additional items on the end
    while (index < sourceArray.length) {
      destArray.push(sourceArray[index]);
      index++;
    }
  }
}
