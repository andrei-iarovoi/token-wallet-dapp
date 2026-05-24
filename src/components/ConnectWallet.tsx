import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  if (isConnected) {
    return (
      <div>
        <p
          className="copy-address"
          onClick={() => {
            navigator.clipboard.writeText(address!);
            setCopied(true);

            setTimeout(() => {
              setCopied(false);
            }, 1500);
          }}
        >
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        {copied && (
          <span style={{ fontSize: "12px", color: "#22c55e" }}>Copied!</span>
        )}
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
