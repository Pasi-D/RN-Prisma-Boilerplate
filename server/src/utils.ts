import { verify } from 'jsonwebtoken'
import { sign } from 'jsonwebtoken'

export const APP_SECRET = 'appsecret321'

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

export const createToken = (userId) => sign({ userId, expiresIn: "7d" }, APP_SECRET);

export function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken: any = verify(token, APP_SECRET)
    return verifiedToken && verifiedToken.userId
  }

  throw new AuthError()
}

/* You can modify the upper function instead of this */
export function getLoggedUserId(ctx, jwtToken){
  let token = '';
  if (jwtToken) {
    token = jwtToken;
  }else {
    const Authorization = ctx.request.get('Authorization');
    token = Authorization.replace('Bearer ', '')
  }  
  if (token) {
    const { userId } = verify(token, APP_SECRET) as { userId: string }
    return userId
  }
  
  throw new AuthError()
}
