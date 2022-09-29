<p align="center">
    <h1 align="center">
        TAZ applications
    </h1>
</p>

<p align="center">
    <a href="https://github.com/semaphore-protocol/taz-apps" target="_blank">
        <img src="https://img.shields.io/badge/project-TAZ.svg?style=flat-square">
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

## 🛠 Install

Clone this repository:

```bash
git clone https://github.com/semaphore-protocol/taz-apps.git
```

And install the dependencies:

```bash
cd taz-apps && yarn
```

## 📜 Usage

## Contracts

The contracts folder includes test, tasks, and scripts folders for the two TAZ smart contracts: TazMessage and TazToken.

Contract tests can be run from the root "taz-apps" folder using `yarn test:contracts`.

Included in the tasks folder are Hardhat tasks for creating proofs and deploying contracts.

The scripts folder includes scripts for accomplishing things such as adding access roles to the contracts and updating the group admin on the Semaphore contract to be the new TazMessage contract when a new TazMessage contract is deployed.

# Subgraphs

The subgraphs folder includes subgraph files for each of the two TAZ contracts. `web-app/helpers/subgraphs.js` is the class used to make subgraph api queries.

The taz-token subgraph has entities Token, Violation, and Vote.
The taz-message subgraph has entities Message, Violation, and MemberAddeds.

Entity data is derived from events, plus some rollup attributes such as TotalVotes and HasViolation.

### Code quality and formatting

Run [ESLint](https://eslint.org/) to analyze the code and catch bugs:

```bash
yarn lint
```

Run [Prettier](https://prettier.io/) to check formatting rules:

```bash
yarn prettier
```

or to automatically format the code:

```bash
yarn prettier:write
```
