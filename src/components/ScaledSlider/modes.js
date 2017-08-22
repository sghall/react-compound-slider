// Default mode allows crossing.
export function mode1(prev, next) {
  return next;
}

// Prevent duplicate values and crossing
export function mode2(prev, next) {
  for (let i = 0; i < prev.length; i++) {
    if (prev[i].key !== next[i].key) {
      return prev;
    }

    if (next[i - 1] && next[i].val === next[i - 1].val) {
      return prev;
    }

    if (next[i + 1] && next[i].val === next[i + 1].val) {
      return prev;
    }
  }

  return next;
}
