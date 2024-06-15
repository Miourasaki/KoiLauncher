import CryptoJS from 'crypto-js'

const randomString = (
  t: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'
): string => {
  const eLength = 32
  const a = t.length
  let n = ''
  for (let i = 0; i < eLength; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

// 加密
const Encrypt = (text: string): string => {
  const key = randomString()
  const iv = randomString()
  const mainResult = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()

  return `${key}:${mainResult}:${iv}`
}

// 解密
const Decrypt = (text: string): string => {
  const textList = text.split(':')
  const key = textList[0]
  const main = textList[1]
  const iv = textList[2]

  const decrypted = CryptoJS.AES.decrypt(main, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export { Encrypt, Decrypt }
