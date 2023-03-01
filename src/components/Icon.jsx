import { useState, useEffect } from "react"
import styled from "styled-components"
import parse from 'html-react-parser'
import ClipBoard from "../assets/Clipboard"
import ReactIcon from "../assets/ReactIcon"
import { ActionButton, SectionContainer } from "../styles/styled-components"

const Icon = ({code}) => {

    const [color, setColor] = useState('black')
    const [componentDidMount, setComponentDidMount] = useState(false)
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
                domNode.attribs.width = 120
                domNode.attribs.height = 120
                domNode.attribs.viewBox = viewBox
            } else if (domNode.name === 'path'){
                domNode.attribs.fill = color
            }
        },
    }

    const copyToClipboard = () => {
        let element = document.querySelector('.generated-icon').innerHTML
        navigator.clipboard.writeText(element)
    }

    return (
        <SectionContainer>
            <InnerContainer>
                <SvgIconContainer>
                    <div className="generated-icon">{parse(code, attributeOptions)}</div>
                    <InputAndLabel>
                        <label htmlFor="color-input">See in another color</label>
                        <input onChange={(e) => setColor(e.target.value)} type="color" id="color-input" />
                    </InputAndLabel>
                </SvgIconContainer>
                <ActionButtons>
                    <ActionButton primary onClick={() => {copyToClipboard()}}>
                        <ClipBoard size={18} />
                        <span>Copy SVG</span>
                    </ActionButton>
                    <ActionButton>
                        <ReactIcon size={18} />
                        <span>Copy React comp.</span>
                    </ActionButton>
                </ActionButtons>
            </InnerContainer>
        </SectionContainer>
    )
}

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 24px;
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

export default Icon