module.exports = {
  networks: {
    rinkeby: {
      network_id: 4,
      host: '127.0.0.1',
      port: 8545,
      gas: 4000000,
      from: ''
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
  },
};
