import { ConnectWallet } from './components/ConnectWallet'
import { SendTransaction } from './components/SendTransaction'

function App() {
  return (
    <div>
      <h1>Token Wallet dApp</h1>
      <ConnectWallet />
      <SendTransaction />
    </div>
  )
}

export default App  