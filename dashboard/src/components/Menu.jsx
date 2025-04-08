import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  let [menuOptions, setMenuOptions] = useState(0);
  let [profileDropdown, setProfileDropdown] = useState(false);

  const handleMenu = (index) => {
    setMenuOptions(index);
  };
  const handleProfile = () => {
    setProfileDropdown(!profileDropdown);
  };

  const activeMenu = "menu selected";
  const menu = "menu";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenu(0)}
            >
              <p className={menuOptions === 0 ? activeMenu : menu}>Dashboard</p>
            </Link>
          </li>
          <li>
          <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenu(1)}
            >
              <p className={menuOptions === 1 ? activeMenu : menu}>Orders</p>
            </Link>
          </li>
          <li>
          <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenu(2)}
            >
              <p className={menuOptions === 2 ? activeMenu : menu}>Holdings</p>
            </Link>
          </li>
          <li>
          <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenu(3)}
            >
              <p className={menuOptions === 3 ? activeMenu : menu}>Positions</p>
            </Link>
          </li>
          <li>
          <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenu(4)}
            >
              <p className={menuOptions === 4 ? activeMenu : menu}>Funds</p>
            </Link>
          </li>
          <li>
          <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenu(5)}
            >
              <p className={menuOptions === 5 ? activeMenu : menu}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfile}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
