import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from 'modules/store';
import Counter from 'components/Counter';

const CounterContainer = () => {
  const { number } = useSelector(state => state.store);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => {
    dispatch(increase());
  }, [dispatch]);
  const onDecrease = useCallback(() => {
    dispatch(decrease());
  }, [dispatch]);
  return (
    <Counter
      number={number}
      increase={onIncrease}
      decrease={onDecrease}
    />
  )
};

export default CounterContainer;