import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const toggleEdit = (value) => {
    setEditing(value);
   // console.log(colors)
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put(`http://localhost:5000/api/colors/${editColor.id}`, editColor)
    .then(res => {
      console.log(colors, editColor);
      fetchColorService(setColors);
      toggleEdit(false);
    })
    .catch(err => {
      console.log('saveEdit:', err)
    })
    
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${colorToDelete.id}`,)
    .then(res => {
      setColors(colors.filter(color => colorToDelete.id !== color.id));
      console.log('New Color List:', colors)
    })
    .catch(err => {
      console.log('deleteColor:', err)
    })

  };

  useEffect(() => {
     fetchColorService(setColors)
  }, [])

  return (
    <div className="container" >
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
