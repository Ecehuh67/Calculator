import Display from './display';
import NumberProvider from '../NumberProvider/number-provider';

it(`Render Display correctly`, () => {
  const tree = renderer.create(
      <NumberProvider>
        <Display/>
      </NumberProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
