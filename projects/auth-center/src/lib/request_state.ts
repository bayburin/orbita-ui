export class RequestState {
  private readonly CODE_LENGTH = 30;

  constructor(public value: string = null) {
    this.value = value || this.generateCode();
  }

  isValid(received: string): boolean {
    return this.value === received;
  }

  private generateCode(): string {
    let result = '';
    const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < this.CODE_LENGTH; i++) {
      result += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }

    return result;
  }
}
