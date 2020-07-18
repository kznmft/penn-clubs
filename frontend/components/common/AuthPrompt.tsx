import { ReactElement } from 'react'
import s from 'styled-components'

import { CLUBS_BLUE } from '../../constants/colors'
import { getCurrentRelativePath, LOGIN_URL } from '../../utils'
import { Center, Icon, PhoneContainer, SmallText, Text, Title } from '.'

const Image = s.img`
  height: 86px;
  width: auto;
  max-width: 242px;
  margin-right: 1rem;
  object-fit: contain;
`

const Margin = s.div`
  margin: 1rem;
`

const TitleHeader = s.div`
  margin-top: 1rem;
  text-align: center;

  h1 {
    margin-top: 1rem;
  }
`

type AuthPromptProps = {
  children?: ReactElement
  title?: string
  hasLogin?: boolean
}

const AuthPrompt = ({
  title = 'One last step...',
  children,
  hasLogin = true,
}: AuthPromptProps): ReactElement => (
  <PhoneContainer>
    <Center>
      <TitleHeader>
        <Image src="/static/img/peoplelogo.png" />
        <Title>{title}</Title>
      </TitleHeader>
      <Margin>
        <Text>
          {children ||
            'To make the most of Penn Clubs features, like bookmarking and subscribing to clubs, please login using your PennKey.'}
        </Text>
      </Margin>
      {hasLogin && (
        <>
          <Margin>
            <a
              href={`${LOGIN_URL}?next=${
                typeof window !== 'undefined' ? getCurrentRelativePath() : '/'
              }`}
              className="button is-large is-link"
              style={{ backgroundColor: CLUBS_BLUE }}
            >
              <Icon alt="login" name="key" /> Continue to login
            </a>
          </Margin>
          <SmallText>
            <i>(We're sorry, we hate two-step too.)</i>
          </SmallText>
        </>
      )}
    </Center>
  </PhoneContainer>
)

export default AuthPrompt