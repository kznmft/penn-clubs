import PropTypes from 'prop-types'
import { BlueTag, SelectedTag } from './Tags'

export const TagGroup = ({ tags = [], selectedTags = [], updateTag }) => {
  if (!tags || !tags.length) return null

  // TODO: Use same tag format between DropdownFilter and TagGroup
  return tags.map(tag => {
    const matchedTag = selectedTags.find(
      ({ value, name: filterType }) => filterType === 'Type' && value === tag.id
    )
    const key = `${tag.id}-${tag.value}`
    if (matchedTag) {
      return (
        <SelectedTag
          key={key}
          className="tag is-rounded has-text-white"
          onClick={e => {
            // Prevent click event from propagating so clicking on the tag doesn't
            // fire the generic club handle click
            e.preventDefault()
            e.stopPropagation()
            updateTag && updateTag(matchedTag, matchedTag.name)
          }}
        >
          {tag.name}
          <button className="delete is-small" />
        </SelectedTag>
      )
    }
    return (
      <BlueTag
        key={key}
        className="tag is-rounded has-text-white"
        onClick={e => {
          // Stop propagation of click event for same reasons as above
          e.preventDefault()
          e.stopPropagation()
          updateTag &&
            updateTag(
              {
                value: tag.id,
                label: tag.name,
                name: 'Type',
              },
              'Type'
            )
        }}
      >
        {tag.name}
      </BlueTag>
    )
  })
}

TagGroup.defaultProps = {
  selectedTags: [],
  tags: [],
  updateTag: undefined,
}

TagGroup.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ),
  selectedTags: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
    })
  ),
  updateTag: PropTypes.func,
}