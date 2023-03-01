import styled, {css} from 'styled-components'
import axios from 'axios'
import { useState, useContext } from "react"
import AppContext from '../context/AppContext'
import { Potrace } from "potrace"
import { apiKey } from '../config/openAi'
import TracePen from "../assets/TracePen"
import StackedImages from "../assets/StackedImages"

const GeneratedImages = ({
    imagesArray,
    error,
    setError,
    setCodeString,
    setSvgCreated,
    setImageUrl
}) => {

    const {setLoader} = useContext(AppContext)
    const [chosenImage, setChosenImage] = useState()
    const trace = new Potrace()
    let svg

    const traceSvg = async (image) => {
        trace.loadImage(image, () => {
            svg = trace.getSVG()
            setCodeString(svg)
            setSvgCreated(true)
        })
    }

    const getVariations = async (e) => {
        e.preventDefault()

        let response = await fetch(chosenImage)
        let blob = await response.blob()
        let file = new File([blob], 'image.png')

        setError(null)
        setSvgCreated(false)
        setLoader(true)

        const data = {
            model: 'image-alpha-001',
            image: file,
            n: 4,
            size: '256x256',
            response_format: 'url',
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
        };
        await axios.post('https://api.openai.com/v1/images/variations', data, { headers: headers })
        .then(res => {
            setImageUrl(res.data.data)
        })
        .catch(err => {
            setError(err.response.data.error.message)
        })
        setLoader(false)

    }

    return (
        <Container>
            <ImagesContainer>
            {imagesArray.map((img, i) => (
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
                <Button disabled={!chosenImage} onClick={(e) => getVariations(e)}>
                    <StackedImages size={24} color={'black'} />
                    <span>Get variations</span>
                </Button>
            </ActionsContainer>
        </Container>
    )
}

const Container = styled.div`
    background-color: #f6f6f6;
    padding: 16px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 24px;
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
    background-color: white;

    ${props => props.primary && css`
        background: black;
        color: white;
    `}
`

export default GeneratedImages