import {React,useState} from 'react'
import "../styles/MintingForm.css"
import axios from 'axios';

const MintingForm = () => {
    const [file, setfile] = useState()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cid, setCid] = useState("")

    async function submitNFT() {
        console.log("File", file);
        const formData = new FormData();
        formData.append('file', file);

        var response = await axios.post('http://localhost:7000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);

    }

  return (
    <div className="minting-form-container">
                <h2>Mint Your NFTs</h2>
                <form>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    ></textarea>

                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min="1"
                    />
                    <input
                        type="file"
                        id="quantity"
                        onChange={(e) => {
                            const selectedFile = e.target.value;
                            setfile(selectedFile);
                        }}
                    />

                    <button type="button" onClick={submitNFT}>
                        Mint NFTs
                    </button>
                </form>
            </div>
  )
}

export default MintingForm