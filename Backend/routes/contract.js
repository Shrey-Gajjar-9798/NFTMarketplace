const express = require('express');
const router = express.Router();
const ethers = require("ethers")
const abi = require("../Abi/marketplace.json")


// const contract = new ethers.Contract("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", abi, signer)

router.get('/', (req, res) => {
  res.send('Welcome to the contract API!');
});


//***************************  User's NFTs Listed       "DONE" ********/
router.get('/mynfts', async (req,res) => {

  const signer = req.body.signer;
  const contract = new ethers.Contract("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", abi, signer)
  console.log("Contract:",contract);
  try {
    const response = await contract.getMyListedNFTs();

    console.log(response,"reponse che");
    res.json({
      "message":"Successfull !!",
      "contract":response
    })

  } catch (error) {
    res.json({"Error":error.message})
  }
})
//***************************************************************/


module.exports = router;