import { PLATFORMS, sleep, startPolling, STRATEGIES } from '../lib'

interface Message {
  type: string
  data: {
    platforms: {
      [PLATFORMS.PancakeSwap]: boolean
      [PLATFORMS.DogeBets]: boolean
    }
    strategy: STRATEGIES
  }
}

chrome.runtime.onMessage.addListener(async (message: Message) => {
  if (message.type === 'START') {
    const { privateKey, betAmount } = await chrome.storage.sync.get([
      'privateKey',
      'betAmount'
    ])

    if (message.data.platforms[PLATFORMS.PancakeSwap]) {
      startPolling(
        privateKey,
        betAmount,
        message.data.strategy,
        true,
        PLATFORMS.PancakeSwap
      ).catch()

      await sleep(3000)
    }

    if (message.data.platforms[PLATFORMS.DogeBets]) {
      startPolling(
        privateKey,
        betAmount,
        message.data.strategy,
        true,
        PLATFORMS.DogeBets
      ).catch()
      await sleep(3000)
    }
  }
})
