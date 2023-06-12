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
          >
            <button
              onClick={() => handleBtnClick(handler)}
              style={{
                padding: 0,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'inherit',
                width: '100%',
                height: '100%',
                fontSize: '16px',
                fontStyle: 'inherit',
                textAlign: 'start',
              }}>
              {title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}