import App from './app';
import NumberProvider from '../NumberProvider/number-provider';

it(`Render App correctly`, () => {
  const tree = renderer.create(
      <NumberProvider>
        <App/>
      </NumberProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();

});
