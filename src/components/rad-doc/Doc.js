import './Doc.css';

export default function Doc (props) {
  return (
    <section className="Doc">
      <a className="Doc__link" href={props.link} />
    </section>
  )
}


