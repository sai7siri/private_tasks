import { createContext, useState } from "react";
import { fetchAllData } from "./customsApi";

export const Store = createContext();

const ContextStore = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { success, data } = await fetchAllData();
      if (success) {
        setData(data);
      } else {
        console.error("Failed to load tasks");
      }
    } catch (err) {
      console.error("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  const handleUpdate = (data) => {
    setShowForm(true);
    setUpdateForm(true);
    setUpdateData(data);
  };

  return (
    <Store.Provider
      value={{
        showForm,
        setShowForm,
        handleUpdate,
        updateForm,
        setUpdateForm,
        updateData,
        refreshData,
        data,
        loading,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default ContextStore;
