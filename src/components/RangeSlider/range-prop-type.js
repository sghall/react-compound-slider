import { isNumber } from "../utils";

export default function rangePropType(props) {
  const { maxValue, minValue } = props;

  if (!isNumber(minValue) || !isNumber(maxValue)) {
    return new Error('"minValue" and "maxValue" must be a number');
  }

  if (minValue >= maxValue) {
    return new Error('"minValue" must be smaller than "maxValue"');
  }
}
