import { useState, useEffect } from 'react'
import s from 'styled-components'

import { Modal, Loading } from './common'
import { LOGIN_URL } from '../utils'
import { DARK_GRAY } from '../constants/colors'
import { LONG_ANIMATION_DURATION } from '../constants/measurements'
import { fadeIn, fadeOut } from '../constants/animations'

const Logo = s.img`
  width: 100px;
  margin-top: 12%;
`

const ModalTitle = s.h1`
  color: ${DARK_GRAY};
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
  margin: 2% 0;
`

export default ({ show, ...props }) => {
  const [newlyMounted, setNewlyMounted] = useState(true)
  useEffect(() => {
    newlyMounted && setNewlyMounted(false)
  })
  return (
    <Modal
      show={show}
      {...props}
    >
      {
        newlyMounted ? (
          <Loading />
        ) : (
          <>
            <Logo
              show={show}
              src="/static/img/peoplelogo.png"
              alt="Penn Clubs Logo"
            />
            <ModalTitle show={show}>Uh oh!</ModalTitle>
            This feature requires a Penn login.
            <br />
            Please <a href={`${LOGIN_URL}?next=${window.location.href}`}>log in using your PennKey</a> to continue.
          </>
        )
      }
    </Modal>
  )
}
