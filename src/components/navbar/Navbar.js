import './Navbar.css';
import { Outlet } from "react-router-dom";
import DropdownNavLink from "./DropdownNavLink";
import Navlink from "./Navlink";

export default function Navbar() {
  return (
    <div className="Navbar">
      <ul className="Navbar__links Navbar__links-left">
        <li className="Navbar__link-wrapper">
          <Navlink title={"Меню"} />
        </li>
      </ul>
      <Outlet />

      <ul className="Navbar__links Navbar__links-right">
        <DropdownNavLink
          title={'Dropdown1'}
          dropdown={[
          {
            id: 1,
            title: 'Content1',
            handler: () => console.log('working!1')
          },
          {
            id: 2,
            title: 'Content2',
            handler: () => console.log('working!2')
          }
          ]}
        />
        <DropdownNavLink
          title={'Dropdown2'}
          dropdown={[
            {
              id: 3,
              title: 'Content3',
              handler: () => console.log('working!3')
            },
            {
              id: 4,
              title: 'Content4',
              handler: () => console.log('working!4')
            }
          ]}
        />
      </ul>
    </div>
  )
}