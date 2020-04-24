import {PROHIBITION_LENGTH, DEFAULT_VALUE, DOT_SIGN, DEFAULT_CAPACITY} from '../../consts';

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

  // Function which controls view of the display. Main logic for number panel 
  const onSetDisplayValue = (num: string): void => {
    switch(true) {
      case savedNumber !== '' && num === DOT_SIGN && isWaitingForOperand:
        setNumber(DEFAULT_VALUE + num);
        setWaitingForOperand(false);
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
        setNumber(num);
        setWaitingForOperand(false);
        break;
      case number !== DEFAULT_VALUE:
        setNumber(number + num);
        break;
    }
  }

  // Reset calculator to an initial state
  const onClearDisplayButton = (): void => {
    setNumber(`0`);
    setSavedNumber(``);
    setFunctionType(``);
    setWaitingForOperand(false);
  };

  // Change a sign of number to opposite 
  const changeSign = (): void => {
    if (+number !== 0) {
      setNumber((+number * -1).toString());
    }
    return null;
  };

  // Convert number to percents
  const getPercentOfNumber = (): void => {
    if (+number !== 0) {
      setNumber((+number * 0.01).toString());
    }
  };

  // Describe functions for panel with operators of actions
  const onFunctionButton = (type: string): void => {
    if (number && savedNumber && functionType && !isWaitingForOperand) {
      doMath(functionType);
    } else {
      setSavedNumber(number);
      setFunctionType(type);
      setWaitingForOperand(true);
    }
  };

  // Distinguish equal sign into separate function
  const onEqualSign = (): void => {
    doMath(functionType);
  };

  // Function for calculating numerics
  const doMath = (actionType: string): void => {
    // eslint-disable-next-line no-eval
    let value = eval(`${savedNumber} ${actionType} ${number}`).toString();
    const isDot = value.includes('.');

    if (isDot) {
      const capacityLength = value.slice(0, value.length - DEFAULT_CAPACITY).length;
      const length = Math.max(savedNumber.length, number.length) - DEFAULT_CAPACITY;

      if (capacityLength > 15) {
        value = eval(`${savedNumber} ${actionType} ${number}`)
          .toString()
          .slice(0, length + DEFAULT_CAPACITY);
      }
    }

    setNumber(value);
    setSavedNumber(``);
    setFunctionType(``);
  };

  // Describe object for using it in the Context to make it shorter 
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
