import { ConnectWallet } from "./components/ConnectWallet";
import { SendTransaction } from "./components/SendTransaction";
import { TokenBalance } from "./components/TokenBalance";
import { SendToken } from "./components/SendToken";
import { Balance } from "./components/Balance";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          padding: "24px",
          borderRadius: "16px",
          width: "420px",
          background: "#1e293b",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Token Wallet dApp</h2>

        <h3 style={{ marginBottom: "10px" }}>Wallet</h3>
        <div style={{ marginBottom: "20px" }}>
          <ConnectWallet />
          <Balance />
        </div>

        <h3 style={{ marginBottom: "10px" }}>Token</h3>
        <div style={{ marginBottom: "20px" }}>
          <TokenBalance />
        </div>

        <h3 style={{ marginBottom: "10px" }}>Send ETH</h3>
        <div style={{ marginBottom: "20px" }}>
          <SendTransaction />
        </div>

        <h3 style={{ marginBottom: "10px" }}>Send Token</h3>
        <div style={{ marginBottom: "20px" }}>
          <SendToken />
        </div>
      </div>
    </div>
  );
}

export default App;
