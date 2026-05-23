import { ConnectWallet } from './components/ConnectWallet'
import { SendTransaction } from './components/SendTransaction'
import { TokenBalance } from './components/TokenBalance'

function App() {
  return (
    <div>
      <h1>Token Wallet dApp</h1>
      <ConnectWallet />
      <SendTransaction />
      <TokenBalance />
    </div>
  )
}

export default App  