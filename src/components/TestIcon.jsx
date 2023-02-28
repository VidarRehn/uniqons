import { useState } from "react"
import styled from "styled-components"
import parse from 'html-react-parser'

const TestIcon = ({code}) => {

    const [color, setColor] = useState('black')
    const [size, setSize] = useState(150)

    const attributeOptions = {
        replace: domNode => {
            if (domNode.name === 'svg'){
                domNode.attribs.width = size
                domNode.attribs.height = size
            } else if (domNode.name === 'path'){
                domNode.attribs.fill = color
            }
        }
    }

    return (
        <Container>
            <div>{parse(code, attributeOptions)}</div>
            <Inputs>
                <InputAndLabel>
                    <label htmlFor="color-input">Change color</label>
                    <input onChange={(e) => setColor(e.target.value)} type="color" id="color-input" />
                </InputAndLabel>
                <InputAndLabel>
                    <label htmlFor="size-input">Change size (px)</label>
                    <input defaultValue={size} onChange={(e) => setSize(e.target.value)} type="number" id="size-input" />
                </InputAndLabel>      
            </Inputs>
        </Container>
    )
}

const Container = styled.section`
    display: flex;
    align-items: center;
    gap: 24px;
`
const Inputs = styled.div`
    display: flex;
    flex-direction: column;
`
const InputAndLabel = styled.div`
    display: flex;
    flex-direction: column;
`

export default TestIcon