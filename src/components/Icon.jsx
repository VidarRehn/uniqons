import { useState, useEffect } from "react"
import styled, {css} from "styled-components"
import parse from 'html-react-parser'
import ClipBoard from "../assets/Clipboard"
import ReactIcon from "../assets/ReactIcon"

const Icon = ({code, prompt}) => {

    const [color, setColor] = useState('black')
    const [size, setSize] = useState(120)
    const [componentDidMount, setComponentDidMount] = useState(false)
    const [aspectRatio, setAspectRatio] = useState()
    const [viewBox, setViewBox] = useState('0 0 256 256')

    useEffect(() => {
        setComponentDidMount(true)
    }, [])
    
    useEffect(() => {
        if (componentDidMount){
            let svg = document.querySelector('.generated-icon').firstChild
            var bbox = svg.getBBox();
            var viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ");
            setViewBox(viewBox)
        }
    })
    
    const attributeOptions = {
        replace: domNode => {
            if (domNode.name === 'svg'){
                domNode.attribs.width = size
                domNode.attribs.height = size
                domNode.attribs.viewBox = viewBox
            } else if (domNode.name === 'path'){
                domNode.attribs.fill = color
            }
        },
    }

    const copyToClipboard = () => {
        let element = document.querySelector('.generated-icon').innerHTML
        console.log(element)
        navigator.clipboard.writeText(element)
    }

    return (
        <Container>
            <InnerContainer>
                <SvgIconContainer>
                    <div className="generated-icon">{parse(code, attributeOptions)}</div>
                    <InputAndLabel>
                        <label htmlFor="color-input">See in another color</label>
                        <input onChange={(e) => setColor(e.target.value)} type="color" id="color-input" />
                    </InputAndLabel>
                </SvgIconContainer>
                <ActionButtons>
                    <Button primary onClick={() => {copyToClipboard()}}>
                        <ClipBoard size={18} color={'white'} />
                        <span>Copy SVG</span>
                    </Button>
                    <Button>
                        <ReactIcon size={18} color={'black'} />
                        <span>Copy React comp.</span>
                    </Button>
                </ActionButtons>
            </InnerContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    padding: 16px;
    border-radius: 12px;
    gap: 24px;
`
const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 48px;
`
const InputAndLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`
const SvgIconContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
`
const ActionButtons = styled.div`
    align-self: flex-end;
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


export default Icon