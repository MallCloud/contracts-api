module.exports = {
  networks: {
    development: {
      host: "172.21.0.6",
      port: 8545,
	  // Match any network id
      network_id: "*",
      from: "0x72ceb2053d3ac4880dd7454b81a63bca4bc1aefa"
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: "3" // Match any network id
    }
  }
};
