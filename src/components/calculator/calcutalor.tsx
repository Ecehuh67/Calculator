import Display from '../display/display';
import ControlPanel from '../controls-panel/controls-panel';
import NumbersPanel from '../numbers-panel/numbers-panel';
import OperatorsPanel from '../operators-panel/operators-panel';
import {NumberContext} from '../NumberProvider/number-provider';


const Calculator: React.FunctionComponent = () => {
  const {onKeyDown} = React.useContext(NumberContext);

  React.useEffect(() => {
    document.addEventListener(`keydown`, onKeyDown);

    return () => document.removeEventListener(`keydown`, onKeyDown);
  });

  return (
    <main className="main html-wrapper">
      <section className="main-section">
        <div className="main-section_wrapper">
          <Display/>
          <div className="main-section_panels">
            <div className="main-section_buttons-panel">
              <ControlPanel/>
              <NumbersPanel/>
            </div>
            <div className="main-section_additional-panel">
              <OperatorsPanel/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Calculator;
