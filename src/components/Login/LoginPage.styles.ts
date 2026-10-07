import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #131516;
`

export const Card = styled.div`
  background: #1a1d1f;
  border: 1px solid #2a2f33;
  border-radius: 16px;
  padding: 40px 36px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
`

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
`

export const LogoCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a76a8 0%, #5b8bc2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
`

export const AppName = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #e8e8e8;
  letter-spacing: -0.3px;
`

export const Subtitle = styled.p`
  font-size: 13px;
  color: #5a6870;
  text-align: center;
  margin-bottom: 28px;
  line-height: 1.5;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #6a7880;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const Input = styled.input`
  height: 44px;
  border: 1.5px solid #2a2f33;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 14px;
  color: #e8e8e8;
  background: #222629;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: #3a4550;
  }

  &:focus {
    border-color: #4a76a8;
    box-shadow: 0 0 0 3px rgba(74, 118, 168, 0.12);
  }
`

export const ApiUrlRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const ApiUrlToggle = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: #4a76a8;
  cursor: pointer;
  text-align: left;
  text-decoration: underline;

  &:hover {
    color: #6b9fd4;
  }
`

export const SubmitButton = styled.button<{ $loading?: boolean }>`
  height: 46px;
  background: #4a76a8;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 6px;
  transition: background 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    background: #3a66a0;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.p`
  font-size: 13px;
  color: #e05555;
  text-align: center;
  margin-top: 4px;
`
