import './Navbar.css';
import { Outlet } from "react-router-dom";
import DropdownNavLink from "./DropdownNavLink";
import Navlink from "./Navlink";
import TimeCounter from "./TimeCounter";
import beaker from "../../images/beaker-20-solid.svg";
import book from "../../images/book-open.svg";
import info from "../../images/info.svg";

export default function Navbar() {
  return (
    <div className="Navbar">
      <ul className="Navbar__links Navbar__links-left">
        <li className="Navbar__link-wrapper">
          <Navlink title={"Меню"} leadingTo={"/"} />
        </li>
        <li className="Navbar__link-wrapper">
          <TimeCounter />
        </li>
        <li className="Navbar__link-wrapper">
          <DropdownNavLink
            icon={beaker}
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
              }]}
          />
        </li>
        <li className="Navbar__link-wrapper">
          <Navlink
            icon={book}
            leadingTo={"/rad-doc"}
          />
        </li>
      </ul>
      <Outlet />

      <ul className="Navbar__links Navbar__links-right">
        <li className="Navbar__link-wrapper">
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
        </li>
        <li className="Navbar__link-wrapper">
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
        </li>
      </ul>
    </div>
  )
}