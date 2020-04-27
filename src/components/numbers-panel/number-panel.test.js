import NumbersPanel from "./numbers-panel";
import NumberProvider from "../NumberProvider/number-provider";

it(`Render NumbersPanel correctly`, () => {
  const tree = renderer.create(
      <NumberProvider>
        <NumbersPanel />
      </NumberProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
