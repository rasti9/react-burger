import React, {useRef} from "react";
import burgerListItemStyle from "./BurgerConstructorListItem.module.css";
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {deleteConstructorIngredient, deleteCountIngredient, moveConstructorIngredient} from '../../services/actions/index.js';
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructorListItem = (props) => {
  
  const item = props;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const style = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructor_element",
    item: item,
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
      const hoverIndex = item.index;

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

  const handleDelete = (item) => {
    dispatch(deleteConstructorIngredient(item));
    dispatch(deleteCountIngredient(item));
  }

  return (
    <div ref={ref} style={{...style, opacity}} >
        <DragIcon />
        <li className="ml-2 mb-3">
        <ConstructorElement
          text={item.name}
          price={item.price}
          handleClose={() => handleDelete(item)}
          thumbnail={item.image}/>
        </li>
    </div>
  )
}

BurgerConstructorListItem.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default BurgerConstructorListItem;