export class RequestState {
  static generateCode(length: number = 30): string {
    let result = '';
    const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      result += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }

    return result;
  }
}
