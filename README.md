# Bookstore Smart Contract

## Description
This is a basic bookstore smart contract. It comes with a test for that contract, and a script that deploys that contract.

## Technologies

- [Hardhat](https://hardhat.org/)
- [Alchemy](https://dashboard.alchemy.com/)
- [Ethers](https://docs.ethers.org/v5/)

## Architecture Diagram
![ArchitectureDiagram](assets/img/AWS%20Architecture%20Diagram.png)

## Installation

Run
```bash
yarn install
```

## Usage
To compile smart contracts run the following command

```
yarn compile
```

To test smart contract run the following command
```
yarn test
```

## Deploying

### Deploying to the Goerli network.

1. You'll need to sign up for [Alchemy](https://dashboard.alchemy.com/). and get an API key.
2. You'll need Goerli ether to pay for the gas to deploy your contract. Visit https://goerlifaucet.com/ to get some.
3. Using your API key and the private key for your Account wallet (make sure you're using a private key that you're comfortable using for testing purposes), run:

```
GOERLI_URL=https://eth-goerli.g.alchemy.com/v2/<API Key>
PRIVATE_KEY=<Deployer Account>
yarn deploy
```

## License
[MIT](https://choosealicense.com/licenses/mit/)