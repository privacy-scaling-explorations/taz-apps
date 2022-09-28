import faunadb from 'faunadb'

export async function fetchWalletIndex() {
  const secret = process.env.FAUNA_SECRET_KEY
  const client = new faunadb.Client({ secret })
  const { query } = faunadb

  const dbs = await client.query(
    query.Map(
      query.Paginate(query.Match(query.Index('current_index')), {
        size: 10000
      }),
      query.Lambda('walletRef', query.Get(query.Var('walletRef')))
    )
  )

  const { currentIndex } = dbs.data[0].data

  let nextIndex

  if (currentIndex < 16) {
    nextIndex = currentIndex + 1
  } else {
    nextIndex = 0
  }

  await client.query(
    query.Update(query.Ref(dbs.data[0].ref), {
      data: {
        currentIndex: nextIndex
      }
    })
  )

  return currentIndex
}

export async function fetchNonce(address) {
  const secret = process.env.FAUNA_SECRET_KEY
  const client = new faunadb.Client({ secret })
  const { query } = faunadb

  const dbs = await client.query(
    query.Map(
      query.Paginate(query.Match(query.Index('all_wallets')), {
        size: 10000
      }),
      query.Lambda('walletRef', query.Get(query.Var('walletRef')))
    )
  )

  const match = dbs.data.filter((wallet) => wallet.data.address === address)[0]

  const { nonce } = match.data
  const updatedNonce = nonce + 1

  await client.query(
    query.Update(query.Ref(match.ref), {
      data: {
        nonce: updatedNonce
      }
    })
  )

  return nonce
}

export async function retry(fn, maxAttempts) {
  const execute = async (attempt) => {
    try {
      return await fn()
    } catch (err) {
      if (attempt <= maxAttempts) {
        const nextAttempt = attempt + 1
        console.error(`Retrying transaction due to:`, err)
        return execute(nextAttempt)
      }
      throw err
    }
  }
  return execute(1)
}
