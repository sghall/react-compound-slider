import warning from 'warning'

export const prfx = 'react-compound-slider:'

export function getSortByVal(reversed) {
  return function sortByVal(a, b) {
    if (a.val > b.val) {
      return reversed ? -1 : 1
    }

    if (b.val > a.val) {
      return reversed ? 1 : -1
    }

    return 0
  }
}

export function getUpdatedHandles(handles, updateKey, updateValue, reversed) {
  const index = handles.findIndex(v => v.key === updateKey)

  if (index !== -1) {
    const { key, val } = handles[index]

    if (val === updateValue) {
      return handles
    }

    return [
      ...handles.slice(0, index),
      { key, val: updateValue },
      ...handles.slice(index + 1),
    ].sort(getSortByVal(reversed))
  }

  return handles
}

export function getSliderDomain(slider, vertical) {
  if (!slider) {
    return [0, 0]
  }

  const s = slider.getBoundingClientRect()

  const d0 = vertical ? s.top : s.left
  const d1 = vertical ? s.bottom : s.right

  return [d0, d1]
}

export function isNotValidTouch({ type = '', touches }) {
  return (
    !touches ||
    touches.length > 1 ||
    (type.toLowerCase() === 'touchend' && touches.length > 0)
  )
}

export function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX
}

export function getHandles(values = [], reversed, valueToStep, warn) {
  let changes = 0

  const handles = values
    .map(item => {
      const x = (typeof item === 'object') ? item.value : item
      const metadata = (typeof item === 'object') ? item : {}
      const val = valueToStep.getValue(x)

      if (x !== val) {
        changes += 1
        warning(
          !warn,
          `${prfx} Invalid value encountered. Changing ${x} to ${val}.`,
        )
      }

      return { val, metadata };
    })
    .map(({ val, metadata }, i) => ({ key: `$$-${i}`, val, metadata }))
    .sort(getSortByVal(reversed))

  return { handles, changes }
}
