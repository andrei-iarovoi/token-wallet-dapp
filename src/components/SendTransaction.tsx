import { useState } from "react";
import { parseEther } from "viem";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

export function SendTransaction() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const {
    data: hash,
    sendTransaction,
    isPending,
    error,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSend = () => {
    if (!to || !amount) return;

    sendTransaction({
      to,
      value: parseEther(amount),
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
        placeholder="Amount (ETH)"
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
        {isPending ? "Sending..." : "Send"}
      </button>

      {hash && <p className="break-text">Tx Hash: {hash}</p>}
      {isConfirming && <p>Waiting for confirmation...</p>}
      {isSuccess && <p>Transaction confirmed ✅</p>}
      {error && (
        <p className="break-text" style={{ color: "#f87171" }}>
          Error: {error.message}
        </p>
      )}
    </div>
  );
}
