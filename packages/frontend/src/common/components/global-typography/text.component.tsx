import { Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react';

type TColorVariants = 'primary' | 'secondary' | 'inverted' | string;

interface IProps extends TypographyProps {
  colorVariant: TColorVariants;
}

export const Text: FC<IProps> = ({ colorVariant, variant, align, children, ...props }) => (
  <Typography color={colorVariant} variant={variant} align={align} {...props}>
    {children}
  </Typography>
);
