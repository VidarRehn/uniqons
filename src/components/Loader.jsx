import { createPortal } from "react-dom"
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import styled from "styled-components"

const Loader = () => {

    const {loader} = useContext(AppContext)

    if (!loader) return null

    return createPortal (
        <Overlay>
            <p>Loading....</p>
        </Overlay>,
        document.getElementById('loader')
    )
}

const Overlay = styled.div`
    z-index: 10;
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`


export default Loader