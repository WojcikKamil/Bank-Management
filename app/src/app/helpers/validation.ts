export default class RtValidators {
  static hasLowerCase(str: string) {
    return (/[a-z]/.test(str));
  }

  static hasUpperCase(str: string) {
    return (/[A-Z]/.test(str));
  }

  static hasNumber(str: string) {
    return (/\d/.test(str));
  }

  static onlyHasNumbers(str: string) {
    return (/^[0-9]*$/.test(str));
  }
}
