import React from 'react'
import s from 'styled-components'

import {
  CLUBS_GREY,
  CLUBS_GREY_LIGHT,
  WHITE,
  HOVER_GRAY,
  ALLBIRDS_GRAY,
} from '../constants/colors'
import Card from './common/Card'
import { BlueTag, InactiveTag } from './common/Tags'
import { BORDER_RADIUS } from '../constants/measurements'
import { getDefaultClubImageURL } from '../utils'
import { CLUB_ROUTE } from '../constants/routes'

const FavoriteIcon = s.span`
  color: ${CLUBS_GREY};
  cursor: pointer;
  padding-right: 20px;
`

const Wrapper = s.div`
  padding: 0 5px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${ALLBIRDS_GRAY};
  background-color: ${({ hovering }) => (hovering ? HOVER_GRAY : WHITE)};
  margin: .5rem;
  width: 100%;
`

const Subtitle = s.p`
  color: ${CLUBS_GREY_LIGHT} !important;
  font-size: .8rem;
  padding-left: 10px;
`

const Image = s.img`
  height: 60px;
  width: 90px;
  object-fit: contain;
  border-radius: ${BORDER_RADIUS};
`

class ClubList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: '',
    }
  }

  render() {
    const { club, updateFavorites, favorite } = this.props
    const { name, subtitle, tags, code } = club
    const img = club.image_url || getDefaultClubImageURL()

    return (
      <Wrapper>
        <a href={CLUB_ROUTE(code)}>
          <div className="columns is-vcentered is-gapless is-mobile">
            <div className="column">
              <Card className="columns is-gapless is-vcentered">
                <div className="column is-narrow">
                  <Image src={img} />
                </div>
                <div className="column is-4" style={{ marginLeft: 20 }}>
                  <strong className="is-size-6" style={{ color: CLUBS_GREY }}>
                    {name}
                  </strong>
                  <div>
                    {club.active || (
                      <InactiveTag className="tag is-rounded has-text-white">
                        Inactive
                      </InactiveTag>
                    )}
                    {tags.map(tag => (
                      <BlueTag
                        key={tag.id}
                        className="tag is-rounded has-text-white"
                      >
                        {tag.name}
                      </BlueTag>
                    ))}
                  </div>
                </div>
                <div className="column">
                  <Subtitle>{subtitle}</Subtitle>
                </div>
              </Card>
            </div>
            <div className="column is-narrow">
              <FavoriteIcon
                className="icon"
                onClick={() => updateFavorites(club.code)}
              >
                <i className={(favorite ? 'fas' : 'far') + ' fa-heart'}></i>
              </FavoriteIcon>
            </div>
          </div>
        </a>
      </Wrapper>
    )
  }
}

export default ClubList