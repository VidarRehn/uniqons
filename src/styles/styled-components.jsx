import styled, {css} from 'styled-components'
import { colors } from './partials'

export const ActionButton = styled.button`
    position: relative;
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

    &:hover {
        background-color: ${colors.lightGrey};
    }

    svg {
        fill: ${colors.mainAction}
    }

    ${props => props.primary && css`
        background: ${colors.mainAction};
        color: white;

        &:hover {
            background-color: ${colors.mainActionHover};
            border-color: ${colors.mainActionHover};
        }

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

export const Copied = styled.div`
    position: absolute;
    top: -36px;
    right: 0;
    color: ${colors.mainAction};
    background-color: white;
    padding: 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
        fill: ${colors.mainAction}
    }
`