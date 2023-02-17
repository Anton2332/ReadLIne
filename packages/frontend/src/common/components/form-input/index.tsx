import { getIn, useFormikContext } from 'formik';
import React from 'react';
import { Styled } from './form-input.styled';

export interface IFormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  step?: number;
  min?: number;
  width?: string;
  maxLength?: number;
  disabled?: boolean | undefined;
  passedValue: string;
}

export const FormInput: React.FC<IFormInputProps> = ({
  name,
  type,
  placeholder,
  step,
  width,
  min,
  maxLength,
  disabled,
  passedValue
}) => {
  const { values, handleChange, errors, touched } = useFormikContext();
  const isErrorExists = getIn(errors, name) && getIn(touched, name);

  return (
    <Styled.InputContainer disabled={disabled}>
      <Styled.InputPrefix />
      <Styled.Input
        id={name}
        name={name}
        type={type}
        min={min || 0.01}
        step={step}
        onChange={handleChange(name)}
        value={getIn(values, name) || passedValue}
        placeholder={placeholder}
        width={width}
        maxLength={maxLength}
        disabled={disabled}
      />
      {isErrorExists && (
        <Styled.ErrorInfoContainer>
          <Styled.ErrorInfoText>{getIn(errors, name)}</Styled.ErrorInfoText>
        </Styled.ErrorInfoContainer>
      )}
    </Styled.InputContainer>
  );
};

export interface IAutocompleteFormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  step?: number;
  min?: number;
  width?: string;
  maxLength?: number;
  toggleAutocomplete: React.FocusEventHandler<HTMLInputElement>;
  handleAutocomplete: () => void;
}

export const AutocompleteFormInput: React.FC<IAutocompleteFormInputProps> = ({
  name,
  type,
  placeholder,
  step,
  width,
  min,
  maxLength,
  toggleAutocomplete,
  handleAutocomplete
}) => {
  const { values, handleChange, errors, touched } = useFormikContext();
  const isErrorExists = getIn(errors, name) && getIn(touched, name);

  return (
    <>
      <Styled.AutocompleteInput
        id={name}
        name={name}
        type={type}
        min={min || 0.01}
        step={step}
        onChange={() => {
          handleChange(name);
          handleAutocomplete();
        }}
        value={getIn(values, name)}
        placeholder={placeholder}
        width={width}
        maxLength={maxLength}
        onFocus={toggleAutocomplete}
      />
      {isErrorExists && (
        <Styled.ErrorInfoContainer>
          <Styled.ErrorInfoText>{getIn(errors, name)}</Styled.ErrorInfoText>
        </Styled.ErrorInfoContainer>
      )}
    </>
  );
};
