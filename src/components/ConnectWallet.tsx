import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  function formatAddress(address: string) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  if (isConnected) {
    return (
      <div>
        <p
          className="copy-address"
          onClick={() => navigator.clipboard.writeText(address!)}
        >
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>

        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
}
