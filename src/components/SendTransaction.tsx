import { useState } from 'react'
import { parseEther } from 'viem'
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

export function SendTransaction() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')

  const { data: hash, sendTransaction, isPending, error } = useSendTransaction()

  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleSend = () => {
    if (!to || !amount) return

    sendTransaction({
      to,
      value: parseEther(amount),
    })
  }

  return (
    <div>
      <h3>Send ETH</h3>

      <input
        type="text"
        placeholder="Recipient address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleSend} disabled={isPending}>
        {isPending ? 'Sending...' : 'Send'}
      </button>

      {hash && <p>Tx Hash: {hash}</p>}
      {isConfirming && <p>Waiting for confirmation...</p>}
      {isSuccess && <p>Transaction confirmed ✅</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}