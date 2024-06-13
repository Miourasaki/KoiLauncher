export default function randomString(e: number): string {
  e = e || 32
  const text = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
  const textLength = text.length
  let n = ''
  for (let i = 0; i < e; i++) n += text.charAt(Math.floor(Math.random() * textLength))
  return n
}
