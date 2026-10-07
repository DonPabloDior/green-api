import styled from 'styled-components'

export const Item = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? 'rgba(74, 118, 168, 0.2)' : 'transparent')};
  transition: background 0.12s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? 'rgba(74, 118, 168, 0.25)' : 'rgba(255, 255, 255, 0.04)'};
  }
`

export const Avatar = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a76a8 0%, #6b9fd4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
  user-select: none;
  overflow: hidden;
`

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
`

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
`

export const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #e8e8e8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Time = styled.span`
  font-size: 11px;
  color: #4a5560;
  flex-shrink: 0;
`

export const Preview = styled.p`
  font-size: 13px;
  color: #5a6870;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
