type NumberProps = {
  children: React.ReactNode
};

interface NumberInterface {
  number: string,
  savedNumber: string,
  onSetDisplayValue: (num: string) => void,
  onClearDisplayButton: () => void,
  onFunctionButton: (type: string) => void,
  doMath: (actionType: string) => void,
  changeSign: () => void,
  getPercentOfNumber: () => void,
  onEqualSign: () => void
};

const NumberContext = React.createContext<NumberInterface | null>(null);

const NumberProvider = (props: NumberProps) => {
  const [number, setNumber] = React.useState<string>(`0`);
  const [savedNumber, setSavedNumber] = React.useState<string>(``);
  const [functionType, setFunctionType] = React.useState<string>(``);
  const [isWaitingForOperand, setWaitingForOperand] = React.useState<boolean>(false);

  const onSetDisplayValue = (num: string): void => {
    if (number === `0` && num === `.`) {
      setNumber(number + num);
    } else if (num === `.`) {
      const isContainedDot: boolean = number.includes(`.`);

      if (isContainedDot) {
        setNumber(number);
      } else {
        setNumber(number.concat(num));
        console.log(number)
        console.log('yes')
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

  const onClearDisplayButton = (): void => {
    setNumber(`0`);
    setSavedNumber(``);
    setFunctionType(``);
    setWaitingForOperand(false);
  };

  const changeSign = (): void => {
    if (+number !== 0) {
      setNumber((+number * -1).toString());
    }
    return null;
  };

  const getPercentOfNumber = (): void => {
    if (+number !== 0) {
      setNumber((+number * 0.01).toString());
    }
  };

  const onFunctionButton = (type: string): void => {
    if (number && savedNumber && functionType && !isWaitingForOperand) {
      doMath(functionType);
    } else {
      setSavedNumber(number);
      setFunctionType(type);
      setWaitingForOperand(true);
    }
  };

  const onEqualSign = (): void => {
    doMath(functionType);
  };

  const doMath = (actionType: string): void => {
    // eslint-disable-next-line no-eval
    let value = eval(`${savedNumber} ${actionType} ${number}`).toString();
    
    if (value.length > 17) {
      const firstNumber = savedNumber.length;
      const secondNumber = number.length;
      const length = Math.max(firstNumber, secondNumber);


      value = eval(`${savedNumber} ${actionType} ${number}`).toPrecision(length).toString();
    }
    console.log(value)

    setNumber(eval(`${savedNumber} ${actionType} ${number}`).toString());
    setSavedNumber(``);
    setFunctionType(``);
  };

  const sampleAppContext: NumberInterface = {
      number,
      savedNumber,
      onSetDisplayValue,
      onClearDisplayButton,
      onFunctionButton,
      doMath,
      changeSign,
      getPercentOfNumber,
      onEqualSign
  };

  return (
    <NumberContext.Provider 
      value={sampleAppContext}
    >
      {props.children}
    </NumberContext.Provider>
  );
};

export default NumberProvider;
export {NumberContext};
