import React from "react";

import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  let dayClass = classnames("day-List__item", {
    "--selected": props.selected,
    "--full": props.spots === 0
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots ? props.spots : "no"} spots remaining</h3>
    </li>
  );
}