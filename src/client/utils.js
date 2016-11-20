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
    var sourcePos = 0,
        destPos = 0;

    while (destPos < destArray.length) {
      if (sourcePos == sourceArray.length) {
        // No more items in source list - remove remaining items
        destArray.splice(destPos, destArray.length - destPos);
        break;
      }

      var comarasonResult = keyComparator(sourceArray[sourcePos], destArray[destPos]);

      if (comarasonResult < 0) {
        // New item - insert into list
        destArray.splice(destPos, 0, sourceArray[sourcePos]);
        destPos++;
        sourcePos++;
      } else if (comarasonResult == 0) {
        // Same item - replace
        if (replaceAction) {
          destArray[destPos] = replaceAction(sourceArray[sourcePos], destArray[destPos]);
        }

        destPos++;
        sourcePos++;
      } else if (comarasonResult > 0 ) {
        // Item removed - remove item at position
        destArray.pop(destPos);
      }
    }

    // Adds additional items on the end
    while (sourcePos < sourceArray.length) {
      destArray.push(sourceArray[sourcePos]);
      sourcePos++;
    }
  }
}
