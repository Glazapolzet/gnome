import './Popup.css'

export default function Popup (props) {
  return (
    <div className={`Popup ${props.isOpen ? "Popup__opened" : ""}`}>
      <div className="Popup__top-area">
        <h3 className="Popup__popup-name">{props.name}</h3>
        <button
          type="button"
          className="Popup__close-button"
          onClick={props.onClose}
        />
      </div>
      <h2 className="Popup__title">
        {props.title}
      </h2>
      <p className="Popup__description">
        {props.description}
      </p>
      {props.children}
    </div>
  )
}