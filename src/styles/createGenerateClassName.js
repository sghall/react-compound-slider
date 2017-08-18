// @flow

import warning from "warning";

export default function createGenerateClassName() {
  let ruleCounter = 0;

  return (rule, sheet) => {
    ruleCounter += 1;
    warning(
      ruleCounter < 1e10,
      [
        "You might have a memory leak.",
        "The ruleCounter is not supposed to grow that much."
      ].join("")
    );

    if (process.env.NODE_ENV === "production") {
      return `c${ruleCounter}`;
    }

    if (sheet && sheet.options.meta) {
      return `${sheet.options.meta}-${rule.key}-${ruleCounter}`;
    }

    return `${rule.key}-${ruleCounter}`;
  };
}
