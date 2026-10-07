import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.15s ease;
  padding: 16px;
`

export const Modal = styled.div`
  background: #1a1d1f;
  border: 1px solid #2a2f33;
  border-radius: 16px;
  padding: 28px 28px 24px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
  animation: ${slideUp} 0.18s ease;
`

export const ModalTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #e8e8e8;
  margin-bottom: 6px;
`

export const ModalSubtitle = styled.p`
  font-size: 13px;
  color: #5a6870;
  margin-bottom: 20px;
  line-height: 1.5;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #6a7880;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const Input = styled.input<{ $hasError?: boolean }>`
  height: 44px;
  border: 1.5px solid ${({ $hasError }) => ($hasError ? '#e05555' : '#2a2f33')};
  border-radius: 10px;
  padding: 0 14px;
  font-size: 15px;
  color: #e8e8e8;
  background: #222629;
  outline: none;
  letter-spacing: 0.5px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: #3a4550;
    letter-spacing: 0;
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#e05555' : '#4a76a8')};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? 'rgba(224,85,85,0.12)' : 'rgba(74,118,168,0.12)'};
  }
`

export const HintText = styled.p<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ $error }) => ($error ? '#e05555' : '#4a5560')};
  min-height: 16px;
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

export const CancelButton = styled.button`
  flex: 1;
  height: 42px;
  border: 1.5px solid #2a2f33;
  border-radius: 10px;
  background: transparent;
  color: #6a7880;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: #3a4550;
  }
`

export const ConfirmButton = styled.button`
  flex: 1;
  height: 42px;
  border: none;
  border-radius: 10px;
  background: #4a76a8;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    background: #3a66a0;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`
