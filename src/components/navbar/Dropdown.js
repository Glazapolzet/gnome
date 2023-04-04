import './Dropdown.css';

export default function Dropdown (props) {

  function handleBtnClick(handler) {
    handler();

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
            className="Dropdown__btn"
            onClick={() => handleBtnClick(handler)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}