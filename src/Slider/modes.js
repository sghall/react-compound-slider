// default mode
export function mode1(currValues, nextValues) {
  return nextValues
}

// prevent duplicate values and crossing
export function mode2(currValues, nextValues) {
  for (let i = 0; i < currValues.length; i++) {
    if (currValues[i].key !== nextValues[i].key) {
      return currValues
    }

    if (nextValues[i + 1] && nextValues[i].val === nextValues[i + 1].val) {
      return currValues
    }
  }

  return nextValues
}
