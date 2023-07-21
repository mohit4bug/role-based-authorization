export const extractAuthTokenFromCookie = (cookieHeader: string) => {
  if (cookieHeader === undefined) return null

  const cookiesArray = cookieHeader.split(';')
  const cookies = cookiesArray.reduce((map: any, cookie) => {
    const [key, value] = cookie.trim().split('=')
    map[key] = value
    return map
  }, {})

  return cookies || null
}
