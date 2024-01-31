import React, { useEffect, useState } from 'react'
import "../styles/Listing.css"
import { ethers } from 'ethers'
import { useEthers } from '@usedapp/core'
import Header from '../components/Header'
import axios from 'axios';
import abi from '../Smartcontract/Marketplace.json';
import UserNfts from '../components/UserNfts'

const Listing = () => {

    const { library, account } = useEthers()
    const [address, setaddress] = useState("No Signer")
    const [contract, setcontract] = useState()
    const [response, setresponse] = useState()

    async function showsigner() {
        const sign = await library.getSigner();
        const signaddress = await sign.getAddress();
        setaddress(signaddress)
        console.log("signer:", sign);
        const cont = new ethers.Contract("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", abi, sign);
        console.log("Contract> ", cont);
        setcontract(cont)
    }

    function createnftcard() {
        const metadata = JSON.parse(response[2].metadata).image;
        const collectionname = JSON.parse(response[2].metadata).name
        console.log(collectionname);
        console.log("response2 :>", metadata);
    }


    const usernfts = async () => {
        let data = {
            "address": account
        };

        const info = await axios.post("http://localhost:7000/getnfts", data)
            .then(response => {
                console.log('Response:', response.data);
                return response.data
            })
            .catch(error => {
                console.error('Error:', error.message);
            });

        console.log("result : ", info);
        setresponse(info?.reponse?.result);
    }


    return (
        <div className='list'>
            <Header />
            <div className='UserPage'> 
            <label className='bigtitle'>"Explore Your NFT Portfolio"
            </label>
            <label className='subpagetitle'>Manage Your NFTs Here</label>
            <button className='userbtn' onClick={() => usernfts()}>My-NFTs</button>
            </div>
            <div className='grid'>
                {response != undefined && response.length != 0 ?
                    (<div className='grid-container'>
                        {response.map((item, id) => {
                        return (<UserNfts
                            name={response[id]?.name}
                            collection={response != null && response[id].metadata != null ? JSON.parse(response[id].metadata).name : ""}
                            address={response[id].token_address}
                            image={response != null ? JSON.parse(response[id].metadata).image : "https://images.unsplash.com/photo-1704461539031-e7c2145e5fc4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        />)
                    })}
                    </div>)
                    : ( <h1>No Nfts Found</h1>)
                }
                 
            </div>
        </div>
    )
}

export default Listing