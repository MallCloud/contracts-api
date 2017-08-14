## Contract Deployment to Test Networks via Truffle

### Connecting to Rinkeby Network

#### Geth Setup

1. Create a folder with name '.rinkeby'.

2. Download genesis json for rinkeby from [here](https://www.rinkeby.io/rinkeby.json)

3. Run this command :

    ```
    geth --datadir=$HOME/.rinkeby --light init rinkeby.json
    ```

4. Run this command :

    ```
    geth --networkid=4 --datadir=$HOME/.rinkeby --syncmode=light --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303?discport=30304 --rpc --rpcapi db,eth,net,web3,personal --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --unlock="${BLOCKCHAIN_ADDRESS}"
    ```

#### Truffle Setup

1. In the truffle.js file, add the ${BLOCKCHAIN_ADDRESS} in the 'from' key in rinkeby part of the networks information.

2. Run the command :

    ```
    truffle compile --all
    ```

3. Run this command :

    ```
    truffle migrate --network rinkeby
    ```
