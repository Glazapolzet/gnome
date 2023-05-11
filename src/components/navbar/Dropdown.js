import './Dropdown.css';

export default function Dropdown (props) {

  function handleBtnClick(evt, handler) {
    handler(evt);

    props.toggleDropdown();
  }

  return (
    <div className={`Dropdown ${
      props.isDropdownVisible
        ? "Dropdown__visible"
        : ""}`}
    >
      <ul className="Dropdown__btn-container">
        {props.content.map(({id, title, handler}) => (
          <li
            key={id}
            id={id}
            className="Dropdown__btn"
            onClick={(evt) => handleBtnClick(evt, handler)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}