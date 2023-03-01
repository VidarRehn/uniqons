import styled, {css} from 'styled-components'
import { colors } from './partials'

export const ActionButton = styled.button`
    height: 40px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    border-radius: 8px;
    white-space: nowrap;
    background-color: white;
    color: ${colors.mainAction};
    border: 3px solid ${colors.mainAction};

    svg {
        fill: ${colors.mainAction}
    }

    ${props => props.primary && css`
        background: ${colors.mainAction};
        color: white;

        svg {
            fill: white;
        }
    `}
`
export const SectionContainer = styled.section`
    background-color: ${colors.lightBackground};
    padding: 16px;
    border-radius: 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`