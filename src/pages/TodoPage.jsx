import { useEffect, useState } from "react";
import axios from "axios";

function TodoPage() {
  const [entries, setEntries] = useState([]);
  const LOCAL_URL = "http://localhost:5052";

  const getEntries = async () => {
    console.log("in getEntries");
    //fetch todo entries from the backend
    //also known as the api that i am creating
    //this endpoint is:
    //  /api/todo
    try {
      const response = await axios.get(`${LOCAL_URL}/api/todo`);
      console.log(response.data);
      setEntries(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  const loaded = () => {
    return (
      <ul style={{ listStyleType: "none" }}>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.due}: {entry.text} :{" "}
            {entry.completed ? "Complete" : "Incomplete"}
          </li>
        ))}
      </ul>
    );
  };

  const loading = () => {
    return <h3>There don't seem to be an entries yet... </h3>;
  };

  return (
    <>
      <h2>Todo Entries</h2>
      {entries.length ? loaded() : loading()}{" "}
    </>
  );
}

export default TodoPage;
