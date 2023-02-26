import styled from "styled-components"
import axios from "axios"
import { useState } from "react"
import { apiKey } from "../config/openAi"

const ImageGenerator = () => {
    
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState();
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            model: 'image-alpha-001',
            // prompt: prompt,
            size: '512x512',
            response_format: 'url',
            image: image
        }
        const headers = {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
        };
        // const response = await axios.post('https://api.openai.com/v1/images/generations', data, { headers: headers });
        const response = await axios.post('https://api.openai.com/v1/images/variations', data, { headers: headers });
        console.log(response)
        setImageUrl(response.data.data[0].url);
    }

    const handleImageChange = async (e) => {
        setImage(e.target.files[0])
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Prompt:
                    <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
                </label>
                <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <button type="submit">Generate Image</button>
            </form>
            {imageUrl && (
            <img src={imageUrl} alt="Generated image" />
            )}
        </div>
    )
}

export default ImageGenerator