import { useState, useEffect } from "react"
import styled, {css} from "styled-components"
import parse from 'html-react-parser'

const Icon = ({code, prompt}) => {

    const [color, setColor] = useState('black')
    const [size, setSize] = useState(150)
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

    const buttonOneOptions = {
        replace: domNode => {
            if (domNode.name === 'svg'){
                domNode.attribs.width = 30
                domNode.attribs.height = 30
                domNode.attribs.viewBox = viewBox
            } else if (domNode.name === 'path'){
                domNode.attribs.fill = color
            }
        }
    }

    const buttonTwoOptions = {
        replace: domNode => {
            if (domNode.name === 'svg'){
                domNode.attribs.width = 30
                domNode.attribs.height = 30
                domNode.attribs.viewBox = viewBox
            } else if (domNode.name === 'path'){
                domNode.attribs.fill = 'white'
            }
        }
    }

    return (
        <Container>
            <ColumnContainer>
                <div className="generated-icon">{parse(code, attributeOptions)}</div>
                <Inputs>
                    <InputAndLabel>
                        <label htmlFor="color-input">See in another color</label>
                        <input onChange={(e) => setColor(e.target.value)} type="color" id="color-input" />
                    </InputAndLabel>
                </Inputs>
            </ColumnContainer>
            <ColumnContainer>
                <p>See how your icon would look inside a button</p>
                <Button style={{border: `3px solid ${color}`, color: color}}>
                    <div>{parse(code, buttonOneOptions)}</div>
                    <span>Button</span>
                </Button>
                <Button style={{border: `3px solid ${color}`, backgroundColor: color}}>
                    <div>{parse(code, buttonTwoOptions)}</div>
                    <span>Button</span>
                </Button>
            </ColumnContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
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
    align-items: center;
    gap: 8px;
`
const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background-color: transparent;
    color: white;
    padding: 8px 16px;
    border-radius: 12px;
    cursor: auto;
    
    span {
        font-weight: bold;
    }
`
const ColumnContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
`


export default Icon