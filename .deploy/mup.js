module.exports = {
  servers: {
    one: {
      host: '188.166.169.226',
      username: 'root',
      pem: '/Users/SimonChapman/.ssh/id_rsa'
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
      ROOT_URL: 'http://serenahaywood.com'
  //    MONGO_URL: 'mongodb://eatyourpeas:pushk1n@ds157298.mlab.com:57298/serena_haywood_db'
    },

    //dockerImage: 'kadirahq/meteord',
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
