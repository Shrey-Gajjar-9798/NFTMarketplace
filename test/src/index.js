import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import { DAppProvider, Localhost,Sepolia } from '@usedapp/core'
//dapp
import NFTDetail from "./pages/NFTDetail";
import Listing from "./pages/Listing";

// const config = {
//   readOnlyChainId: Localhost.chainId,
//   readOnlyUrls: {
//     [Localhost.chainId]: 'http://127.0.0.1:8545',
//   },
//   multicallAddresses: {
//     "31337": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
//   },
// }

const config = {
  readOnlyChainId: Sepolia.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: Sepolia.rpcUrl,
  },
}

ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<DAppProvider config={config}><Home /></DAppProvider>} />
        <Route path="/create" element={<DAppProvider config={config}><Create /></DAppProvider>} />
        <Route path="/explore" element={<DAppProvider config={config}><Explore /></DAppProvider>} />
        <Route path="/detail" element={<DAppProvider config={config}><NFTDetail /></DAppProvider>} />
        <Route path="/listing" element={<DAppProvider config={config}><Listing /></DAppProvider>} />
      </Routes>
    </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
