<p align="center">
    <h1 align="center">
        TAZ contracts
    </h1>
</p>

<p align="center">
    <a href="https://github.com/semaphore-protocol/taz-apps" target="_blank">
        <img src="https://img.shields.io/badge/project-TAZ-blue?style=flat-square">
    </a>
    <a href="https://github.com/semaphore-protocol/taz-apps/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/semaphore-protocol/taz-apps.svg?style=flat-square">
    </a>
    <a href="https://github.com/semaphore-protocol/taz-apps/actions?query=workflow%3Astyle">
        <img alt="GitHub Workflow style" src="https://img.shields.io/github/workflow/status/semaphore-protocol/taz-apps/style?label=style&style=flat-square&logo=github">
    </a>
    <a href="https://eslint.org/">
        <img alt="Linter eslint" src="https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint">
    </a>
    <a href="https://prettier.io/">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
</p>

| The `contracts` folder includes tests, tasks, and scripts for the two TAZ smart contracts: `TazMessage.sol` and `TazArtwork.sol`. Included in the `tasks` folder are Hardhat tasks for creating proofs and deploying contracts. The `scripts` folder includes scripts for accomplishing things such as adding access roles to the contracts and updating the group admin on the `Semaphore.sol` contract to be the new `TazMessage.sol` contract when a new contract is deployed. |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## 📜 Usage

Copy the `.env.example` file and rename it `.env`.

### Compile contracts

Compile the smart contracts with [Hardhat](https://hardhat.org/):

```bash
yarn compile
```

### Testing

Run [Mocha](https://mochajs.org/) to test the contracts:

```bash
yarn test
```

### Deploy contracts

Deploy a `TazMessage.sol` contract:

```bash
yarn deploy:taz-message --semaphoreContract 0xE585f0Db9aB24dC912404DFfb9b28fb8BF211fA6
```

Or a `TazArtwork.sol` contract:

```bash
yarn deploy:taz-artwork --semaphoreContract 0xE585f0Db9aB24dC912404DFfb9b28fb8BF211fA6
```
