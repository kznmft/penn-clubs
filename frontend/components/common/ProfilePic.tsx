import { ReactElement } from 'react'
import s, { CSSProperties } from 'styled-components'

import { PROPIC_BACKGROUND, PROPIC_TEXT } from '../../constants/colors'
import { mediaMinWidth, PHONE } from '../../constants/measurements'

const hashCode = (content: string): number => {
  let h = 0
  let i = 0
  if (content.length > 0) {
    while (i < 1) {
      h = ((h << 5) - h + content.charCodeAt(i++)) | 0
    }
  }
  return h
}

const [DEFAULT_BG_COLOR] = PROPIC_BACKGROUND
const [DEFAULT_TXT_COLOR] = PROPIC_TEXT

const Placeholder = s.div<{
  fontSize?: string
  isRound?: boolean
  backgroundColor?: string
  textColor?: string
}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ fontSize }) => fontSize || '1.5em'};
  ${({ isRound }) => (isRound ? 'border-radius: 9999px;' : '')};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || DEFAULT_BG_COLOR};
  color: ${({ textColor }) => textColor || DEFAULT_TXT_COLOR};
`

const Avatar = s.img<{ isRound?: boolean }>`
  object-fit: cover;

  .image & {
    width: 100%;
    height: 100%;
  }

  ${({ isRound }) => isRound && 'border-radius: 50%;'}
`

const AvatarWrapper = s.div`
  border-radius: 50%;
  margin: 5px 15px;
  ${mediaMinWidth(PHONE)} {
    margin: 0 auto;
  }
`

type ProfilePicProps = {
  className?: string
  user: { name: string; image: string | null }
  isRound?: boolean
  style?: CSSProperties
  fontSize?: string
}

export const ProfilePic = ({
  className,
  user,
  isRound = true,
  style,
  fontSize,
}: ProfilePicProps): ReactElement => {
  const { name, image } = user
  if (image)
    return (
      <AvatarWrapper className="has-background-light image is-64x64">
        <Avatar src={image} isRound={isRound} />
      </AvatarWrapper>
    )
  const nonce = hashCode(name) % PROPIC_TEXT.length
  const backgroundColor = PROPIC_BACKGROUND[nonce]
  const textColor = PROPIC_TEXT[nonce]

  // Assuming the name is properly capitalized, this extracts the name's initials.
  const initials = name.replace(/[a-z]|\s/g, '')
  return (
    <AvatarWrapper className="has-background-light image is-64x64">
      <Placeholder
        style={style}
        className={className}
        isRound={isRound}
        fontSize={fontSize}
        backgroundColor={backgroundColor}
        textColor={textColor}
      >
        {initials}
      </Placeholder>
    </AvatarWrapper>
  )
}
