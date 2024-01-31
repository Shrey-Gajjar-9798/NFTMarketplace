const moralis = require("moralis");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 7000;
const cors = require('cors');
const { NFTStorage, File, Blob } = require('nft.storage')
const multer = require('multer');
const { type } = require('os');
const contract = require("./routes/contract.js");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImY0YmRiMmU0LTkxNjQtNGJjYS1hOTk1LWFmMjRkN2UyYzk3NiIsIm9yZ0lkIjoiMzcxMjg3IiwidXNlcklkIjoiMzgxNTc3IiwidHlwZUlkIjoiNWE1OTFkNjQtMjBiNC00NDAxLWFhNzUtNjY5OGNmOTAzMDA1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDQ2OTUxNTUsImV4cCI6NDg2MDQ1NTE1NX0.HwZXzzXa1CjcY5M1aZlinVUUnRfouIl2n87qZigy168"

// Define a sample endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello, this is your Express API!' });
});

// Start the server
app.listen(PORT, async () => {
  await moralis.default.start({
    apiKey: apikey
  });
  console.log("Moralis started successfully :)")
  console.log(`Server is running on http://localhost:${PORT}`);
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//api to upload the File to NFT storage.
app.post('/upload', upload.single('file'), async (req, res) => {
  const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA0NTM5RDliYzc5MEVhOWIwOTcwNEExN2YzQjcwNTNmN0Q2NWVCNjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMzU4OTU4NTc3OCwibmFtZSI6IlNocmV5In0.CK82xmEwDXOXSuR_pYa5nL83E0OSB0yC8DifW8llzjA'
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    // Access the file details
    const { originalname, buffer } = req.file;

    // Create a Blob from the buffer
    const fileBlob = new Blob([buffer], { type: req.file.mimetype });
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    // Call nftstorage.storeBlob to upload the file as a Blob to NFT.Storage
    const cid = await nftstorage.storeBlob(fileBlob, {
      name: originalname,
    });

    // You can save the CID or perform additional actions here
    const link = "https://" + cid + ".ipfs.nftstorage.link"

    // res.json({ success: true, fileName: originalname, fileSize: buffer.length, "message": cid, "ipfs_url": link });

    res.json({ success: true, fileName: originalname, fileSize: buffer.length, "image_CID": cid, "img_ipfs_link": link });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


//api to create nft and metadata using image, name description, and title.......
app.post("/rawnft", upload.single('file'), async (req, res) => {
  const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA0NTM5RDliYzc5MEVhOWIwOTcwNEExN2YzQjcwNTNmN0Q2NWVCNjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMzU4OTU4NTc3OCwibmFtZSI6IlNocmV5In0.CK82xmEwDXOXSuR_pYa5nL83E0OSB0yC8DifW8llzjA'
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    // Access the file details
    const { originalname, buffer } = req.file;

    // Create a Blob from the buffer
    const fileBlob = new Blob([buffer], { type: req.file.mimetype });
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    // Call nftstorage.storeBlob to upload the file as a Blob to NFT.Storage
    const cid = await nftstorage.storeBlob(fileBlob, {
      name: originalname,
    });

    // You can save the CID or perform additional actions here
    const link = "https://" + cid + ".ipfs.nftstorage.link"
    const name = req.body.name
    const description = req.body.description;
    const title = req.body.title
    const metadata = {
      "title": title,
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": name
        },
        "description": {
          "type": "string",
          "description": description
        },
        "image": {
          "type": "string",
          "description": link
        }
      }
    }
    var dictstring = JSON.stringify(metadata);
    var fs = require('fs');
    fs.writeFile(`${name}.json`, dictstring, function (err, result) {
      if (err) console.log('error', err);
    });

    try {
      const content = await fs.promises.readFile(`./${name}.json`)
      const fileBlobmeta = new Blob([content.buffer], { type: "application/json" });
      var metadatacid = await nftstorage.storeBlob(fileBlobmeta, {
        name: name,
      });
    } catch (error) {
      res.statusCode(500).json({
        "error": "while reading the metadata file",
        "message": error
      })
    }

    res.json({ success: true, fileName: originalname, fileSize: buffer.length, "image_CID": cid, "img_ipfs_link": link, "metadatacid": metadatacid });

  }
  catch (error) {
    res.status(500).json({
      "error": "We face error in nft creation !",
      "message": error
    })
  }
});


app.post("/getnfts", async (req, res) => {
  
  try {
    
    const address = req.body.address
    console.log("address: ",address);
    const response = await moralis.default.EvmApi.nft.getWalletNFTs({
      "chain": "0xaa36a7",
      "format": "decimal",
      "mediaItems": false,
      "address": address
    });

    console.log(response.raw);
    res.json({"reponse": response.raw})
  } 
  catch (e) {
    console.error(e);
  }
})



app.use('/contract',contract)
//--------------api for getting the user listed NFTs.---------------------------
