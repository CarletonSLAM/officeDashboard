
const fs = require('fs')
const path = require('path')
const NodeRSA = require('node-rsa')

// Build server config
const bufferedConfig = Buffer.from(JSON.stringify(require('./config'), 'binary')).toString('base64')

fs.writeFileSync(path.resolve(__dirname, '../server/config.js'), `module.exports="${bufferedConfig}";`, { encoding: 'binary', flag: 'w' })


const mkdirIfNotExist = dir => fs.existsSync(dir) || fs.mkdirSync(dir)


// Generate RSA Key for server to increase security

const generateRSAKeys = () => {
    const key = new NodeRSA()
    // 2048 — key length, 65537 open exponent
    key.generateKeyPair(2048, 65537)
    return {
        private: key.exportKey('pkcs8-private-pem'),
        public: key.exportKey('pkcs8-public-pem')
    }
}


const server = generateRSAKeys()

mkdirIfNotExist(path.resolve(__dirname, '../server/keys'))
mkdirIfNotExist(path.resolve(__dirname, '../src/keys'))

fs.writeFileSync(path.resolve(__dirname, '../server/keys', 'server.private.pem'), server.private)
fs.writeFileSync(path.resolve(__dirname, '../src/keys', 'server.public.js'), `module.exports=\`${/^-+.+-+\s([\S\s]+?)-+/g.exec(server.public)[1]}\``)
