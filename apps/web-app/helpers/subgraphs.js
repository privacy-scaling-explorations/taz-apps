/* eslint-disable no-await-in-loop */
const axios = require("axios")

const { SEMAPHORE_SUBGRAPH, TAZMESSAGE_SUBGRAPH, TAZARTWORK_SUBGRAPH } = require("../config/goerli.json")

const PAGE_SIZE = 1000

class Subgraphs {
    constructor() {
        this.tazMessageSubgraphApi = TAZMESSAGE_SUBGRAPH
        this.tazArtworkSubgraphApi = TAZARTWORK_SUBGRAPH
        this.semaphoreSubgraphApi = SEMAPHORE_SUBGRAPH
    }

    static async request(url, config) {
        const { data } = await axios(url, config)

        return data?.data
    }

    async getGroupIdentities(groupId) {
        let lastRecordId = -1
        let members = []
        const allMembers = []
        let identityCommitments = []

        do {
            console.log(
                `SUBGRAPHS | getGroupIdentities | lastRecordId: ${lastRecordId}, members.length: ${members.length}, allMembers.length: ${allMembers.length}`
            )

            const config = {
                method: "post",
                data: JSON.stringify({
                    query: `
                        {
                            members(
                            where: {group_: {id: "${groupId}"}, index_gt: ${lastRecordId}}
                            orderBy: index
                            first: ${PAGE_SIZE}
                            ) {
                            identityCommitment
                            index
                            }
                        }`
                })
            }

            ;({ members } = await Subgraphs.request(this.semaphoreSubgraphApi, config))
            if (members.length) {
                lastRecordId = members[members.length - 1].index
            }
            allMembers.push(...members)
        } while (members.length === PAGE_SIZE)

        if (allMembers.length > 0) {
            identityCommitments = allMembers.map((x) => x.identityCommitment)
        }

        return identityCommitments
    }

    async isVerifiedGroupIdentity(groupId, identityCommitment) {
        let members = []

        const config = {
            method: "post",
            data: JSON.stringify({
                query: `
                    {
                    members(where: {group_: {id: "${groupId}"}, identityCommitment: "${identityCommitment}"}) {
                        identityCommitment
                        timestamp
                    }
                    }`
            })
        }

        ;({ members } = await Subgraphs.request(this.semaphoreSubgraphApi, config))

        return members.length > 0
    }

    // Gets all non-violating tokens
    async getMintedTokens() {
        let lastRecordId = -1
        let tokens = []
        const allTokens = []

        do {
            console.log(
                `SUBGRAPHS | getMintedTokens | lastRecordId: ${lastRecordId}, tokens.length: ${tokens.length}, allTokens.length: ${allTokens.length}`
            )

            // Sorting by id is faster than skipping, but to do so we need to order asc then reverse when all are fetched.
            const config = {
                method: "post",
                data: JSON.stringify({
                    query: `
                        {
                        tokens(
                            where: {hasViolation: false, tokenId_gt: ${lastRecordId}}
                            orderBy: tokenId
                            orderDirection: asc
                            first: ${PAGE_SIZE}
                        ) {
                            tokenId
                            uri
                            imageId
                            totalVotes
                        }
                        }`
                })
            }

            ;({ tokens } = await Subgraphs.request(this.tazArtworkSubgraphApi, config))
            if (tokens.length) {
                lastRecordId = tokens[tokens.length - 1].tokenId
            }
            allTokens.push(...tokens)
        } while (tokens.length === PAGE_SIZE)

        return allTokens.reverse()
    }

    // Gets winning token
    async getVoteWinner() {
        let tokenId = 0
        let votes = 0
        let galleryVotes = 0

        const config = {
            method: "post",
            data: JSON.stringify({
                query: `
                        {
                        tokens(
                            where: {hasViolation: false, totalVotes_gt: 0}
                            orderBy: totalVotes
                            orderDirection: desc
                        ) {
                            tokenId
                            uri
                            imageId
                            totalVotes
                        }
                        }`
            })
        }

        const { tokens } = await Subgraphs.request(this.tazArtworkSubgraphApi, config)
        if (tokens.length) {
            tokenId = tokens[0].tokenId
            votes = tokens[0].url
            votes = tokens[0].totalVotes
            galleryVotes = tokens.reduce(
                (previousValue, currentValue) => previousValue + parseInt(currentValue.totalVotes, 10),
                0
            )
        }

        return { tokenId, votes, galleryVotes }
    }

    // Gets the specified non-violating message. Returns null if not found.
    async getMessage(messageId) {
        const config = {
            method: "post",
            data: JSON.stringify({
                query: `
                    {
                    message (id: "${messageId}")
                    {
                        messageId
                        parentMessageId
                        messageContent
                    }
                    }
                    `
            })
        }

        const { message } = await Subgraphs.request(this.tazMessageSubgraphApi, config)

        return message
    }

    // Gets all non-violating messages. A parentMessageId = 0 will return questions.
    async getMessages(parentMessageId, itemsPerFetch, skip) {
        const config = {
            method: "post",
            data: JSON.stringify({
                query: `
                    {
                    messages(
                        where: {parentMessageId: ${parentMessageId}, hasViolation: false}
                        orderBy: messageId
                        orderDirection: desc
                        first: ${itemsPerFetch}
                        skip: ${skip}
                    ) {
                        messageId
                        parentMessageId
                        messageContent
                    }
                    }`
            })
        }

        const { messages } = await Subgraphs.request(this.tazMessageSubgraphApi, config)

        console.log(
            `SUBGRAPHS | getMessages | parentMessageId: ${parentMessageId}, itemsPerFetch: ${itemsPerFetch}, skip: ${skip}, messages.length: ${messages.length}`
        )

        return messages
    }
}

module.exports = {
    Subgraphs
}
