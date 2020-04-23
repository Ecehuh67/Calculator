import {actions} from '../../consts';
import {NumberContext} from '../NumberProvider/number-provider';

const OperatorsPanel: React.FunctionComponent = () => {
  const {onFunctionButton, onEqualSign} = React.useContext(NumberContext);

  return (
    <ul className="main-section_actions-panel actions-panel ">
      {
        Object.keys(actions).map((item: string, i: number) => {
          return (
            <li
              className={`actions-panel_item panels-item panel-item--${actions[item]}`}
              data-sign={item}
              key={i}
              onClick={
                (evt) => {
                  const value = evt.currentTarget.dataset.sign;
                  if (value === `=`) {
                    onEqualSign();
                  } else {
                    onFunctionButton(value);
                  }
                }
              }
            >
              <button className={`button button-additional button--${actions[item]}`}>/</button>
            </li>
          );
        })
      }
    </ul>
  );
};

export default OperatorsPanel;
