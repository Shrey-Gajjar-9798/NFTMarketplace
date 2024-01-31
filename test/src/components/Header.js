import react, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEthers, useEtherBalance, Localhost, Sepolia } from "@usedapp/core";
import 'font-awesome/css/font-awesome.min.css';
import Logo from '../assets/nettyfy_logo.webp';

const Header = () => {
  const location = useLocation();
  const { activateBrowserWallet, account, switchNetwork, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  const handlenetwork = () => {
    if (account) {
      if (Localhost.rpcUrl != Sepolia.rpcUrl) {
        switchNetwork(Sepolia.chainId);
      }
      else {
        deactivate()
      }
    } else {
      activateBrowserWallet()
      if (Localhost.rpcUrl != Sepolia.rpcUrl) {
        switchNetwork(Sepolia.chainId)
      }
    }
  }
  const navigate = useNavigate()
  return (
    <div id="header">
      <Link to='/' id='logo'>
        <img src={Logo} width='110' />
      </Link>
      <div id='logo'></div>
      <div id="link-containers">
        <Link to="/explore" style={{ background: location.pathname == '/explore' ? '#fff' : '',color: location.pathname == '/explore' ? 'rgb(75, 2, 108)' : '' }} >Explorer</Link>
        <Link to="/">Dark NFTs </Link>
        <Link to="/">Community</Link>
        <Link to="/create" style={{ background: location.pathname == '/create' ? '#fff' : '',color: location.pathname == '/create' ? 'rgb(75, 2, 108)' : '' }}>Craft NFT</Link>
        <button id="connect-wallet" onClick={handlenetwork} >{!account ? "Connect Wallet" : account}</button>
      </div>
      <div onClick={() => navigate("/listing")} style={{ backgroundColor: "white", cursor: "pointer", width: "90px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "30px" }}>
        <i className="fa fa-lg fa-light fa-user" style={{ color: "black" }}></i>
        <span style={{ fontFamily: "monospace", marginLeft: "5px" }}>Profile</span>
      </div>
    </div>
  );
}

export default Header;