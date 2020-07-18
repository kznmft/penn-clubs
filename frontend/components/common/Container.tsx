import { CSSProperties, ReactElement } from 'react'
import s from 'styled-components'

import { WHITE } from '../../constants/colors'
import {
  LG,
  MD,
  mediaMinWidth,
  NAV_HEIGHT,
  XL,
} from '../../constants/measurements'

const getPadding = (percent) => {
  if (!percent) return 'padding-left: 1rem; padding-right: 1rem;'
  return `padding-left: calc(1rem + ${percent}%); padding-right: calc(1rem + ${percent}%);`
}

type WrapperProps = {
  fullHeight?: boolean
}

const Wrapper = s.div<WrapperProps>`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  ${mediaMinWidth(MD)} {
    ${getPadding(5)}
  }

  ${mediaMinWidth(LG)} {
    ${getPadding(15)}
  }

  ${mediaMinWidth(XL)} {
    ${getPadding(25)}
  }

  ${({ fullHeight }) =>
    fullHeight &&
    `
    min-height: calc(100vh - ${NAV_HEIGHT});
  `}
`

export const Container = ({
  background = WHITE,
  fullHeight = false,
  style,
  children,
}: ContainerProps): ReactElement => (
  <div style={{ background }}>
    <Wrapper fullHeight={fullHeight} style={style}>
      {children}
    </Wrapper>
  </div>
)

type ContainerProps = React.PropsWithChildren<{
  background?: string
  fullHeight?: boolean
  style?: CSSProperties
}>

const WideWrapper = s(Wrapper)`
  ${mediaMinWidth(MD)} {
    ${getPadding(2.5)}
  }

  ${mediaMinWidth(LG)} {
    ${getPadding(5)}
  }

  ${mediaMinWidth(XL)} {
    ${getPadding(10)}
  }
`

export const WideContainer = ({
  background = WHITE,
  fullHeight,
  children,
}: ContainerProps): ReactElement => (
  <div style={{ background }}>
    <WideWrapper fullHeight={fullHeight}>{children}</WideWrapper>
  </div>
)

export const PhoneContainer = s.div`
  margin: 15px auto;
  padding: 15px;
  max-width: 420px;
`