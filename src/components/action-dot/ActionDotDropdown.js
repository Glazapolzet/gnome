import './ActionDotDropdown.css';

export default function ActionDotDropdown (props) {

  function handleBtnClick(handler) {
    handler();

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
            key={id}
            className="ActionDotDropdown__btn"
            onClick={() => handleBtnClick(handler)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}