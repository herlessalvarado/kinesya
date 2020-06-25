import React from 'react'
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Logo } from '../../assets/logo/kinesya.svg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLogo = styled(Logo)`
animation: ${rotate} infinite 2s linear;
`

export default function Loading() {
    return(
        <div style={{textAlign: "center", marginTop: "5%", marginBottom: "5%"}}>
            <StyledLogo />
        </div>
    )
}