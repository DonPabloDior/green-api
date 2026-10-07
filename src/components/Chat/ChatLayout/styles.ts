import styled, { keyframes } from 'styled-components'

export const LayoutRoot = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #131516;
`

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 320px;
  min-width: 320px;
  background: #1a1d1f;
  border-right: 1px solid #0e1012;
  overflow: hidden;

  @media (max-width: 640px) {
    width: 100%;
    min-width: 0;
    &[data-hidden='true'] {
      display: none;
    }
  }
`

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 16px 12px;
  flex-shrink: 0;
`

export const SidebarTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #e8e8e8;
`

export const NewChatButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #4a76a8;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 22px;
  line-height: 1;
  transition: background 0.15s ease, transform 0.1s ease;
  flex-shrink: 0;

  &:hover {
    background: #3a66a0;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }
`

export const ChatListScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #2a2f33;
    border-radius: 4px;
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 10px;
  color: #4a5560;
  text-align: center;
`

export const EmptyIcon = styled.div`
  font-size: 40px;
  margin-bottom: 4px;
    div {
        background-color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
    }
`

export const EmptyText = styled.p`
  font-size: 14px;
  line-height: 1.5;
`

export const LogoutWrapper = styled.div`
  padding: 12px 16px;
`

export const SidebarFooter = styled.div`
  padding: 10px 16px 14px;
  flex-shrink: 0;
  border-top: 1px solid #1e2225;
`

import patternUrl from '@/assets/abstract-pattern.svg'

export const MainPanel = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background-color: #131516;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: #4a76a8;
    opacity: 0.3;
    mask-image: url(${patternUrl});
    mask-repeat: repeat;
    mask-size: 400px auto;
    -webkit-mask-image: url(${patternUrl});
    -webkit-mask-repeat: repeat;
    -webkit-mask-size: 400px auto;
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 640px) {
    &[data-hidden='true'] {
      display: none;
    }
  }
`

export const NoChatPlaceholder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #a7aaac;
  user-select: none;
`

export const NoChatIcon = styled.div`
  font-size: 56px;
`

export const NoChatText = styled.p`
  font-size: 15px;
`

const shimmer = keyframes`
  0%   { background-position: -300px 0; }
  100% { background-position:  300px 0; }
`

export const SkeletonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
`

export const SkeletonAvatar = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(90deg, #1e2428 25%, #262d33 50%, #1e2428 75%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`

export const SkeletonLines = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const SkeletonLine = styled.div<{ $width?: string }>`
  height: 10px;
  border-radius: 6px;
  width: ${({ $width }) => $width ?? '100%'};
  background: linear-gradient(90deg, #1e2428 25%, #262d33 50%, #1e2428 75%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`
