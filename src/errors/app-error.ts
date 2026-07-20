//Permite retornar códigos HTTP específicos sem espalhar regras de resposta pelos Controllers.
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);

    this.name = 'AppError';
  }
}
