import {numbersPanel} from '../../consts';
import {NumberContext} from '../NumberProvider/number-provider';

const NumbersPanel: React.FunctionComponent = () => {
  const {onSetDisplayValue} = React.useContext(NumberContext);

  return (
    <ul className="main-section_numbers-panel number-panel">
      {
        numbersPanel.map((item: number, i: number) => {
          return (
            <li
              className={item === 0 ? `number-panel_item panels-item panels-item--zero` : `number-panel_item panels-item`}
              data-value={item}
              key={i}
              onClick={(evt) => {
                const value = evt.currentTarget.dataset.value;
                onSetDisplayValue(value);
              }}
              onKeyPress={(evt) => {
                const {key} = evt;
                onSetDisplayValue(key);
              }}
            >
              <button className="button">{item}</button>
            </li>
          );
        })
      }
    </ul>
  );
};

export default NumbersPanel;
