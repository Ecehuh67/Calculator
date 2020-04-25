import Calculator from './calcutalor';
import NumberProvider from '../NumberProvider/number-provider';


it(`Render Calculator correctly`, () => {
  const tree = renderer.create(
      <NumberProvider>
        <Calculator/>
      </NumberProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
