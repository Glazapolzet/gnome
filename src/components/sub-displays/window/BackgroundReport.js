import Report from "./Report";
import './BackgroundReport.css';

export default function BackgroundReport (props) {
  return (
    <Report
      title={'Результаты измерения фона'}
      file={props.file}
    >
      <h3 className={'BackgroundReport__subtitle'}>Аппаратурный спектр фонового излучения:</h3>
      <img
        className={'BackgroundReport__image'}
        src={props.image}
        alt={'Аппаратурный спектр фонового излучения'}
      />
    </Report>
  )
}