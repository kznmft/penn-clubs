import React from 'react'
import s from 'styled-components'
import Fuse from 'fuse.js'
import SearchBar from '../components/SearchBar'
import ClubDisplay from '../components/ClubDisplay'
import DisplayButtons from '../components/DisplayButtons'
import { renderListPage } from '../renderPage.js'
import { mediaMaxWidth, MD } from '../constants/measurements'
import {
  CLUBS_GREY,
  CLUBS_GREY_LIGHT,
  CLUBS_BLUE,
  CLUBS_RED,
  CLUBS_YELLOW,
  FOCUS_GRAY,
  SNOW,
} from '../constants/colors'
import { logEvent } from '../utils/analytics'
import { WideContainer } from '../components/common'

const colorMap = {
  Type: CLUBS_BLUE,
  Size: CLUBS_RED,
  Application: CLUBS_YELLOW,
}

const ClearAllLink = s.span`
  cursor: pointer;
  color: ${CLUBS_GREY_LIGHT};
  text-decoration: none !important;
  background: transparent !important;
  fontSize: .7em;
  margin: 5px;

  &:hover {
    background: ${FOCUS_GRAY} !important;
  }
`

const ResultsText = s.div`
  color: ${CLUBS_GREY_LIGHT};
  text-decoration: none !important;
  background: transparent !important;
  fontSize: .7em;
  margin: 5px;
`

const Container = s.div`
  width: 80vw;
  margin-left: 20vw;
  padding: 0;

  ${mediaMaxWidth(MD)} {
    width: 100%;
    margin-left: 0;
  }
`

class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayClubs: props.clubs,
      selectedTags: [],
      nameInput: '',
      display: 'cards',
    }
    this.fuseOptions = {
      keys: [
        {
          name: 'name',
          weight: 0.6,
        },
        {
          name: 'tags.name',
          weight: 0.5,
        },
        {
          name: 'subtitle',
          weight: 0.3,
        },
        {
          name: 'description',
          weight: 0.1,
        },
      ],
      tokenize: true,
      findAllMatches: true,
      shouldSort: true,
      minMatchCharLength: 2,
      threshold: 0.2,
    }
    this.fuse = new Fuse(this.props.clubs, this.fuseOptions)

    this.shuffle = this.shuffle.bind(this)
    this.switchDisplay = this.switchDisplay.bind(this)
  }

  componentDidMount() {
    this.shuffle()
  }

  resetDisplay(nameInput, selectedTags) {
    const tagSelected = selectedTags.filter(tag => tag.name === 'Type')
    const sizeSelected = selectedTags.filter(tag => tag.name === 'Size')
    const applicationSelected = selectedTags.filter(
      tag => tag.name === 'Application'
    )
    let { clubs } = this.props

    // fuzzy search
    if (nameInput.length) {
      clubs = this.fuse.search(nameInput)
    }

    // checkbox filters
    clubs = clubs.filter(club => {
      const clubRightSize =
        !sizeSelected.length ||
        sizeSelected.findIndex(sizeTag => sizeTag.value === club.size) !== -1
      const appRequired =
        !applicationSelected.length ||
        (applicationSelected.findIndex(appTag => appTag.value === 1) !== -1 &&
          club.application_required !== 1) ||
        (applicationSelected.findIndex(appTag => appTag.value === 2) !== -1 &&
          club.application_required === 1) ||
        (applicationSelected.findIndex(appTag => appTag.value === 3) !== -1 &&
          club.accepting_members)
      const rightTags =
        !tagSelected.length ||
        club.tags.some(
          clubTag =>
            tagSelected.findIndex(tag => tag.value === clubTag.id) !== -1
        )

      return clubRightSize && appRequired && rightTags
    })

    const displayClubs = clubs
    this.setState({ displayClubs, nameInput, selectedTags })
  }

  switchDisplay(display) {
    logEvent('viewMode', display)
    this.setState({ display })
    this.forceUpdate()
  }

  updateTag(tag, name) {
    const { selectedTags } = this.state
    const { value } = tag
    const i = selectedTags.findIndex(
      tag => tag.value === value && tag.name === name
    )

    if (i === -1) {
      tag.name = name
      selectedTags.push(tag)
    } else {
      selectedTags.splice(i, 1)
    }

    this.setState(
      { selectedTags },
      this.resetDisplay(this.state.nameInput, this.state.selectedTags)
    )
  }

  shuffle() {
    const { userInfo } = this.props
    const { displayClubs } = this.state

    let userSchools = new Set()
    let userMajors = new Set()

    if (userInfo) {
      userSchools = new Set(userInfo.school.map(a => a.name))
      userMajors = new Set(userInfo.major.map(a => a.name))
    }
    displayClubs.forEach(club => {
      club.rank = 0
      const hasSchool = club.target_schools.some(({ name }) => userSchools.has(name))
      const hasMajor = club.target_majors.some(({ name }) => userMajors.has(name))
      const hasYear = userInfo && club.target_years.some(({ year }) => userInfo.graduation_year === year)
      const hasDescription = club.description.length > 8
      if (hasSchool) {
        club.rank += Math.max(0, 1 - club.target_schools.length / 4)
      }
      if (hasYear) {
        club.rank += Math.max(0, 1 - club.target_years.length / 4)
      }
      if (hasMajor) {
        club.rank += 3 * Math.max(0, 1 - club.target_majors.length / 10)
      }
      if (!hasDescription) {
        club.rank -= 1
      }
      if (!club.active) {
        club.rank -= 5
      }
      club.rank += 2 * Math.random()
    })
    this.setState({
      displayClubs: displayClubs.sort((a, b) => {
        if (a.rank > b.rank) {
          return -1
        }
        if (b.rank > a.rank) {
          return 1
        }
        return 0
      }),
    })
  }

  render() {
    const { displayClubs, display, selectedTags, nameInput } = this.state
    const { clubs, tags, favorites, updateFavorites } = this.props
    return (
      <div style={{ backgroundColor: SNOW }}>
        <SearchBar
          clubs={clubs}
          tags={tags}
          resetDisplay={this.resetDisplay.bind(this)}
          switchDisplay={this.switchDisplay.bind(this)}
          selectedTags={selectedTags}
          updateTag={this.updateTag.bind(this)}
        />

        <Container>
          <WideContainer background={SNOW}>
            <div style={{ padding: '30px 0' }}>
              <DisplayButtons
                shuffle={this.shuffle}
                switchDisplay={this.switchDisplay}
              />

              <p className="title" style={{ color: CLUBS_GREY }}>
                Browse Clubs
              </p>
              <p
                className="subtitle is-size-5"
                style={{ color: CLUBS_GREY_LIGHT }}
              >
                Find your people!
              </p>
            </div>
            <ResultsText> {displayClubs.length} results </ResultsText>

            {selectedTags.length ? (
              <div style={{ padding: '0 30px 30px 0' }}>
                {selectedTags.map(tag => (
                  <span
                    key={tag.label}
                    className="tag is-rounded has-text-white"
                    style={{
                      backgroundColor: colorMap[tag.name],
                      fontWeight: 600,
                      margin: 3,
                    }}
                  >
                    {tag.label}
                    <button
                      className="delete is-small"
                      onClick={e => this.updateTag(tag, tag.name)}
                    />
                  </span>
                ))}
                <ClearAllLink
                  className="tag is-rounded"
                  onClick={e =>
                    this.setState(
                      { selectedTags: [] },
                      this.resetDisplay(nameInput, [])
                    )
                  }
                >
                  Clear All
                </ClearAllLink>
              </div>
            ) : (
              ''
            )}

            <ClubDisplay
              displayClubs={displayClubs}
              display={display}
              tags={tags}
              favorites={favorites}
              updateFavorites={updateFavorites}
              selectedTags={selectedTags}
              updateTag={this.updateTag.bind(this)}
            />
          </WideContainer>
        </Container>
      </div>
    )
  }
}

export default renderListPage(Splash)