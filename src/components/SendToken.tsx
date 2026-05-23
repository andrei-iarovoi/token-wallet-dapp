import { useState } from 'react'
import { parseUnits } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { tokenAbi, tokenAddress } from '../web3/contracts'
import { useAccount } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export function SendToken() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')

  const { address } = useAccount()
  const { writeContract, data, isPending, error } = useWriteContract()
  const hash = data

  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleSend = () => {
    if (!to || !amount) return

    writeContract({
      address: tokenAddress,
      abi: tokenAbi,
      functionName: 'transfer',
      args: [
        to as `0x${string}`,
        parseUnits(amount, 6), // USDC = 6 decimals
      ],
      account: address,
      chain: sepolia,
    })
  }

  return (
    <div>
      <h3>Send Token</h3>

      <input
        type="text"
        placeholder="Recipient address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleSend} disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Token'}
      </button>

      {hash && <p>Tx Hash: {hash}</p>}
      {isConfirming && <p>Confirming...</p>}
      {isSuccess && <p>Transaction successful ✅</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}