import { NumberContext } from '../NumberProvider/number-provider'

const Display = () => {
  const {number} = React.useContext(NumberContext);
  const getNewNumber = (num) => {
    const isContainedDotSign = number.toString().includes(`.`);
    if (!isContainedDotSign) {
      return num;
    } else {
      const index = number.indexOf(`.`);
      return number.slice(0, index).concat(`,`).concat(number.slice(index + 1));
    }
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
