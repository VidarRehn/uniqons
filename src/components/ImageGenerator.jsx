import styled from "styled-components"
import axios from "axios"
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import { useEffect, useState } from "react"
import { Potrace } from "potrace"
import { apiKey } from "../config/openAi"
import CodeContainer from "./CodeContainer"

const ImageGenerator = () => {
    
    const {setLoader} = useContext(AppContext)
    const [prompt, setPrompt] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [svgCreated, setSvgCreated] = useState(false)
    const [chosenImage, setChosenImage] = useState()
    const [codeString, setCodeString] = useState()
    const container = document.querySelector('.svg')
    let svg

    const trace = new Potrace()

    useEffect(() => {
        if (chosenImage) {
            trace.loadImage(chosenImage, () => {
                svg = trace.getSVG()
                setCodeString(svg)
                container.innerHTML = svg
                setSvgCreated(true)
            })
        }        
    }, [imageUrl])

    const generateImage = async (e) => {
        e.preventDefault()
        setLoader(true)
        const data = {
            model: 'image-alpha-001',
            prompt: prompt,
            n: 3,
            size: '256x256',
            response_format: 'url',
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
        const response = await axios.post('https://api.openai.com/v1/images/generations', data, { headers: headers });
        setImageUrl(response.data.data)
        setLoader(false)
    }

    const returnActualPrompt = (inputPrompt) => {
        setPrompt(`a single icon of ${inputPrompt} in black on white background, centered in middle. Minimalistic, flat geometric vector art.`)
    }

    const traceSvg = async (image) => {
        trace.loadImage(image, () => {
            svg = trace.getSVG()
            setCodeString(svg)
            container.innerHTML = svg
            setSvgCreated(true)
        })
    }

    return (
        <Container>
            <Form onSubmit={(e) => generateImage(e)}>
                <label htmlFor="prompt-input">Prompt</label>
                <input type="text" onChange={(e) => returnActualPrompt(e.target.value)} placeholder="Write you short prompt here" id="prompt-input" />
                <button type="submit">Generate Image</button>
            </Form>
            {imageUrl && (
            <>    
            <ImagesContainer>
                {imageUrl && imageUrl.map((img, i) => (
                    <label htmlFor={`image-${i}`} key={i} className="image-and-checkbox">
                        <img src={img.url} />
                        <input id={`image-${i}`} type="radio" name="chosen-image" onChange={(e) => setChosenImage(e.target.previousSibling.src)} />
                    </label>
                ))}
            </ImagesContainer>
            <button disabled={!chosenImage} onClick={() => traceSvg(chosenImage)}>Create SVG</button>
            </>
            )}
            <div className="svg"></div>
            {svgCreated && (
            <div className="code-container">
                <CodeContainer code={codeString} />
            </div>
            )}
        </Container>
    )
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    label {
        display: none;
    }

    input, button {
        width: 260px;
        padding: 8px 16px;
    }
`
const ImagesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

export default ImageGenerator