import { getUpdatedHandles } from './utils';
import { HandleItem } from '../types';

// default mode
export function mode1(_: HandleItem[], next: HandleItem[]) {
  return next;
}

// prevent duplicate values and crossing
export function mode2(curr: HandleItem[], next: HandleItem[]) {
  for (let i = 0; i < curr.length; i++) {
    if (curr[i].key !== next[i].key) {
      return curr;
    }

    if (next[i + 1] && next[i].val === next[i + 1].val) {
      return curr;
    }
  }

  return next;
}

// pushable mode
export function mode3(
  curr: HandleItem[],
  next: HandleItem[],
  step: number,
  reversed: boolean,
  getValue: (x: number) => number
): HandleItem[] {
  let indexForMovingHandle = -1;
  let handleMoveIsPositive = true;

  for (let i = 0; i < curr.length; i++) {
    const c = curr[i];
    const n = next[i];

    // make sure keys are in same order if not return curr
    if (!n || n.key !== c.key) {
      return curr;
    } else if (n.val !== c.val) {
      indexForMovingHandle = i;
      handleMoveIsPositive = n.val - c.val > 0;
    }
  }

  // nothing has changed (shouldn't happen but just in case).
  if (indexForMovingHandle === -1) {
    return curr;
  } else {
    const increment = handleMoveIsPositive ? step : -step;

    for (let i = 0; i < next.length; i++) {
      const n0 = next[i];
      const n1 = next[i + 1];

      if (n1 && n0.val === n1.val) {
        if (i === indexForMovingHandle) {
          const newStep = n1.val + increment;
          if (getValue(newStep) === newStep) {
            const clone = getUpdatedHandles(
              next,
              n1.key,
              n1.val + increment,
              reversed
            );
            const check = mode3(next, clone, step, reversed, getValue);

            if (check === next) {
              return curr;
            } else {
              return check;
            }
          } else {
            return curr;
          }
        } else {
          const newStep = n0.val + increment;
          if (getValue(newStep) === newStep) {
            const clone = getUpdatedHandles(
              next,
              n0.key,
              n0.val + increment,
              reversed
            );
            const check = mode3(next, clone, step, reversed, getValue);

            if (check === next) {
              return curr;
            } else {
              return check;
            }
          } else {
            return curr;
          }
        }
      }
    }
  }

  return next;
}
