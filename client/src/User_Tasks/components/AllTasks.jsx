import { useContext, useEffect, useState } from "react";
import Cards from "./Cards.jsx";
import { PlusSquare } from "lucide-react";
import { Store } from "../Context.jsx";
import Search from "./Search.jsx";

export default function AllTasks() {
  const { setShowForm, setUpdateForm, refreshData, data, loading } = useContext(Store);
  const [searchTerm , setSearchTerm] = useState("")

  const handleAddForm = () => {
    setUpdateForm(false);
    setShowForm(true);
  };

  useEffect(() => {
    refreshData(); // Fetch the latest data on mount
  }, []);

  const filteredData = data.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="relative py-2 overflow-y-auto h-[calc(100vh-180px)] sm:h-[calc(100vh-133px)]">
        {/* Search Component */}
        <div className="flex items-center justify-around">
        <Search onSearch={setSearchTerm} />

      <p
        // className="absolute right-10 top-1 hover:scale-125 cursor-pointer"
        onClick={handleAddForm}
      >
        <PlusSquare size={"30"} />
      </p>
        </div>
       
    

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-lg loading-ring"></span>
        </div>
      )}
   
      <Cards data={filteredData} />
    </div>
  );
}
