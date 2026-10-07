import styled, { keyframes, css } from 'styled-components'

const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const BurgerButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }
`

export const BurgerLine = styled.span<{ $open: boolean; $pos: 'top' | 'mid' | 'bot' }>`
  display: block;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: #a0aab4;
  transition: transform 0.2s ease, opacity 0.2s ease;

  ${({ $open, $pos }) =>
    $open &&
    $pos === 'top' &&
    css`transform: translateY(7px) rotate(45deg);`}

  ${({ $open, $pos }) =>
    $open &&
    $pos === 'mid' &&
    css`opacity: 0; transform: scaleX(0);`}

  ${({ $open, $pos }) =>
    $open &&
    $pos === 'bot' &&
    css`transform: translateY(-7px) rotate(-45deg);`}
`

export const MenuWrapper = styled.div`
  position: relative;
`

export const MenuDropdown = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  width: 220px;
  background: #1e2225;
  border: 1px solid #2a2f33;
  border-radius: 14px;
  padding: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: ${fadeSlide} 0.18s ease;
  z-index: 100;
`

export const MenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 14px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  color: ${({ $danger }) => ($danger ? '#e05555' : '#c8cdd2')};
  transition: background 0.12s ease, color 0.12s ease;
  text-align: left;

  svg {
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity 0.12s ease;
  }

  &:hover {
    background: ${({ $danger }) =>
      $danger ? 'rgba(224,85,85,0.12)' : 'rgba(255,255,255,0.06)'};
    color: ${({ $danger }) => ($danger ? '#ff6b6b' : '#ffffff')};

    svg {
      opacity: 1;
    }
  }
`

export const MenuDivider = styled.div`
  height: 1px;
  background: #2a2f33;
  margin: 6px 0;
`
