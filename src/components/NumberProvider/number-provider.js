export const NumberContext = React.createContext();

const NumberProvider = (props) => {
  const [number, setNumber] = React.useState(`0`);
  const [savedNumber, setSavedNumber] = React.useState(``);
  const [functionType, setFunctionType] = React.useState(null);

  const onSetDisplayValue = (num) => {
    if (number === `0` && num === `.`) {
      setNumber(number.concat(num));
    } else if (number === `0`) {
      setNumber(num);
    } else if (savedNumber !== `` && functionType !== ``) {
      console.log(`work`)
    } else {
      setNumber(number + num);
    }
  };

  const onClearDisplayButton = () => {
    setNumber(`0`);
    setSavedNumber(``);
    setFunctionType(``);
  };

  const onFunctionButton = (type) => {
    if (number && savedNumber && functionType) {
      doMath(functionType);
    } else {
      setSavedNumber(number);
      setFunctionType(type);

    }
  };

  const doMath = (actionType) => {
    console.log(`called`)
    setNumber(eval(`${savedNumber} ${actionType} ${number}`));
    console.log(typeof actionType)
    console.log(eval(`${number} ${actionType} ${savedNumber}`))
    setSavedNumber(``);
    setFunctionType(``);
  };

  return (
    <NumberContext.Provider
      value={{
        number,
        savedNumber,
        onSetDisplayValue,
        onClearDisplayButton,
        onFunctionButton
      }}
    >
      {props.children}
    </NumberContext.Provider>
  );
};

export default NumberProvider;
