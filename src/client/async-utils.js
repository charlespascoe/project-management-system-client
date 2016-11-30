export default class AsyncUtils {
  static async whenAllForResult(promises) {
    var results = {};

    for (var key in promises) {
      results[key + 'Result'] = await promises[key];
    }

    return results;
  }
}
