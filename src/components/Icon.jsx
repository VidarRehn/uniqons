import { useState, useEffect, useContext } from "react"
import AppContext from '../context/AppContext'
import styled from "styled-components"
import parse from 'html-react-parser'
import ClipBoard from "../assets/Clipboard"
import ReactIcon from "../assets/ReactIcon"
import { ActionButton, SectionContainer } from "../styles/styled-components"

const Icon = ({code, prompt}) => {

    const {reactString, setReactString} = useContext(AppContext)
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

    const copySvg = () => {
        let element = document.querySelector('.generated-icon').innerHTML
        navigator.clipboard.writeText(element)
    }

    const copyReactComponent = () => {
        const element = document.querySelector('.generated-icon').innerHTML
        let arrayElement = element.split(' ')
        const openingSeq = `const ${prompt.charAt(0).toUpperCase() + prompt.slice(1)}Icon = ({size,color}) =>\n{ return (`
        const endSeq = `)\n}\n export default ${prompt.charAt(0).toUpperCase() + prompt.slice(1)}Icon`
        let amendedArray = arrayElement.map(string => {
            if (string.includes('xmlns')){
                return ''
            } else if(string.includes('width')) {
                return 'width={size}'
            } else if(string.includes('height')) {
                return 'height={size}'
            } else if(string.includes('fill=')) {
                return 'fill={color}'
            } else if(string.includes('fill-rule')) {
                return 'fillRule=\"evenodd\"></path>\n</svg>'
            } else return string
        })
        amendedArray.unshift(openingSeq)
        amendedArray.push(endSeq)
        let newCodeString = amendedArray.join(' ')
        setReactString(newCodeString)
        navigator.clipboard.writeText(reactString)
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
                    <ActionButton primary onClick={() => {copySvg()}}>
                        <ClipBoard size={18} />
                        <span>Copy SVG</span>
                    </ActionButton>
                    <ActionButton onClick={() => copyReactComponent()}>
                        <ReactIcon size={18} />
                        <span>Copy React component</span>
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