const CryptoJS = require('crypto-js');
const fs = require('fs');

const AES = CryptoJS.AES;
const standardEntries = ['0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', '0x00000000000000000000000000000000', '0x00000000000000000000000000000001'];
var cipher;

const cipherToHex = cipher => {
    var c64 = CryptoJS.enc.Base64.parse(cipher);
    var cHex = c64.toString(CryptoJS.enc.Hex);
    
    return cHex;
};

standardEntries.map(entry => {
    cipher = AES.encrypt(entry, '', {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).toString();
    cipher = cipherToHex(cipher);
    console.log(`Cipher for ${entry}: ${cipher}`);
});

fs.readFile('assets/Entry', 'utf8', (err, fileContent) => {
    if(err) {
        return console.log(err);
    }

    cipher = AES.encrypt(fileContent, '').toString();
    cipher = cipherToHex(cipher);
    console.log(`Cipher for ${fileContent}: ${cipher}`);
});
