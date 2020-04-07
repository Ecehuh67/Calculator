export const NumberContext = React.createContext();

const NumberProvider = (props) => {
  const [number, setNumber] = React.useState(`0`);
  const [savedNumber, setSavedNumber] = React.useState(``);
  const [functionType, setFunctionType] = React.useState(``);
  const [isWaitingForOperand, setWaitingForOperand] = React.useState(false);

  const onSetDisplayValue = (num) => {
    if (number === `0` && num === `.`) {
      setNumber(number.concat(num));
    } else if (number === `0`) {
      setNumber(num);
    } else if (isWaitingForOperand) {
      setNumber(num);
      setWaitingForOperand(false);
    } else {
      setNumber(number + num);
    }
  };

  const onClearDisplayButton = () => {
    setNumber(`0`);
    setSavedNumber(``);
    setFunctionType(``);
    setWaitingForOperand(false);
  };

  const onFunctionButton = (type) => {
    if (number && savedNumber && functionType && !isWaitingForOperand) {
      doMath(functionType);
      console.log(`do math`);
    } else {
      console.log(`save type`);
      setSavedNumber(number);
      setFunctionType(type);
      setWaitingForOperand(true);
    }
  };

  const doMath = (actionType) => {
    console.log(`called`);
    setNumber(eval(`${savedNumber} ${actionType} ${number}`));
    setSavedNumber(``);
    setFunctionType(``);
  };

  console.log(number, savedNumber, functionType, isWaitingForOperand);

  return (
    <NumberContext.Provider
      value={{
        number,
        savedNumber,
        onSetDisplayValue,
        onClearDisplayButton,
        onFunctionButton,
        doMath
      }}
    >
      {props.children}
    </NumberContext.Provider>
  );
};

export default NumberProvider;
