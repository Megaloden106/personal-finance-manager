import React, { FunctionComponent, useState, useEffect } from 'react';
import { Subscription, interval } from 'rxjs';
import { interpolateNumber } from 'd3-interpolate';
import { take } from 'rxjs/operators';
import { indentyCallback } from '@/utils/util';

const d3 = { interpolateNumber };

interface RollingNumberProps {
  nextValue: number;
  formatter?: (value: number) => string;
}

const RollingNumber: FunctionComponent<RollingNumberProps> = ({
  nextValue,
  formatter = indentyCallback,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  let subscription: Subscription;

  useEffect(() => {
    const interpolatedValues = d3.interpolateNumber(currentValue, nextValue);

    // set an interval of 50ms to transition from current to next
    subscription = interval(1)
      .pipe(take(50))
      .subscribe(_i => setCurrentValue(interpolatedValues((_i + 1) * 5 / 250)));

    return () => subscription.unsubscribe();
  }, [nextValue]);

  return <>{formatter(currentValue)}</>;
};

export default RollingNumber;
