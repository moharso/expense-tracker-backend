export default class Exception extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
      }
  }