import { React, useState, useEffect } from 'react'
import "../styles/Create.css"
import Form from 'react-bootstrap/Form';
import "../styles/MintingForm.css"
import axios from 'axios';
import { ethers } from 'ethers'
import { useEthers } from '@usedapp/core';
import abi from '../Smartcontract/nft.json';

const NFTCreate = () => {

    const { chainId, library } = useEthers()
    const [file, setfile] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [response, setresponse] = useState()

    const [ipfsname, setipfsname] = useState("")
    const [status, setstatus] = useState()
    const [cid, setcid] = useState()
    const [link, setlink] = useState("")

    const [metadata, setmetadata] = useState(false)
    const [metadataurl, setmetadataurl] = useState()

    function handlekey() {
        setmetadata(!metadata)
        setfile(null);
    }

    useEffect(() => {

        handleprovider()

    }, ["1"])


    const handleprovider = async () => {

        console.log("chainID :", chainId);
        const sign = library.getSigner();

        const contract = new ethers.Contract("0x37393A01044292592064946E5F88e0b0Ba182974", abi, sign);
        console.log("Contract> ", contract);  //traditional method

        // const wethInterface = new utils.Interface(abi) //useDapp Contract Method to get the contract
        // const CONTRACT_ADDR = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
        // const Interface = new utils.Interface(abi); // ABI is array
        // const ContractInstance = new Contract(CONTRACT_ADDR, Interface);

        // const dappcontract = new Contract('0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1', wethInterface, sign)
    }

    async function FileUpload() {
        if (!file) {
            alert("No File selected!")
        }
        else {
            console.log("File", file);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('name', title);
            formData.append('description', description)
            try {
                var response = await axios.post('http://localhost:7000/rawnft', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            } catch (error) {
                alert("Something went wrong Please check!")
            }
            setresponse(response);
            setstatus(response.status)
            setipfsname(response.data.fileName)
            setcid(response.data.image_CID)
            setlink(response.data.img_ipfs_link);
            console.log(response, "data stored successfully");
            alert("data Stored successfully");

            console.log("chainID :", chainId);
            const sign = library.getSigner();

            const contract = new ethers.Contract("0x37393A01044292592064946E5F88e0b0Ba182974", abi, sign);
            console.log("Contract> ", contract);  //traditional methodx
            const mintresponse = await contract.safeMint(`https://${response.data.metadatacid}.ipfs.nftstorage.link`);
            if (response) {
                alert("Transaction successfull! ");
            }
            console.log("Mint response", mintresponse);
        }
    }

    async function submitMetadata() {
        console.log("chainID :", chainId);
        const sign = library.getSigner();

        const contract = new ethers.Contract("0x37393A01044292592064946E5F88e0b0Ba182974", abi, sign);
        console.log("Contract> ", contract);  //traditional methodx
        const response = await contract.safeMint(metadataurl);
        if (response) {
            alert("Transaction successfull! ");
        }
        console.log("response: ", response);
    }

    return (
        <div id='createNFT'>
            {!metadata ?
                <>
                    <div className="minting-form-container" style={{marginLeft:"250px"}}>
                        <h2>Mint Your NFTs</h2>
                        <form>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                                required
                            />

                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                                required
                            ></textarea>

                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                min="1"
                                required
                            />
                            <input
                                type="file"
                                id="quantity"
                                required
                                onChange={(e) => {
                                    const selectedFile = e.target.files[0];
                                    setfile(selectedFile);
                                }}
                            />

                            <button type="button" onClick={FileUpload}>
                                Mint NFTs
                            </button>
                        </form>
                    </div>
                    {response != undefined ? (
                        <div id='nftresult'>
                            <div id='resultother'>
                                <div id='resulttitle'>IPFS Details</div>
                                <label>Status: {status}</label>
                                <label>Cid: <label className='cid'>{cid}</label></label>
                                <label>File Name: {ipfsname}</label>
                                <label>IPFS link : <label className='ipfslink'>{link}</label></label>
                            </div>
                        </div>) : <div></div>}
                </>
                :
                <div id='metadata'>
                    <label>Metadata URL </label><br></br>
                    <input id='createinput' type='text'
                        value={metadataurl}
                        onChange={(e) => setmetadataurl(e.target.value)}
                        placeholder='Metadata URL' />
                    <br></br>
                    <button type='button' id='createButton' onClick={submitMetadata}>CreateNFT</button>
                </div>}

            <div id='createRight'>
                <div className='rs-sider'>
                    <label>Do you have meta data url already?</label>

                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        onChange={handlekey}
                    />
                </div>
                <div className='metadatatxt'>
                    Then create the NFT using simple process. Wallet must be connect to mint the nFT
                </div>
                <div className='metadatatxt'>
                    Default NFT contract address on Sepolia: "0x37393A01044292592064946E5F88e0b0Ba182974"
                </div>
                <br></br>
            </div>

        </div>
    )
}

export default NFTCreate