import {NumberContext} from '../NumberProvider/number-provider';

const Display: React.FunctionComponent = () => {
  const {number} = React.useContext(NumberContext);

  const getNewNumber = (num: string): string => {
    const isContainedDotSign = number.toString().includes(`.`);

    if (isContainedDotSign) {
      const index = number.indexOf(`.`);

      return number.slice(0, index).concat(`,`).concat(number.slice(index + 1));
    }

    return num;
  };

  return (
    <div className="main-section_number-output">
      <input
        className="main-section_number-output-input"
        type="text"
        value={getNewNumber(number)}
        disabled
      />
    </div>
  );
};

export default Display;
