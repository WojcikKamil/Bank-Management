/* eslint-disable no-await-in-loop */
export default class BmUtils {
  static async forEachAsync(array: any[], callback: any) {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array);
    }
  }
}
