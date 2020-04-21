import Calculator from '../calculator/calcutalor';
import NumberProvider from '../NumberProvider/number-provider';

const App: React.FunctionComponent = () => {
  return (
    <NumberProvider>
      <Calculator/>
    </NumberProvider>

  );
};

export default App;
