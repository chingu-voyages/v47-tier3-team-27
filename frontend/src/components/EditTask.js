import React, { useState, useEffect } from "react";
import dataAPI from "../services/dataAPI";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #8fa8a2",
  width: 450,
  boxShadow: 24,
};

export default function EditTask({ taskInfo, children }) {
  const { taskId, taskName, taskDescription } = taskInfo;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const taskData = await dataAPI.EditTaskReq(taskId, formData);
    setIsLoading(false);
    handleClose(false);
    
    window.location.reload();
  };

  useEffect(() => {
    setFormData({
      name: taskName,
      description: taskDescription,
    });
  }, []);

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
              <h3 className="font-bold pb-2 uppercase">Edit your task</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="task">Task *</label>
                  <input
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    value={formData.name}
                    type="text"
                    className="block w-full mb-4"
                  />
                </div>
                <div>
                  <label htmlFor="description">Description *</label>
                  <textarea
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    value={formData.description}
                    className="block w-full"
                  ></textarea>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-mediumGreen text-white p-2 w-32 rounded-full m-2"
                  >
                    {isLoading ? "Submitting" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
