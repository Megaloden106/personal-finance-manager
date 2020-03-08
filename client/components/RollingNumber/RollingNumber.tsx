import React, { FC, useState, useEffect } from 'react';
import { interval } from 'rxjs';
import { interpolateNumber } from 'd3-interpolate';
import { take } from 'rxjs/operators';
import { RollingNumberProps } from './RollingNumber.models';

const d3 = { interpolateNumber };

const RollingNumber: FC<RollingNumberProps> = ({ nextValue, formatter }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const interpolatedValues = d3.interpolateNumber(currentValue, nextValue);

    // set an interval of 50ms to transition from current to next
    const subscription = interval(1)
      .pipe(take(50))
      .subscribe(_i => setCurrentValue(interpolatedValues((_i + 1) * 5 / 250) || 0));

    return () => subscription.unsubscribe();
  }, [nextValue]);

  return <>{formatter ? formatter(currentValue) : currentValue}</>;
};

export default RollingNumber;
