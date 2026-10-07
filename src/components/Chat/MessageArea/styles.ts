import styled from 'styled-components'

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #1a1d1f;
  border-bottom: 1px solid #0e1012;
  flex-shrink: 0;
`

export const BackButton = styled.button`
    display: none;
    width: 38px;
    height: 38px;
    border: 1px solid #4b5564;
    border-radius: 100%;
    background: #303338;
    cursor: pointer;
    padding: 0;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    @media (max-width: 640px) {
        display: flex;
    }
`

export const HeaderAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a76a8 0%, #6b9fd4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
  user-select: none;
  overflow: hidden;
`

export const HeaderAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
`

export const HeaderInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const HeaderName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #e8e8e8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const HeaderSub = styled.p`
  font-size: 12px;
  color: #4a5560;
`

export const MessagesScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 4px;
  }
`

export const DateDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`

export const DateLabel = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.4);
  padding: 3px 10px;
  border-radius: 10px;
`

export const EmptyChat = styled.div`
    display: flex;
    background-color: #222629;
    width: 300px;
    height: 300px;
    border-radius: 16px;
    border: 1px solid #2a2f33;
    margin-inline: auto;
    margin-top: 140px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;

    div {
        filter: brightness(0) saturate(100%) invert(77%) sepia(0%) saturate(2144%) hue-rotate(316deg) brightness(104%) contrast(95%);
    }

    h3 {
        font-size: 16px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
    }

    span {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.35);
    }
`
