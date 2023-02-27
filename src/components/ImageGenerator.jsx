import axios from "axios"
import { useEffect, useState } from "react"
import { apiKey } from "../config/openAi"

const ImageGenerator = () => {
    
    const [prompt, setPrompt] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [croppedImage, setCroppedImage] = useState()

    useEffect(() => {
        if (imageUrl){
            removeBackground(imageUrl[0].url)
        }
    }, [imageUrl])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            model: 'image-alpha-001',
            prompt: prompt,
            size: '256x256',
            response_format: 'url',
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
        const response = await axios.post('https://api.openai.com/v1/images/generations', data, { headers: headers });
        setImageUrl(response.data.data)
    }

    const returnActualPrompt = (inputPrompt) => {
        setPrompt(`a single icon of ${inputPrompt} in black on white background. Minimalistic, flat, and geometric vector art.`)
    }

    const removeBackground = async (imgUrl) => {
        const form = new FormData();
        form.append("image_url", imgUrl);
        form.append("size", "auto");

        axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: form,
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-Api-Key': process.env.REACT_APP_REMOVEBG_API_KEY,
            },
            encoding: null
          })
          .then((response) => {
            let arrayBuffer = response.data
            const blob = new Blob([arrayBuffer])
            const srcBlob = URL.createObjectURL(blob);
            setCroppedImage(srcBlob)
          })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Prompt:
                    <input type="text" onChange={e => returnActualPrompt(e.target.value)} />
                </label>
                <button type="submit">Generate Image</button>
            </form>
            <div className="autogenerated">
                {imageUrl && (
                    <>
                    <span>Autogenerated PNG</span>
                    <img src={imageUrl[0].url} />
                    </>
                )}
            </div>
            <div className="cropped">
                {croppedImage && (
                    <>
                    <span>PNG image with no background</span>
                    <img src={croppedImage}/>
                    </>
                )}
            </div>
        </div>
    )
}

export default ImageGenerator