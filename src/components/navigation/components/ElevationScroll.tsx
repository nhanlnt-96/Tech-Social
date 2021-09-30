import React from 'react';
import { useScrollTrigger } from '@mui/material';

export interface Props {
  children: React.ReactElement;
}

export const ElevationScroll = (props: Props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};
