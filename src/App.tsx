import { ConnectWallet } from './components/ConnectWallet'
import { SendTransaction } from './components/SendTransaction'
import { TokenBalance } from './components/TokenBalance'
import { SendToken } from './components/SendToken'

function App() {
  return (
    <div>
      <h1>Token Wallet dApp</h1>
      <ConnectWallet />
      <SendTransaction />
      <TokenBalance />
      <SendToken />
    </div>
  )
}

export default App  