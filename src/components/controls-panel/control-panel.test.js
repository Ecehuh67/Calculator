import ControlPanel from './controls-panel';
import NumberProvider from '../NumberProvider/number-provider';

it(`render correctly`, () => {
  const tree = renderer.create(
      <NumberProvider>
        <ControlPanel/>
      </NumberProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
