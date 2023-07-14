import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteList } from "../../actions/board";
import PropTypes from "prop-types";
import { Button, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const ListMenu = ({ listId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeList = () => {
    dispatch(deleteList(listId));
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <MoreHorizIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            removeList();
            handleClose();
          }}
        >
          Delete List
        </MenuItem>
      </Menu>
    </div>
  );
};

ListMenu.propTypes = {
  listId: PropTypes.number.isRequired,
};

export default ListMenu;
