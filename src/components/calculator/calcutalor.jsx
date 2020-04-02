import {numbersPanel, controlSigns, actions} from '../../consts';

const Calculator = () => {

  return (
    <main className="main html-wrapper">
      <section className="main-section">
        <div className="main-section_wrapper">
          <div className="main-section_number-output">
            <input
              className="main-section_number-output-input"
              type="text"
              disabled
            />
          </div>
          <div className="main-section_panels">
            <div className="main-section_buttons-panel">
              <ul className="main-section_control-panel control-panel">
                {
                  controlSigns.map((item, i) => {
                    return (
                      <li className="control-panel_item panels-item" key={i}>
                        <button className="button">{item}</button>
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
                        key={[i]}
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
                         key={i}
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
