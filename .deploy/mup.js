module.exports = {
  servers: {
    one: {
      host: 'url here',
      username: 'root',
      // pem: ''
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'serenahaywood',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://www.serenahaywood.com',
    },

    //dockerImage: 'kadirahq/meteord',
    dockerImage: 'abernix/meteord:node-8.11.2-base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },

  proxy: {
    domains: 'serenahaywood.com,www.serenahaywood.com',
    ssl: {
      // Enable let's encrypt to create free certificates.
      // The email is used by Let's Encrypt to notify you when the
      // certificates are close to expiring.
      letsEncryptEmail: 'eatyourpeasapps@gmail.com',
      forceSSL: true
    }
  }
};
