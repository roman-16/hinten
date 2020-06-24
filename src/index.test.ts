import { act, renderHook } from '@testing-library/react-hooks';
import createStore from '.';

const useRetext = createStore(global.store);

it('updates the state on dispatch', () => {
  const { result } = renderHook(useRetext);

  act(() => {
    result.current.dispatch.setCount(100);
    result.current.dispatch.increment();
    result.current.dispatch.sideMenu.increment();
  });

  expect(result).toMatchSnapshot();
});

it('selects the nested state', () => {
  const { result: outerHook } = renderHook(useRetext);
  const { result: innerHook } = renderHook(() => useRetext('sideMenu'));

  act(() => {
    outerHook.current.dispatch.increment();
    innerHook.current.dispatch.increment();
    innerHook.current.dispatch.toggle();
  });

  expect(outerHook).toMatchSnapshot();
  expect(innerHook).toMatchSnapshot();
});
