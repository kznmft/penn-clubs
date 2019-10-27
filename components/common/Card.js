import s from 'styled-components'

export const Card = s.div`
  padding: 0.5rem;
  width: 100%;
  box-shadow: 0 0 0 transparent;
  transition: all 0.2s ease;

  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }
`