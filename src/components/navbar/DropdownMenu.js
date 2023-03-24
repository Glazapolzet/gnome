import './DropdownMenu.css';

export default function DropdownMenu (props) {
  return (
    <ul className="DropdownMenu">
      {props.content.map(({id, title, handler}) => (
        <li
          key={id}
          className="DropdownMenu__btn"
          onClick={handler}
        >
          {title}
        </li>
      ))}
    </ul>
  )
}