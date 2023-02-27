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
            prompt: prompt,
            n: 2,
            size: '256x256',
            response_format: 'url',
            // image: image
        }
        const headers = {
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
        };
        const response = await axios.post('https://api.openai.com/v1/images/generations', data, { headers: headers });
        // const response = await axios.post('https://api.openai.com/v1/images/variations', data, { headers: headers });
        setImageUrl(response.data.data)
        // setImageUrl(response.data.data)
    }

    const handleImageChange = async (e) => {
        setImage(e.target.files[0])
    }

    const returnActualPrompt = (inputPrompt) => {
        setPrompt(`a single icon of ${inputPrompt} in black on white background. Solid, flat, geometric and symetrical vector art. No text`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Prompt:
                    <input type="text" onChange={e => returnActualPrompt(e.target.value)} />
                </label>

                {/* image input needs to be exactly square, PNG-format and not larger than 4mb */}
                <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <button type="submit">Generate Image</button>
            </form>
            {imageUrl && imageUrl.map(img => (
            <img src={img.url} alt="Generated image" />
            ))}
        </div>
    )
}

export default ImageGenerator