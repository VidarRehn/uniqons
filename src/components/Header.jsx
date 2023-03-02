import styled from "styled-components"
import { colors } from "../styles/partials"

const Header = () => {

    return (
        <div>
        <Title>uniqons</Title>
        <Subtitle>create unique AI generated SVG-icons for your website</Subtitle>
        </div>
    )
}

const Title = styled.h1`
    font-size: 56px;
    text-align: center;
    color: ${colors.mainAction};
`
const Subtitle = styled.p`
    font-size: 16px;
    text-align: center;
    margin-top: 8px;
    color: #7b7b7b;
    font-weight: bold;
`

export default Header