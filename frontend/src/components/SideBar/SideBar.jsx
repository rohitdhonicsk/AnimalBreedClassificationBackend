import React from "react";
import "./SideBar.css"
const SideBar = (props) => {
    const { handleChange, data, selected } = props;
    console.log("Inside Side Bar selected Breed", selected)
    return (
        <ul className="list-group sidebar" style={{ color: "red", marginTop: "35px" }}>

            {data.map((item) => (
                <li
                    className={
                        selected === item
                            ? "list-group-item active"
                            : "list-group-item "
                    }
                    onClick={() => handleChange(item)}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};
// SideBar.defaultProps = {
//   GenreId: "_id",
//   GenreName: "name",
// };

export default SideBar;
