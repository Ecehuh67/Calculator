// import {useState} from 'react';
import {numbersPanel, controlSigns, actions} from '../../consts';

const Calculator = () => {
  const [number, setNumber] = React.useState(0);
  const [sign, setSign] = React.useState('');
  const [isSum, setSum] = React.useState(false);
  const [num1, setNum1] = React.useState(0);

  return (
    <main className="main html-wrapper">
      <section className="main-section">
        <div className="main-section_wrapper">
          <div className="main-section_number-output">
            <input
              className="main-section_number-output-input"
              type="text"
              value={number}
              disabled
            />
          </div>
          <div className="main-section_panels">
            <div className="main-section_buttons-panel">
              <ul className="main-section_control-panel control-panel">
                {
                  controlSigns.map((item, i) => {
                    return (
                      <li
                        className="control-panel_item panels-item"
                        key={i}
                        onClick={
                          (evt) => {
                            if (item === `AC`) {
                              setNumber(0);
                              setNum1(0);
                              setSum(false)
                            }
                          }
                        }
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

              <ul className="main-section_numbers-panel number-panel">
                {
                  numbersPanel.map((item, i) => {
                    return (
                      <li
                        className={item === 0 ? "number-panel_item panels-item panels-item--zero" : "number-panel_item panels-item"}
                        data-value={item}
                        key={[i]}
                        onClick={
                          (evt) => {
                            const value = evt.currentTarget.dataset.value;

                            if (number === 0 || isSum) {
                              setNumber(value);
                              // setBool(false);
                            } else {
                              setNumber(prev => prev + value);
                            }
                          }
                        }
                      >
                        <button className="button">{item}</button>
                      </li>
                    );
                  })
                }
              </ul>

            </div>
            <div className="main-section_additional-panel">
              <ul className="main-section_actions-panel actions-panel ">
                {
                  Object.keys(actions).map((item,i) => {
                    return (
                      <li
                        className={`actions-panel_item panels-item panel-item--${actions[item]}`}
                        data-sign={item}
                        key={i}
                        onClick={
                          (evt) => {
                            const typeAction = evt.currentTarget.dataset.sign;
                            setSign(typeAction);

                            if (num1 !==0) {
                              const num = number;
                              const val = eval(`${num1} ${sign} ${num}`);
                              setNumber(val)
                            } else {
                              setNum1(number);
                              setSum(true)
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Calculator;
