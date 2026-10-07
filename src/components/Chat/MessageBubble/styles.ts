import styled, { keyframes } from 'styled-components'

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
`

export const BubbleRow = styled.div<{ $outgoing: boolean }>`
  display: flex;
  justify-content: ${({ $outgoing }) => ($outgoing ? 'flex-end' : 'flex-start')};
  animation: ${popIn} 0.15s ease;
`

export const Bubble = styled.div<{ $outgoing: boolean }>`
  max-width: min(72%, 480px);
  padding: 8px 12px 6px;
  border-radius: ${({ $outgoing }) =>
    $outgoing ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  background: ${({ $outgoing }) => ($outgoing ? '#4a76a8' : '#222629')};
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  word-break: break-word;
  margin-top: 4px;
`

export const BubbleText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
`

export const BubbleMeta = styled.div<{ $outgoing: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 3px;
`

export const BubbleTime = styled.span<{ $outgoing: boolean }>`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
`

export const StatusIcon = styled.span<{ $type: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 11px;

  color: ${({ $type }) => {
    if ($type === 'failed') return '#e05555'
    return 'rgba(255, 255, 255, 0.55)'
  }};

  img {
    display: block;
    filter: ${({ $type }) => {
      if ($type === 'read') return 'none'
      return 'brightness(0) invert(1) opacity(0.7)'
    }};
  }
`
