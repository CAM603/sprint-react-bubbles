import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  })
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data)
        let updatedBubbles = colors.map(color => color.id === colorToEdit.id ? color = colorToEdit : color)
        updateColors(updatedBubbles)
        setEditing(false)
      })
      .catch(err => {
        console.log(err)
        setEditing(false)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res)
        let updatedBubbles = colors.filter(color => color.id !== res.data)
        updateColors(updatedBubbles)
      })
      .catch(err => console.log(err))
  };

  const addColor = (event) => {
    event.preventDefault()
    axiosWithAuth()
      .post(`/colors`, newColor)
      .then(res => {
        updateColors(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {!editing && (
        <form onSubmit={addColor}>
            <legend>Add color</legend>
            <label>
              color name:
              <input
                onChange={e =>
                  setNewColor({ ...newColor, color: e.target.value })
                }
                value={newColor.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e =>
                  setNewColor({
                    ...newColor,
                    code: { hex: e.target.value }
                  })
                }
                value={newColor.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
            </div>
          </form>
      )}
    </div>
  );
};

export default ColorList;
