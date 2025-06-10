export interface ITokenService{
    generateTokens(data: JSON): Promise<string>;
}
