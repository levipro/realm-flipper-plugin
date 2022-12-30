/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { theme } from 'flipper-plugin';
import { IndexableRealmObject } from '../CommonTypes';

export type DropdownPropertyType = {
  record: IndexableRealmObject | null;
  schemaProperty: Realm.CanonicalObjectSchemaProperty | null;
  currentSchema: Realm.ObjectSchema;
  visible: boolean;
  pointerX: number;
  pointerY: number;
  scrollX: number;
  scrollY: number;
  generateMenuItems: MenuItemGenerator;
};

type MenuItem = {
  key: number;
  text: string;
  onClick: () => void;
};

export type MenuItemGenerator = (
  row: IndexableRealmObject,
  schemaProperty: Realm.CanonicalObjectSchemaProperty,
  schema: Realm.ObjectSchema,
) => Array<MenuItem>;

const listItem = (menuItem: MenuItem) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <li
      onClick={menuItem.onClick}
      key={menuItem.key}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        clear: 'both',
        color: 'rgba(0, 0, 0, 0.65)',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: '22px',
        margin: 0,
        padding: '5px 12px',
        whiteSpace: 'nowrap',
        backgroundColor: hover ? theme.primaryColor : 'white',
        zIndex: 99,
      }}
    >
      {' '}
      <div style={{ color: hover ? 'white' : 'black' }}>{menuItem.text}</div>
    </li>
  );
};

export const CustomDropdown = ({
  generateMenuItems,
  record,
  schemaProperty,
  currentSchema,
  visible,
  pointerX,
  pointerY,
  scrollX,
  scrollY,
}: DropdownPropertyType) => {
  if (visible && schemaProperty && record) {
    const menuItems = generateMenuItems(record, schemaProperty, currentSchema);
    return (
      <ul
        className="popup"
        style={{
          left: `${pointerX + scrollX}px`,
          top: `${pointerY + scrollY}px`,
          position: 'absolute',
          backgroundClip: 'padding-box',
          backgroundColor: '#fff',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          listStyleType: 'none',
          margin: 0,
          outline: 'none',
          padding: 0,
          textAlign: 'left',
          overflow: 'hidden',
          zIndex: '10',
        }}
      >
        {menuItems.map((menuItem) => listItem(menuItem))}
      </ul>
    );
  } else {
    return <></>;
  }
};
