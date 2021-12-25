import React, {useRef} from "react";
import burgerListItemStyle from "./BurgerConstructorListItem.module.css";
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {deleteConstructorIngredient, deleteCountIngredient, moveConstructorIngredient} from '../../services/actions/ingredients.js';
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructorListItem = (props) => {
  
  const {index, customID, _id, name, image, price} = props;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const style = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructor_element",
    item: {index, customID},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });


  const [, dropTargetList] = useDrop({
    accept: "constructor_element",
    hover: (draggedItem, monitor) => {
      if (!ref.current) {
        return;
     }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      dispatch(moveConstructorIngredient(dragIndex, hoverIndex)) 

      draggedItem.index = hoverIndex;

    }
  }); 

  const opacity = isDragging ? 0 : 1;
  dragRef(dropTargetList(ref));

  const handleDelete = (customID, itemID) => {
    dispatch(deleteConstructorIngredient(customID));
    dispatch(deleteCountIngredient(itemID));
  }

  return (
    <div ref={ref} style={{...style, opacity}} >
     <li className={burgerListItemStyle.listItem}>
        <div className={burgerListItemStyle.dragIcon}>
        <DragIcon />
        </div>
        <ConstructorElement
          text={name}
          price={price}
          handleClose={() => handleDelete(customID, _id)}
          thumbnail={image}/>
        </li>
    </div>
  )
}

BurgerConstructorListItem.propTypes = {
  index: PropTypes.number.isRequired,
  customID: PropTypes.number.isRequired,
  _id : PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default BurgerConstructorListItem;