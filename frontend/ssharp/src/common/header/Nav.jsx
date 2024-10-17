import React, { useRef, useEffect, useState } from 'react';

const Nav = () => {
  const containerRef = useRef(null);
  const userId = { id: 1 };

  useEffect(() => {
    if (containerRef.current) {
      const spanElement = document.createElement('span');
      spanElement.className = 'menu-trigger';
      spanElement.innerHTML = '<i class="fal fa-angle-down"></i>';
      containerRef.current.appendChild(spanElement);
    }
  }, []);

  const [menuItems, setMenuItems] = useState([
    {
      label: '새글작성',
      link: '/write',
    },
    {
      label: '북마크',
      link: `/bookmark-list/${userId.id}`,
    },
  ]);
  useEffect(() => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) =>
        item.submenu && item.submenu.length > 0
          ? { ...item, hasSubmenu: true }
          : item
      )
    );
  }, []);

  const handleSubmenuToggle = (index) => {
    setMenuItems((prevMenuItems) => {
      const newMenuItems = [...prevMenuItems];
      newMenuItems[index].submenuOpen = !newMenuItems[index].submenuOpen;
      return newMenuItems;
    });
  };

  return (
    <ul className='primary-menu'>
      {menuItems.map((item, index) => (
        <li key={index}>
          <a href={item.link}>{item.label}</a>

          {item.submenu && (
            <span
              className={`menu-trigger ${item.submenuOpen ? 'open' : ' '}`}
              onClick={() => handleSubmenuToggle(index)}
            >
              <i
                className={`submenu-icon ${
                  item.submenuOpen ? 'fal fa-angle-up' : 'fal fa-angle-down'
                }`}
              ></i>
            </span>
          )}
          {item.submenu && (
            <ul className={`submenu ${item.submenuOpen ? 'open' : ''}`}>
              {item.submenu.map((subitem, subindex) => (
                <li key={subindex}>
                  <a href={subitem.link}>{subitem.label}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
export default Nav;
