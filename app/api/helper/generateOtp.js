
async function generateCode() {
  const verificationCode = Math.floor(10000000 + Math.random() * 90000000).toString();
  return verificationCode
}
export default generateCode;