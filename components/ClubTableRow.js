import React from 'react'
import s from 'styled-components'

import { CLUBS_GREY, CLUBS_GREY_LIGHT } from '../constants/colors'
import { mediaMaxWidth, mediaMinWidth, MD, LG } from '../constants/measurements'
import FavoriteIcon from './common/FavoriteIcon'
import TagGroup from './common/TagGroup'
import ClubDetails from './ClubDetails'
import { CLUB_ROUTE } from '../constants/routes'

const ROW_PADDING = 0.8

const Row = s.div`
  cursor: pointer;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  box-shadow: 0 0 0 transparent;
  transition: all 0.2s ease;
  padding: ${ROW_PADDING}rem;
  width: calc(100% + ${2 * ROW_PADDING}rem);
  margin: 0 -${ROW_PADDING}rem;

  &:hover {
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }

  ${mediaMaxWidth(MD)} {
    margin: 0;
    width: 100%;
    border-radius: 0;
  }
`

const Content = s.div`
  ${mediaMinWidth(LG)} {
    padding: 0 0.75rem;
  }
`

const Subtitle = s.p`
  color: ${CLUBS_GREY_LIGHT};
  font-size: .8rem;
`

const Name = ({ children }) => (
  <p
    className="is-size-6"
    style={{ color: CLUBS_GREY, marginBottom: '0.2rem' }}
  >
    <strong>{children}</strong>
  </p>
)

class ClubTableRow extends React.Component {
  getSubtitle() {
    const { club } = this.props
    const { subtitle, description } = club

    if (subtitle) return subtitle

    if (description.length < 200) return description

    return description.substring(0, 200) + '...'
  }

  render() {
    const {
      club,
      updateFavorites,
      favorite,
      selectedTags,
      updateTag,
    } = this.props
    const {
      name,
      tags,
      accepting_members: acceptingMembers,
      size,
      code,
      application_required: applicationRequired,
    } = club

    return (
      <Row>
        <a href={CLUB_ROUTE(code)} target="_BLANK">
          <div className="columns is-gapless is-mobile">
            <div className="column">
              <div className="columns is-gapless">
                <div className="column is-4-desktop is-12-mobile">
                  <Name>{name}</Name>
                  <div>
                    <TagGroup
                      tags={tags}
                      selectedTags={selectedTags}
                      updateTag={updateTag}
                    />
                  </div>
                </div>
                <div className="column is-8-desktop is-12-mobile">
                  <Content>
                    <Subtitle>{this.getSubtitle()}</Subtitle>
                    <ClubDetails
                      size={size}
                      applicationRequired={applicationRequired}
                      acceptingMembers={acceptingMembers}
                    />
                  </Content>
                </div>
              </div>
            </div>
            <div className="column is-narrow">
              <FavoriteIcon
                club={club}
                favorite={favorite}
                updateFavorites={updateFavorites}
              />
            </div>
          </div>
        </a>
      </Row>
    )
  }
}

export default ClubTableRow