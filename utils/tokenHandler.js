import jwt from 'jsonwebtoken'

export const maxAge = 3 * 24 * 60 * 60
export function createToken(payload, exp = maxAge) {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: exp,
  })
}
export function verifyToken(token) {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, data) => {
    if (err) return false
    return data
  })
}
