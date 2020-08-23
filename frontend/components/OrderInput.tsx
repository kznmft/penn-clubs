import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import s from 'styled-components'

import {
  BORDER,
  CLUBS_BLUE,
  FOCUS_GRAY,
  MEDIUM_GRAY,
} from '../constants/colors'
import { BORDER_RADIUS, MD, mediaMaxWidth } from '../constants/measurements'
import { BODY_FONT } from '../constants/styles'
import { Icon } from './common'

const ORDERINGS = [
  {
    key: 'featured',
    name: 'Featured',
    icon: 'star',
  },
  {
    key: 'name',
    name: 'Alphabetical',
    icon: 'list',
  },
  {
    key: '-favorite_count',
    name: 'Bookmarks',
    icon: 'bookmark',
  },
  {
    key: 'random',
    name: 'Random',
    icon: 'shuffle',
  },
]

const OrderingWrapper = s.div`
  width: 100%;

  & .dropdown-trigger,
  & .dropdown-trigger button,
  & .dropdown-menu {
    width: 100%;
    border-radius: ${BORDER_RADIUS};
  }

  & .dropdown-trigger button {
    text-align: left;
    justify-content: flex-start;
    padding-right: 0;
  }

  & .dropdown-trigger .icon:last-child:not(:first-child) {
    display: inline-block;
    margin-left: auto;
  }

  & .dropdown-content {
    padding: 0;
  }

  & .dropdown-item {
    display: flex;
    align-items: center;
    border-radius: ${BORDER_RADIUS};
  }

  
  & .dropdown-item.is-active {
    background: ${CLUBS_BLUE};
  }

  & button, a {
    padding: 8px 10px;
    color: ${MEDIUM_GRAY};
    font-family: ${BODY_FONT};
  }

  & button:focus, button:hover {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid ${BORDER};
    color: ${MEDIUM_GRAY};
    background: ${FOCUS_GRAY};
  }
`

const OrderingChevronWrapper = s.div`
  cursor: pointer;
  color: ${MEDIUM_GRAY};
  opacity: 0.5;
  margin-right: 6px !important;
  margin-left: auto;
  vertical-align: middle;

  ${mediaMaxWidth(MD)} {
    right: 24px;
  }
`

const OrderInput = ({ onChange }): ReactElement => {
  const [ordering, setOrdering] = useState<string>('featured')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectedOrdering = ORDERINGS.find((order) => order.key === ordering)

  const dropdownMenuRef = useRef<HTMLDivElement>(null)
  // Memoize listener to ensure the listener is preserved between rerenders
  const dropdownBlurListener = useMemo(
    () => (e) => {
      if (
        dropdownMenuRef &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    },
    [dropdownMenuRef],
  )
  useEffect(() => {
    if (!isOpen) document.removeEventListener('click', dropdownBlurListener)
    else document.addEventListener('click', dropdownBlurListener)
  }, [isOpen])
  useEffect(
    () => () => document.removeEventListener('click', dropdownBlurListener),
    [],
  )

  return (
    <OrderingWrapper className={`dropdown ${isOpen ? 'is-active' : ''}`}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => !isOpen && setIsOpen(true)}
        >
          <Icon name={selectedOrdering?.icon ?? 'x'} />{' '}
          {selectedOrdering?.name ?? 'Unknown'}
          <OrderingChevronWrapper>
            <Icon name="chevron-down" noMargin />
          </OrderingChevronWrapper>
        </button>
      </div>
      <div ref={dropdownMenuRef} className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {ORDERINGS.map((order) => (
            <a
              key={order.key}
              className={`dropdown-item ${
                order.key === ordering ? 'is-active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault()
                setOrdering(order.key)
                onChange(order.key)
                setIsOpen(false)
              }}
            >
              <Icon name={order.icon} /> {order.name}
            </a>
          ))}
        </div>
      </div>
    </OrderingWrapper>
  )
}

export default OrderInput