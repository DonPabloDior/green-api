import styled from 'styled-components'

export const InputBar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 12px 24px;
  background: #1a1d1f;
  border: 1px solid #2a2f33;
  border-radius: 30px;
  flex-shrink: 0;
  margin: 10px 30px;
`

export const TextArea = styled.textarea`
  flex: 1;
  min-height: 42px;
  max-height: 140px;
  border: 1.5px solid #2a2f33;
  border-radius: 22px;
  padding: 10px 16px;
  font-size: 14px;
  font-family: inherit;
  color: #e8e8e8;
  background: #222629;
  outline: none;
  resize: none;
  line-height: 1.4;
  overflow-y: auto;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: #4a5560;
  }

  &:focus {
    border-color: #4a76a8;
    box-shadow: 0 0 0 3px rgba(74, 118, 168, 0.12);
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2a2f33;
    border-radius: 4px;
  }
`

export const SendButton = styled.button<{ $active: boolean }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => ($active ? '#4a76a8' : '#2a2f33')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#4a5560')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'default')};
  flex-shrink: 0;
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#3a66a0' : '#2a2f33')};
    transform: ${({ $active }) => ($active ? 'scale(1.05)' : 'none')};
  }

  &:active {
    transform: ${({ $active }) => ($active ? 'scale(0.96)' : 'none')};
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`

export const ErrorBanner = styled.div`
  font-size: 12px;
  color: #e05555;
  padding: 4px 14px 0;
  background: #1a1d1f;
`
