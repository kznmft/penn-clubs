import { NextPageContext } from 'next'
import React, { ReactElement } from 'react'

import ClubFairCard from '../components/ClubEditPage/ClubFairCard'
import { Contact, Container, Metadata, Text, Title } from '../components/common'
import AuthPrompt from '../components/common/AuthPrompt'
import TabView from '../components/TabView'
import { BG_GRADIENT, WHITE } from '../constants'
import renderPage from '../renderPage'
import { MembershipRank } from '../types'
import { doBulkLookup } from '../utils'
import {
  MEMBERSHIP_ROLE_NAMES,
  OBJECT_NAME_PLURAL,
  OBJECT_NAME_SINGULAR,
  OBJECT_NAME_TITLE_SINGULAR,
} from '../utils/branding'

function FairsPage({ userInfo, fairs, memberships }): ReactElement {
  if (!userInfo) {
    return <AuthPrompt />
  }

  const tabs = [
    {
      name: 'Register',
      content: (
        <>
          <Text>
            You can use this page to register your {OBJECT_NAME_SINGULAR} for{' '}
            {OBJECT_NAME_SINGULAR} fairs. Please read the instructions carefully
            before registering any of your {OBJECT_NAME_PLURAL}.
          </Text>
          <Text>
            You will only be able to register {OBJECT_NAME_PLURAL} where you
            have at least{' '}
            {MEMBERSHIP_ROLE_NAMES[MembershipRank.Officer].toLowerCase()}{' '}
            permissions. If you encounter any difficulties with the registration
            process, please email <Contact />.
          </Text>
          <ClubFairCard fairs={fairs} memberships={memberships} />
        </>
      ),
    },
  ]

  return (
    <>
      <Metadata title={`Register for ${OBJECT_NAME_TITLE_SINGULAR} Fairs`} />
      <Container background={BG_GRADIENT}>
        <Title style={{ marginTop: '2.5rem', color: WHITE, opacity: 0.95 }}>
          Register for {OBJECT_NAME_TITLE_SINGULAR} Fairs
        </Title>
      </Container>
      <TabView background={BG_GRADIENT} tabs={tabs} tabClassName="is-boxed" />
    </>
  )
}

FairsPage.getInitialProps = async (ctx: NextPageContext) => {
  return doBulkLookup(
    [['fairs', '/clubfairs/?format=json'], 'memberships'],
    ctx,
  )
}

export default renderPage(FairsPage)
