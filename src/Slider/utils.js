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

export function getUpdatedValues(values, updateKey, updateValue, reversed) {
  const index = values.findIndex(v => v.key === updateKey)

  if (index !== -1) {
    const { key, val } = values[index]

    if (val === updateValue) {
      return values
    }

    return [
      ...values.slice(0, index),
      { key, val: updateValue },
      ...values.slice(index + 1),
    ].sort(getSortByVal(reversed))
  }

  return values
}

export function getSliderDomain(slider, vertical, scale) {
  if (!slider) {
    return [0, 0]
  }

  const s = slider.getBoundingClientRect()

  const d0 = vertical ? s.top : s.left
  const d1 = vertical ? s.bottom : s.right

  const k = Math.abs(d0 - d1) / scale.n / 2

  return [d0 - k, d1 + k]
}

function precision(num) {
  const m = `${num}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)

  if (!m) {
    return 0
  }

  return Math.max(0, (m[1] ? m[1].length : 0) - (m[2] ? +m[2] : 0))
}

export function getStepRange(min, max, step) {
  const fixed = precision(step)

  const pMin = +min.toFixed(fixed)
  const pMax = +max.toFixed(fixed)

  const range = []

  let next = pMin

  while (next <= pMax) {
    range.push(next)
    next = +(next + step).toFixed(fixed)

    if (range.length > 1000000) {
      throw new Error('Slider range is too large.  Increase step value.')
    }
  }

  return range
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

export function updateRange([min, max], step, reversed, state) {
  const { valueToStep, valueToPerc, pixelToStep } = state

  const range = getStepRange(min, max, step)

  valueToStep.setRange(range).setDomain([min - step / 2, max + step / 2])

  if (reversed === true) {
    valueToPerc.setDomain([min, max]).setRange([100, 0])
    range.reverse()
  } else {
    valueToPerc.setDomain([min, max]).setRange([0, 100])
  }

  pixelToStep.setRange(range)

  warning(
    max > min,
    `${prfx} Max must be greater than min (even if reversed). Max is ${max}. Min is ${min}.`,
  )

  const maxInRange = 100001

  warning(
    range.length <= maxInRange,
    `${prfx} Increase step value (set to ${step} currently). Found ${range.length.toLocaleString()} values in range. Max is ${maxInRange.toLocaleString()}.`,
  )

  const last = range.length - 1

  warning(
    range[reversed ? last : 0] === min && range[reversed ? 0 : last] === max,
    `${prfx} The range is incorrectly calculated. Check domain (min, max) and step values.`,
  )
}
