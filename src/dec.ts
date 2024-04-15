import * as crypto from 'crypto';
const SSO_FIXED_STRING = "Vbk2wQ6PtZ70x";
const SSO_Securitykey = '71D35B2C84E1A439B1BE06DCE04BD924';

function encrypt(plianText) {
  const algorithm = 'aes-128-ecb';
  const Securitykey = SSO_Securitykey;
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(Securitykey, 'hex'), null);
  let enctedData = cipher.update(plianText, 'utf-8', 'hex');
  enctedData += cipher.final('hex');
  console.log('enc message: ' + enctedData); return enctedData;
}

function decrypt(encryptedData) {
  try {
    const algorithm = 'aes-128-ecb';
    const Securitykey = SSO_Securitykey;
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(Securitykey, 'hex'), null);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf8');
    console.log('Decrypted message: ' + decryptedData); return decryptedData;
  } catch (error) {
    console.log('error : ' + error);
    throw new Error(error);
  }
}
function generateCheckSum(strData: string, correlationId?: string) {
  return crypto.createHash('sha256').update(strData).digest('hex');
}
function validateChecksum(new_str, CHECKSUM) {
  if (new_str == CHECKSUM) {
    return true;
  } else {
    return false;
  }
}
//'SITCORP14|MAKER01|CDP|SMSX|CvrgL/UFgE4PJz7pMUZegW8e3NQxq1c9hLUPWaFU/2iCewQFB04utBunb2mqliC5YhFcw6 / 92Zg3fsjO9DcOtNBJcSQ =|03E27EB0C1913D77AB2DAA61932167BF4091AF34D2F9AC56DAED5F9D7E8C55C5';
const x = '3f6e43c22e34543642eec1f7b7f11e0458a1b42c8d3d16ffb7386b2ad10c16ad79411fec29e63ae519a28723dba9ccc913a2e1d217d017e52bb2203da92a48dbeff49d4fe82e111905d7bb513ec6ffffbd1fc984601d7db1e0e941a3a1875aa476a49cd83af6294b69eccf6ea90b83aaa2116d38f7d3675101df05787e4c07d484e56a3132301b21d675edbd8d11f0fcf36da718aa607e72fa484580bcc755bc0bd18e9a6e0d2070eb4aabbf13fc73dc08d25c7ae77d45c4493a786296d51909'
const decryptedData = decrypt(x);
console.log(decryptedData)
// let checkSum = decryptedData.slice(decryptedData.lastIndexOf('|') + 1, decryptedData.length);
// let new_String = decryptedData.slice(0, decryptedData.lastIndexOf('|')) + '|' + SSO_FIXED_STRING;
// let newStringCheckSum = generateCheckSum(new_String);
// newStringCheckSum = newStringCheckSum.toUpperCase();
// console.log('generating checksum : ', newStringCheckSum);
// let validateCheckSum = validateChecksum(newStringCheckSum, checkSum);
// console.log('validateCheckSum : ', validateCheckSum)