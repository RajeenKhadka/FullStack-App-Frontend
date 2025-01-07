import { useEffect, useState } from "react";
import axios from "axios";

function CalendarPage() {
  const [entries, setEntries] = useState([]);
  const LOCAL_URL = "http://localhost:5052";

  const getEntries = async () => {
    console.log("in getEntries");
    //fetch calendar entries from the backend
    //also known as the api that i am creating
    //this endpoint is:
    //  /api/calendar
    try {
      const response = await axios.get(`${LOCAL_URL}/api/calendar`);
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
            {entry.startDate}: {entry.label}
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
      <h2>Calendar Entries</h2>
      {entries.length ? loaded() : loading()}{" "}
    </>
  );
}

export default CalendarPage;
