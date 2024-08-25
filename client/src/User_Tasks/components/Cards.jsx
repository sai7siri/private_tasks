import React, { useContext } from "react";
import { Heart, PenBox, Trash2 } from "lucide-react";
import { Store } from "../Context";
import { updateImpartTask, updateCompleteTask, deleteTask } from "../customsApi";
import { toast } from "react-toastify";

function Cards({ data }) {
  const { handleUpdate, refreshData } = useContext(Store);

  const handleImportant = async (task) => {
    try {
      const { success, message } = await updateImpartTask(task, task._id);
      if (success) {
        toast.success(message);
        refreshData();
      } else {
        toast.error("Failed to update");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleComplete = async (task) => {
    try {
      const { success, message } = await updateCompleteTask(task, task._id);
      if (success) {
        toast.success(message);
        refreshData();
      } else {
        toast.error("Failed to update");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await deleteTask(id);
      if (success) {
        toast.success(message);
        refreshData();
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-6">
      {data && data.length > 0 ? (
        data.map((item, i) => (
          <div key={i} className="border border-gray-600 p-3">
            <p className="font-semibold capitalize text-blue-500 text-lg">
              {item.title}
            </p>
            <p className="text-sm text-gray-600 w-full">{item.desc}</p>
            <div className="flex items-center gap-6 py-2">
              <button
                onClick={() => handleComplete(item)}
                className={`${
                  item.complete ? "bg-green-600" : " bg-red-600"
                } px-6 py-2 rounded-sm text-white`}
              >
                {item.complete ? "Completed" : "Incomplete"}
              </button>

              <p>
                <Heart
                  onClick={() => handleImportant(item)}
                  className={item.important ? "fill-red-600 text-red-500" : "fill-white"}
                />
              </p>

              <p>
                <PenBox onClick={() => handleUpdate(item)} />
              </p>
              <p>
                <Trash2 onClick={() => handleDeleteTask(item._id)} />
              </p>
            </div>
          </div>
        ))
      ) : (
        <span className="text-red-600 font-medium">No tasks available</span>
      )}
    </div>
  );
}

export default Cards;
