import './CalibrationReport.css';

import Report from "./Report";

export default function CalibrationReport (props) {
  return (
    <Report
      title={'Результаты энергетической калибровки'}
      file={props.file}
    >
      <h3 className={'CalibrationReport__subtitle'}>Аппаратурный спектр контрольного источника:</h3>
      <img
        className={'CalibrationReport__image'}
        src={props.image}
        alt={'Аппаратурный спектр контрольного источника'}
      />
    </Report>
  )
}