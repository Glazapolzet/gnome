import './Popup.css'

// Поддерживай файловую структуру - каждый попап в отдельной папке
// Проведи небольшой ренейминг - FirstTimePopup - не самое интуитивное название

export default function Popup (props) {

  // Можно сделать так 
  // 
  // [open, setOpen] = useState(true)
  // function toggle() {
  //  setOpen(!open)
  // }
  // 
  // ...
  // <Styled style={{
  //  visibility: open ? "visible" : "hidden"
  // }}/>

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