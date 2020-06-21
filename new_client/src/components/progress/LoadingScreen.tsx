import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../../assets/logo/kinesya.svg';
import styled, { keyframes } from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
    },
  }),
);

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

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <StyledLogo />
    </div>
  );
}