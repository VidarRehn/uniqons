import styled from "styled-components"
import axios from "axios"
import { useContext, useState } from 'react'
import AppContext from '../context/AppContext'
import { apiKey } from "../config/openAi"
import Icon from './Icon'
import Pen from "../assets/Pen"
import GeneratedImages from "./GeneratedImages"
import { colors } from "../styles/partials"

const ImageGenerator = () => {
    
    const {setLoader, error, setError, initialSvgString, setInitialSvgString} = useContext(AppContext)
    const [inputPrompt, setInputPrompt] = useState()
    const [imageUrl, setImageUrl] = useState();

    const generateImage = async (e) => {
        e.preventDefault()
        setError(null)
        setImageUrl(null)
        setInitialSvgString(false)
        setLoader(true)

        let prompt = `single icon of ${inputPrompt} in black on white background`

        const data = {
            model: 'image-alpha-001',
            prompt: prompt,
            n: 4,
            size: '256x256',
            response_format: 'url',
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
        await axios.post('https://api.openai.com/v1/images/generations', data, { headers: headers })
        .then(res => {
            setImageUrl(res.data.data)
        })
        .catch(err => {
            setError(err.response.data.error.message)
        })
        setLoader(false)
        e.target.reset()
    }

    return (
        <Container>
            <Form onSubmit={(e) => generateImage(e)}>
                <label htmlFor="prompt-input">Prompt</label>
                <PromptInput type="text" onChange={(e) => setInputPrompt(e.target.value)} placeholder="What do you want your icon to portray?" id="prompt-input" />
                <DrawButton type="submit">
                    <Pen size={20} color={'white'} />
                    <span>Draw</span>
                </DrawButton>
            </Form>

            {error && <p>{error}</p>}

            {imageUrl && (  
            <GeneratedImages 
                imagesArray={imageUrl}
                setImageUrl={setImageUrl}
            />
            )}

            {initialSvgString && (
            <Icon code={initialSvgString} prompt={inputPrompt}/>
            )}

        </Container>
    )
}

const Container = styled.main`
    width: 560px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`
const Form = styled.form`
    width: 100%;
    display: flex;
    align-items: center;

    label {
        display: none;
    }
`
const PromptInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 8px 16px;
    border: none;
    background-color: ${colors.lightBackground};
    border-radius: 8px 0px 0px 8px;

    &::placeholder {
        opacity: .7;
    }
`
const DrawButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    height: 40px;
    padding: 8px 16px;
    border: none;
    color: white;
    background-color: ${colors.mainAction};
    border-radius: 0px 8px 8px 0px;

    &:hover {
        background-color: ${colors.mainActionHover};
        border-color: ${colors.mainActionHover};
    }

    svg {
        transform: rotate(45deg);
    }
`
export default ImageGenerator