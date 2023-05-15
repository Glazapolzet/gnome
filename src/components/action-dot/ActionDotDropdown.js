import './ActionDotDropdown.css';

export default function ActionDotDropdown (props) {

  function handleBtnClick(evt, handler) {
    handler(evt);

    props.toggleDropdown();
  }

  return (
    <div className={`ActionDotDropdown ${
      props.isDropdownVisible
        ? "ActionDotDropdown__visible"
        : ""}`}
    >
      <ul className="ActionDotDropdown__btn-container">
        {props.content.map(({id, title, handler}) => (
          <li
            id={id}
            key={id}
            className="ActionDotDropdown__btn"
            onClick={(evt) => handleBtnClick(evt, handler)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}