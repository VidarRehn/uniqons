import styled, {css} from "styled-components"
import axios from "axios"
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import { useEffect, useState } from "react"
import { Potrace } from "potrace"
import { apiKey } from "../config/openAi"
import Icon from './Icon'
import CodeContainer from "./CodeContainer"
import Pen from "../assets/Pen"
import TracePen from "../assets/TracePen"
import StackedImages from "../assets/StackedImages"

const ImageGenerator = () => {
    
    const {setLoader} = useContext(AppContext)
    const [inputPrompt, setInputPrompt] = useState()
    const [imageUrl, setImageUrl] = useState();
    const [svgCreated, setSvgCreated] = useState(false)
    const [error, setError] = useState()
    const [chosenImage, setChosenImage] = useState()
    const [codeString, setCodeString] = useState()
    const [amendedCodeString, setAmendedCodeString] = useState()
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

    // useEffect(() => {
    //     if (codeString) {
    //         let array = codeString.split(' ')
    //         let fill = array.map(string => {
    //             if (string.includes('fill') && string.includes('black')){
    //                 return 'fill={color}'
    //             } else if (string.includes('width')) {
    //                 return ''
    //             } else if (string.includes('height')) {
    //                 return 'height={size}'
    //             } else return string
    //         })
    //         let amendedString = fill.join(' ')
    //         setAmendedCodeString(amendedString)
    //     }
    // }, [codeString])

    const generateImage = async (e) => {
        e.preventDefault()
        setError(null)
        setImageUrl(null)
        setCodeString(null)
        let prompt = `single icon of ${inputPrompt} in black on white background`
        setLoader(true)
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

    const traceSvg = async (image) => {
        trace.loadImage(image, () => {
            svg = trace.getSVG()
            setCodeString(svg)
            setSvgCreated(true)
        })
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

            {imageUrl && (
            <>    
            <ImagesContainer>
            {imageUrl && imageUrl.map((img, i) => (
                <ImageAndCheckbox htmlFor={`image-${i}`} key={i}>
                    <img src={img.url} />
                    <input id={`image-${i}`} type="radio" name="chosen-image" onChange={(e) => setChosenImage(e.target.previousSibling.src)} />
                </ImageAndCheckbox>
            ))}
            </ImagesContainer>

            {error && <p>{error}</p>}

            <ActionsContainer>
                <p>Click on an image above that you like then:</p>
                <Button primary disabled={!chosenImage} onClick={() => traceSvg(chosenImage)}>
                    <TracePen size={18} color={'white'} />
                    <span>Trace SVG</span>
                </Button>
                <Button disabled={!chosenImage}>
                    <StackedImages size={24} color={'black'} />
                    <span>Get variations</span>
                </Button>
            </ActionsContainer>
            </>
            )}

            {codeString && (
            <Icon code={codeString} prompt={inputPrompt}/>
            )}

            {/* {svgCreated && (
            <div>
                <CodeContainer code={codeString} />
            </div>
            )} */}

        </Container>
    )
}

const Container = styled.section`
    width: 528px;
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
    background-color: #ebebeb;
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
    background-color: black;
    border-radius: 0px 8px 8px 0px;

    svg {
        transform: rotate(45deg);
    }
`
const ImagesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
const ImageAndCheckbox = styled.label`
    height: 120px;
    width: 120px;
    position: relative;

    img {
        height: 100%;
        width: 100%;
    }

    input {
        position: absolute;
        width: 16px;
        height: 16px;
        right: 16px;
        top: 16px;
    }
`
const ActionsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
`
const Button = styled.button`
    height: 40px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    border-radius: 8px;
    white-space: nowrap;
    background-color: transparent;

    ${props => props.primary && css`
        background: black;
        color: white;
    `}
`

export default ImageGenerator