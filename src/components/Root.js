import React from 'react';
import styled from 'styled-components'

const Body = styled.div`
    max-width: 100%;
    min-height: 200px;
    background-color: #D3D3D3;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
`

const Button = styled.button`
    width: 64px;
    align-self: flex-end;
    margin-top: 24px;
    cursor: pointer;
`

export const Root = (props) => (
    <Body>
        <p>{props.title}</p>
        {props.children}
        {!props.noButton && <Button disabled={props.disabled} onClick={props.onClick}>Дальше</Button>}
    </Body>
)