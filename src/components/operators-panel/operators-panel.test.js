import OperatosPanel from './operators-panel';
import NumberProvider from '../NumberProvider/number-provider';

it(`render OperatorsPanel correctly`, ()=> {
  const tree = renderer.create(
      <NumberProvider>
        <OperatosPanel/>
      </NumberProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
