import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Text from "../assets/text.png";
import CloseIcon from "@mui/icons-material/Close";

const api = process.env.REACT_APP_API_URL;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #8fa8a2",
  width: 350,
  boxShadow: 24,
};

export default function Log({ taskId }) {
  async function displayLogByTask() {
    await fetch(`${api}/logs/${taskId}/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load history.");
        }
        return response.json();
      })
      .then((data) => setLogs(data))
      .catch((error) => console.error(error));
  }

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    displayLogByTask();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        className="text-sm p-2 hover:bg-lightGreen flex items-center gap-2"
        onClick={handleOpen}
      >
        <img
          src={Text}
          className="w-4	h-4"
          alt="click to open a log of this taks's changes history"
        />
        <span>View log</span>
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
              <h3 className="font-bold pb-2 uppercase">Task history:</h3>
              <div>
                {!logs.length ? (
                  <div>Loading....</div>
                ) : (
                  <ul>
                    {logs?.map((log) => {
                      return (
                        <li key={log._id}>
                          Task: <i>{log.taskid && <b>{log.taskid.name}</b>}</i>
                          <br />
                          user:{" "}
                          {log.user && (
                            <span>
                              by <b>{log.user.username}</b>
                            </span>
                          )}
                          <br />
                          Description: {log.logDescription} <br />
                          Date:{" "}
                          <span className="text-sm">
                            ({log.createdAt.slice(0, 10)},{" "}
                            {log.createdAt.slice(11, 16)})
                          </span>
                          <br />
                          <hr  className="mb-2 mt-2"/>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
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
