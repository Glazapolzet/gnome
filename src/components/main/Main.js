import './Main.css';
import MainHeader from "./MainHeader";
import Form from "./Form";

export default function Main () {
  return (
    <section className="Main">
      <div className="Main__container">
        <div className="Main__login-area">
          <MainHeader />
          <Form />
        </div>
        <div className="Main__icon-area">
          <div className="Main__icon"></div>
        </div>
      </div>
    </section>
  )
}