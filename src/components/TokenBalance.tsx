import { useAccount, useReadContract } from 'wagmi'
import { formatUnits } from 'viem'
import { tokenAbi, tokenAddress } from '../web3/contracts'

export function TokenBalance() {
  const { address, isConnected } = useAccount()

  const { data: balance } = useReadContract({
  address: tokenAddress,
  abi: tokenAbi,
  functionName: 'balanceOf',
  args: [address!],
  query: {
    enabled: !!address,
  },
}) as { data: bigint | undefined }

const { data: decimals } = useReadContract({
  address: tokenAddress,
  abi: tokenAbi,
  functionName: 'decimals',
}) as { data: number | undefined }

const { data: symbol } = useReadContract({
  address: tokenAddress,
  abi: tokenAbi,
  functionName: 'symbol',
}) as { data: string | undefined }

  if (!isConnected) {
    return <p>Connect wallet first</p>
  }

  if (!balance || !decimals) {
    return <p>Loading token balance...</p>
  }

  return (
    <div>
      <p>
        Token Balance: {formatUnits(balance, decimals)} {symbol}
      </p>
    </div>
  )
}