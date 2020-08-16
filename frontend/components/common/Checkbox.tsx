import { ReactElement } from 'react'
import s from 'styled-components'

import { CLUBS_RED } from '../../constants/colors'
import { Icon } from './Icon'

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = s.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = s.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  transition: all 150ms;
  cursor: pointer;
  fill: ${(props) => props.color || CLUBS_RED}
`

const CheckboxContainer = s.div`
  display: inline-block;
  vertical-align: middle;
`

export const CheckboxLabel = s.label`
  cursor: pointer;
`

type CheckboxProps = {
  id?: string
  className?: string
  checked: boolean
  onChange: () => void
}

export const Checkbox = ({
  className,
  checked,
  onChange,
  ...props
}: CheckboxProps): ReactElement => {
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} onChange={onChange} {...props} />
      <StyledCheckbox onClick={onChange}>
        <Icon
          alt={checked ? 'checked' : 'unchecked'}
          name={checked ? 'check-box' : 'box'}
        />
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
