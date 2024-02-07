import React, { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InviteUser from "../assets/invite-user.png";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #8fa8a2",
  boxShadow: 24,
};

export default function Invite({ taskId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="inline-block">
      <div className="cursor-pointer max-w-7" onClick={handleOpen}>
        <img
          className="w-5 h-5"
          src={InviteUser}
          alt="click to open a log of this taks's changes history"
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="relative">
            <div className="p-2">
              <h3 className="font-bold pb-2">Invite someone:</h3>
              <form>
                <label className="" htmlFor="email">
                  Email Adress:
                </label>
                <input
                  className="w-full"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Adress"
                  required
                />
                <Button className="mt-10" color="primary" type="submit">
                  Save
                </Button>
              </form>
            </div>
            <CloseIcon
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
