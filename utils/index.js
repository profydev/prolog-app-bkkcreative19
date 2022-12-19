import React from "react";

export const pickChildByProps = (children, key, value) => {
  const target = [];
  const withoutPropChildren = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return null;
    if (!item.props) return item;
    if (item.props[key] === value) {
      target.push(item);
      return null;
    }
    return item;
  });

  const targetChildren = target.length >= 0 ? target : undefined;

  return [withoutPropChildren, targetChildren];
};
