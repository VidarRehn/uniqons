import styled from "styled-components"

const Header = () => {

    return (
        <div>
        <Title>uniqons</Title>
        <Subtitle>create unique SVG-icons for your website</Subtitle>
        </div>
    )
}

const Title = styled.h1`
    font-size: 56px;
    text-align: center;
`
const Subtitle = styled.p`
    font-size: 16px;
    text-align: center;
    margin-top: 8px;
    color: #595959;
`

export default Header