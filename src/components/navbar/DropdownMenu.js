import './DropdownMenu.css';

export default function DropdownMenu (props) {

  function handleBtnClick(handler) {
    handler();

    props.toggleDropdown();
  }

  return (
    <ul className="DropdownMenu">
      {props.content.map(({id, title, handler}) => (
        <li
          key={id}
          className="DropdownMenu__btn"
          onClick={() => handleBtnClick(handler)}
        >
          {title}
        </li>
      ))}
    </ul>
  )
}