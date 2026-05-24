import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

export function Balance() {
  const { address, isConnected } = useAccount();

  const { data, isLoading, isError } = useBalance({
    address: address,
  });

  if (!isConnected) {
    return <p>Connect wallet first</p>;
  }

  if (isLoading) {
    return <p>Loading balance...</p>;
  }

  if (isError) {
    return <p>Error loading balance</p>;
  }

  return (
    <div>
      <p>
        Balance: {data ? formatEther(data.value) : "0"} {data?.symbol}
      </p>
    </div>
  );
}
