<p align="center">
    <h1 align="center">
        TAZ applications - TAZ-Zuzalu
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

| TAZ-Zuzalu is a decentralized application (DApp) that allows attendees of the Zuzalu pop-up city community in Montenegro to participate in events anonymously while preserving their identities. The application leverages Zero Knowledge Proof (ZKP) technology, specifically the Semaphore protocol, integrating a Passport that enables users to prove their eligibility to attend events without revealing their personal information.
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

<br>

## 🛠 Install

Clone this repository:

```bash
git clone https://github.com/Taz-Zuzalu/web-app.git
```

And install the dependencies:

```bash
cd web-app && yarn
cd apps/web-app && yarn
```

## 📜 Usage

Web app needs its env variables. Copy the `.env.example` file as `.env.local` at the `apps/web-app` folder.

```bash
cp .env.example .env.local
```

And add your environment variables.

### Start the web-app

Run the following command to run a local web app from your apps folder:

```bash
yarn start:web-app
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