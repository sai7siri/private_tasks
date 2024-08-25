import React, { useContext, useEffect, useState } from "react";
import { updateTask, addTask } from "../customsApi";
import { toast } from "react-toastify";
import { Store } from "../Context";

function AddForm() {
  const { showForm, setShowForm, updateForm, updateData, refreshData } = useContext(Store);

  const [form, setForm] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    if (updateForm) {
      setForm(updateData);
    } else {
      setForm({
        title: "",
        desc: "",
      });
    }
  }, [updateForm, updateData , setForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.desc) {
      return toast.error("All fields required");
    }

    try {
      if (updateForm) {
        const { success, message } = await updateTask(form, updateData._id);
        if (success) {
          toast.success(message);
          refreshData();
          setShowForm(false);
          setForm({
            title: "",
            desc: "",
          });
        }
      } else {
        const { success, message } = await addTask(form);
        if (success) {
          toast.success(message);
          refreshData();
          setShowForm(false);
          setForm({
            title: "",
            desc: "",
          });
        } else {
          toast.error("Failed to add task");
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {showForm && (
        <div className="absolute inset-0 z-40 flex items-center justify-center h-screen bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {updateForm ? "UpdateTask" : "Add Task"}
            </h2>
            {/* Add task form elements here */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Task Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter task title"
                  name="title"
                  value={form.title || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter task description"
                  name="desc"
                  value={form.desc || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  {updateForm ? "UpdateTask" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddForm;
