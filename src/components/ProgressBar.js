import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 4px;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.19);
    background-color: white;
`;

const Line = styled.span`
    display: block;
    height: 100%;
    width: ${ props => `${props.progress}%` };
    background-color: #D3D3D3;
    position: relative;
    overflow: hidden;
    transition-duration: 1.5s;
`;

export const ProgressBar = (props) => (
    <Wrapper>
        <Line progress={props.progress}></Line>
    </Wrapper>
)

