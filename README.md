## Contracts

The contracts folder includes test, tasks, and scripts folders for the two TAZ smart contracts: TazMessage and TazToken.

Contract tests can be run from the root "taz-apps" folder using `yarn test:contracts`.

Included in the tasks folder are Hardhat tasks for creating proofs and deploying contracts.

The scripts folder includes scripts for accomplishing things such as adding access roles to the contracts and updating the group admin on the Semaphore contract to be the new TazMessage contract when a new TazMessage contract is deployed.

# Subgraphs

The subgraphs folder includes subgraph files for each of the two TAZ contracts. Contracts/helpers/subgraphs.js is the class used to make subgraph api queries.

The taz-token subgraph has entities Token, Violation, and Vote.
The taz-message subgraph has entities Message, Violation, and MemberAddeds.

Entity data is derived from events, plus some rollup attributes such as TotalVotes and HasViolation.
