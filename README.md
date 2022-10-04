<p align="center">
    <h1 align="center">
        TAZ applications
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

<div align="center">
    <h4>
        <a href="/CONTRIBUTING.md">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="/CODE_OF_CONDUCT.md">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://discord.gg/6mSdGHnstH">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

| The Temporary Anonymous Zone is a no-labels zone where Devcon VI attendees can learn through experience about privacy and anonymity. Visitors can get info on basic concepts, ask the team questions, share thoughts, make digital and physical art together, and interact anonymously with other Devcon attendees using apps built specifically for the Devcon VI TAZ. |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

TAZ contracts use the latest version of the [`Semaphore.sol`](https://goerli.etherscan.io/address/0xE585f0Db9aB24dC912404DFfb9b28fb8BF211fA6) contract, deployed on the Goerli testnet. The web app uses Next.js and allows users with a valid Semaphore ID to join the TAZ group and generate Semaphore proofs to post anonymous questions and answers, or to make art. Proofs related to the Q&A part are validated on-chain, while proofs related to artworks are validated off-chain and final canvases are posted as NFTs. Users can also vote anonymously for their favorite artworks.

⚠️ The TAZ apps are experimental and the code is not well tested. For more information visit [taz.appliedzkp.org](https://taz.appliedzkp.org) or see our [Notion site](https://pse-team.notion.site/About-the-TAZ-app-1ae2793046414468b56472f43725961e).

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

Web app and contracts need their env variables. For each of them, copy the `.env.example` file as `.env`:

```bash
cd apps/web-app # and apps/contracts
cp .env.example .env
```

And add your environment variables.

### Start the web-app

Run the following command to run a local web app:

```bash
yarn start:web-app
```

### Test the contracts

Contracts can be tested with the following command:

```bash
yarn test:contracts
```

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
