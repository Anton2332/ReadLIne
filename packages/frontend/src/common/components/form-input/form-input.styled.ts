import styled from 'styled-components';

export const InputContainer = styled.div<{ disabled: boolean | undefined }>`
  display: flex;
  position: relative;
  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.secondary_grey : theme.colors.primary_white)};
  border: 1px solid ${({ theme }) => theme.colors.blue_white};
  border-radius: ${({ theme }) => theme.spaces.xs};

  &:focus-within {
    box-shadow: rgb(4 17 29 / 25%) 0 0 8px 0;
  }
`;

export const InputPrefix = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  padding-left: ${({ theme }) => theme.spaces.xs};
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  height: 48px;
  outline: none;
  padding: 0 ${({ theme }) => theme.spaces.xs} 0px 0px;
`;

export const ErrorInfoContainer = styled.div`
  align-items: center;
  display: flex;
  padding: ${({ theme }) => theme.spaces.xxs};
  color: ${({ theme }) => theme.colors.secondary_red};
`;

export const ErrorInfoText = styled.div`
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fonts.xxs};
  margin-left: ${({ theme }) => theme.spaces.xxxs};
`;

export const AutocompleteInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  cursor: text;
`;

export const Styled = {
  InputContainer,
  InputPrefix,
  Input,
  ErrorInfoContainer,
  ErrorInfoText,
  AutocompleteInput
};
