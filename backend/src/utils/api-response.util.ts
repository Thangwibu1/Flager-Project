export class ApiResponse {
  static success(message: string, data: any) {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string, code?: string | number) {
    return {
      success: false,
      message,
      code: code,
    };
  }
}