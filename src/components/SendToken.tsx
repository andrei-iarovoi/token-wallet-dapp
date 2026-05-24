import { useState } from "react";
import { parseUnits } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { tokenAbi, tokenAddress } from "../web3/contracts";
import { useAccount } from "wagmi";
import { sepolia } from "wagmi/chains";

export function SendToken() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const { address } = useAccount();
  const { writeContract, data, isPending, error } = useWriteContract();
  const hash = data;

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSend = () => {
    if (!to || !amount) return;

    writeContract({
      address: tokenAddress,
      abi: tokenAbi,
      functionName: "transfer",
      args: [
        to as `0x${string}`,
        parseUnits(amount, 6), // USDC = 6 decimals
      ],
      account: address,
      chain: sepolia,
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #334155",
          background: "#0f172a",
          color: "white",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
      />

      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #334155",
          background: "#0f172a",
          color: "white",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleSend}
        disabled={!to || !amount || isPending}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: isPending ? "#475569" : "#3b82f6",
          color: "white",
          cursor: "pointer",
        }}
      >
        {isPending ? "Sending..." : "Send Token"}
      </button>

      {hash && (
        <a
          href={`https://sepolia.etherscan.io/tx/${hash}`}
          target="_blank"
          style={{
            color: "#3b82f6",
            fontSize: "12px",
            display: "block",
            marginTop: "5px",
          }}
        >
          View on Etherscan
        </a>
      )}
      {isConfirming && <p>Confirming...</p>}
      {isSuccess && <p>Transaction successful ✅</p>}
      {error && (
        <p style={{ color: "#ef4444", fontSize: "14px" }}>
          Invalid address or transaction failed
        </p>
      )}
    </div>
  );
}
