import {NumberContext} from '../NumberProvider/number-provider';

const Display = () => {
  const {number} = React.useContext(NumberContext);

  return (
    <div className="main-section_number-output">
      <input
        className="main-section_number-output-input"
        type="text"
        value={number}
        disabled
      />
    </div>
  );
};

export default Display;
