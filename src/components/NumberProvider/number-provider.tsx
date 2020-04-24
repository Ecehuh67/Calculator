import {PROHIBITION_LENGTH, DEFAULT_VALUE, DOT_SIGN} from '../../consts';

// Type a case we is getting only a node through props 
type NumberProps = {
  children: React.ReactNode
};

// Create an interface to type Context
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

// Create a context to use variables through entire App withoput making 'drilling props'
const NumberContext = React.createContext<NumberInterface | null>(null);

const NumberProvider = (props: NumberProps) => {

  // Create a hook to value on the display
  const [number, setNumber] = React.useState<string>(`0`);

  // Create a hook to control the first numeric
  const [savedNumber, setSavedNumber] = React.useState<string>(``);

  // Create a hook for saving operator sign to do math further
  const [functionType, setFunctionType] = React.useState<string>(``);

  // Create a hook to be sure we aren't going to change operators 
  const [isWaitingForOperand, setWaitingForOperand] = React.useState<boolean>(false);

  // Set up a prohibition for putting numbers not more then 15 signs
  if (number.length > PROHIBITION_LENGTH) {
    const newNumber = number.slice(0, PROHIBITION_LENGTH);
    alert('There is a limit for numbers, it is limited by 15 (fifteen) signs')
    setNumber(newNumber)
  }

  console.log('number', number)
  console.log('savNum', savedNumber)
  console.log('operator', functionType)
  console.log(isWaitingForOperand)

  const onSetDisplayValue = (num: string): void => {
    switch(true) {
      case savedNumber !== '' && num === DOT_SIGN && isWaitingForOperand:
        setNumber(DEFAULT_VALUE + num)
        console.log('work 0')
        break;
      case number === DEFAULT_VALUE && num === DOT_SIGN:
        setNumber(number + num);
        break;
      case num === `.` && !savedNumber && !functionType:
        const isContainedDot: boolean = number.includes(`.`);
        if (isContainedDot) {
          setNumber(number);
        } else {
          setNumber(number.concat(num));
        }
        break;
      case number === DEFAULT_VALUE:
        setNumber(num)
        break;
      case isWaitingForOperand:
        if (number.includes(DEFAULT_VALUE + DOT_SIGN)) {
          setNumber(number + num)
        } else {
          setNumber(num);
        }
        setWaitingForOperand(false);
        break;
      case number !== DEFAULT_VALUE:
        setNumber(number + num);
        break;
    }

  }

  // const onSetDisplayValue = (num: string): void => {
  //   if (number === `0` && num === `.`) {
  //     setNumber(number + num);
  //   } else if (num === `.` && !savedNumber && !functionType) {
  //     const isContainedDot: boolean = number.includes(`.`);

  //     if (isContainedDot) {
  //       setNumber(number);
  //     } else {
  //       setNumber(number.concat(num));
  //     }
  //   } else if (number === `0`) {
  //     setNumber(num);
  //   } else if (isWaitingForOperand) {
  //     setNumber(num);
  //     setWaitingForOperand(false);
  //   } else {
  //     setNumber(number + num);
  //   }
  // };

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
    
    // if (value.length > 17) {
    //   const firstNumber = savedNumber.length;
    //   const secondNumber = number.length;
    //   const length = Math.max(firstNumber, secondNumber);

    //   value = eval(`${savedNumber} ${actionType} ${number}`).toPrecision(length).toString();
    // }

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
