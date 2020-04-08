import {controlSigns} from '../../consts';
import {NumberContext} from '../NumberProvider/number-provider';

const ControlPanel = () => {
  const {onClearDisplayButton, changeSign, getPercentOfNumber} = React.useContext(NumberContext);

  return (
    <ul className="main-section_control-panel control-panel">
      {
        controlSigns.map((item, i) => {
          let functionCallback = null;

          switch (item) {
            case controlSigns[0]:
              functionCallback = onClearDisplayButton;
              break;
            case controlSigns[1]:
              functionCallback = changeSign;
              break;
            case controlSigns[2]:
              functionCallback = getPercentOfNumber;
              break;
          }

          return (
            <li
              className="control-panel_item panels-item"
              data-key={item}
              key={i}
              onClick={functionCallback}
            >
              <button
                className="button"
              >{item}
              </button>
            </li>
          );
        })
      }
    </ul>
  );
};

export default ControlPanel;
