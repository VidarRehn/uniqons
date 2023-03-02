import { createPortal } from "react-dom"
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import styled, {keyframes} from "styled-components"
import {colors} from '../styles/partials'

const Loader = () => {

    const {loader} = useContext(AppContext)

    if (!loader) return null

    return createPortal (
        <Overlay>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
            <Dot />
        </Overlay>,
        document.getElementById('loader')
    )
}

const animation = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-60px); }
    100% { transform: translateY(0px); }
`

const Overlay = styled.div`
    z-index: 10;
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    gap: 8px;
    align-items: center;
`
const Dot = styled.span`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${colors.mainAction};
    animation-name: ${animation};
    animation-duration: 2s;
    animation-iteration-count: infinite;

    &:nth-of-type(1) {
        animation-delay:0.2s;
    }
    &:nth-of-type(2) {
        animation-delay:0.4s;
    }
    &:nth-of-type(3) {
        animation-delay:0.6s;
    }
    &:nth-of-type(4) {
        animation-delay:0.8s;
    }
    &:nth-of-type(5) {
        animation-delay:1s;
    }
`


export default Loader