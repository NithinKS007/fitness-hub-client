import * as React from "react";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";

interface SortButtonProps {}

const trainerMenuItems = [
  { label: "aA - zZ", action: "aA - zZ" },
  { label: "zZ - aA", action: "zZ - aA" },
];

const SortButton: React.FC<SortButtonProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("aA - zZ"); // Default option
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab" || event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleMenuAction = (action: string) => {
    setSelectedOption(action);
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#333",
          borderRadius: "10px",
          border: "0.5px solid lightgrey",
          padding: "8px 30px",
          bgcolor: "transparent",
          fontSize: "16px",
          textTransform: "none",
        }}
      >
        Sort by : {selectedOption}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper
              sx={{
                width: anchorRef.current ? anchorRef.current.offsetWidth : "auto", // Ensure the dropdown matches button width
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {trainerMenuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleMenuAction(item.action)}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default SortButton;
