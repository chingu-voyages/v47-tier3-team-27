import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import dataAPI from "../services/dataAPI";

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

export default function Log({ taskId, children }) {
  const [logs, setLogs] = useState([]);

  const getDataLog = async () => {
    const response = await dataAPI.displayLogByTask(taskId);
    setLogs(response.taskHistory);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    getDataLog();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>

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
                {logs?.length === 0 ? (
                  <p>No history yet.</p>
                ) : (
                  <ul>
                    {logs?.map((log) => {
                      return (
                        <li
                          key={log._id}
                          className="flex justify-between gap-4"
                        >
                          <span>{log.logDescription}</span>
                          <span className="text-sm">
                            ({log.createdAt.slice(0, 10)},{" "}
                            {log.createdAt.slice(11, 16)})
                          </span>
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
