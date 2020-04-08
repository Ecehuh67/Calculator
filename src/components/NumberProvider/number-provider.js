const NumberContext = React.createContext();

const NumberProvider = (props) => {
  const [number, setNumber] = React.useState(`0`);
  const [savedNumber, setSavedNumber] = React.useState(``);
  const [functionType, setFunctionType] = React.useState(``);
  const [isWaitingForOperand, setWaitingForOperand] = React.useState(false);

  const onSetDisplayValue = (num) => {
    if (number === `0` && num === `.`) {
      setNumber(number + num);
    } else if (num === `.`) {
      const isContainedDot = number.includes(`.`);

      if (isContainedDot) {
        setNumber(number);
      } else {
        setNumber(number.concat(num));
      }
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

  const changeSign = () => {
    +number !== 0 ? setNumber((+number * -1).toString()) : ``;
    return null;
  };

  const getPercentOfNumber = () => {
    if (+number !== 0) {
      setNumber((+number * 0.01).toString());
    }
  };

  const onFunctionButton = (type) => {
    if (number && savedNumber && functionType && !isWaitingForOperand) {
      doMath(functionType);
    } else {
      setSavedNumber(number);
      setFunctionType(type);
      setWaitingForOperand(true);
    }
  };

  const onEqualSign = () => {
    doMath(functionType);
  };

  const doMath = (actionType) => {
    setNumber(eval(`${savedNumber} ${actionType} ${number}`).toString());
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
        doMath,
        changeSign,
        getPercentOfNumber,
        onEqualSign
      }}
    >
      {props.children}
    </NumberContext.Provider>
  );
};

export default NumberProvider;
export {NumberContext};
