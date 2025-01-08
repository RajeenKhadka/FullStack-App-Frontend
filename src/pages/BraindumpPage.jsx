import { useEffect, useState } from "react";
import axios from "axios";

function BraindumpPage() {
  const current = new Date();

  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    entryDate: current,
    entryType: "",
    description: "",
  });

  //Editing
  const [editFormID, setEditFormId] = useState();
  const [editedForm, setEditedForm] = useState({
    entryDate: current,
    entryType: "",
    description: "",
  });

  const [entryUpdate, setEntryUpdate] = useState("nothing changed");
  const [entType, setEntType] = useState("");

  const LOCAL_URL = "http://localhost:5052";

  const getEntries = async () => {
    console.log("in getEntries");
    //fetch Braindump entries from the backend
    //also known as the api that i am creating
    //this endpoint is:
    //  /api/todo
    try {
      const response = await axios.get(`${LOCAL_URL}/api/braindump`);
      setEntries(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addEntry = async (newEntry) => {
    let error = false;
    let addedEntry = {};
    try {
      const response = await axios.post(`${LOCAL_URL}/api/braindump`, newEntry);
      addedEntry = response.data;
    } catch (err) {
      error = true;
      console.log(err);
    } finally {
      if (error) {
        setEntryUpdate("there was an error");
      } else {
        setEntryUpdate(
          `Successfully Added ${addedEntry.entryType} - ${addedEntry.description}`
        );
      }
    }
  };

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`${LOCAL_URL}/api/braindump/${id}`);
      console.log(response);
      setEntryUpdate(`deleted entry successfully ${id}`);
    } catch (err) {
      console.error(err);
      setEntryUpdate("delete entry unsuccessfully");
    }
  };

  const editEntry = async (id) => {
    console.log(editedForm);
    try {
      const response = await axios.put(
        `${LOCAL_URL}/api/braindump/${id}`,
        editedForm
      );
      console.log(response);
      setEntryUpdate(`edit entry successfully ${id}`);
      setEditFormId(null); // Close the edit form after saving
    } catch (error) {
      console.error(error);
      setEntryUpdate("edit failed");
    }
  };

  const handleEdit = (date, type, description, id) => {
    setEditFormId(id);
    setEditedForm({
      entryDate: date,
      entryType: type,
      description: description,
    });
  };

  const handleEditChange = (e) => {
    setEditedForm((prevForm) => ({
      ...prevForm, // Spread the current state to retain other fields
      [e.target.name]: e.target.value, // Update the specific field based on the input name
    }));
  };

  const handleDelete = (e, id) => {
    console.log(e);
    console.log("delete.. entry: ", id);
    deleteEntry(id);
  };

  useEffect(() => {
    getEntries();
  }, [entryUpdate]);

  const loaded = () => {
    return (
      <ul style={{ listStyleType: "none" }}>
        {entries.map((entry, index) => (
          <li key={index}>
            {editFormID === entry._id ? (
              <>
                <input
                  type="date"
                  name="entryDate"
                  required
                  onChange={handleEditChange}
                  value={editedForm.entryDate}
                />
                <label>
                  Choose the Entry Type
                  <select
                    name="entryType"
                    value={editedForm.entryType}
                    onChange={handleEditChange}
                  >
                    <option value="None"> </option>
                    <option value="ToDo">To Do</option>
                    <option value="Idea">Idea</option>
                    <option value="Appt">Appt</option>
                    <option value="Sched">Sched</option>
                    <option value="List">List</option>
                  </select>
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  onChange={handleEditChange}
                  value={editedForm.description}
                />
                <button onClick={() => editEntry(entry._id)}>Save</button>
                <button onClick={() => setEditFormId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {entry.entryDate}: {entry.entryType} : {entry.description}
                <button
                  onClick={() =>
                    handleEdit(
                      entry.entryDate,
                      entry.entryType,
                      entry.description,
                      entry._id
                    )
                  }
                >
                  Edit
                </button>
              </>
            )}
            <button onClick={(e) => handleDelete(e, entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };

  const loading = () => {
    return <h3>There don't seem to be an entries yet... </h3>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newEntry = {};
    console.log("in handleSubmit");
    console.log(entType);
    //this is where I will send my post request to the backend

    newEntry = {
      entryDate: formData.entryDate,
      entryType: entType || "none",
      description: formData.description,
    };
    console.log(newEntry);
    addEntry(newEntry);
  };

  const handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeSelect = (e) => {
    // console.log(e.target.value);
    setEntType(e.target.value);
  };

  return (
    <>
      <h1>BraindumpPage</h1>
      <ol>
        CRUD
        <li>Update - form to edit a specific entry</li>
        <li>Delete - button to delete an entry</li>
      </ol>
      <div style={{ display: "flex" }}>
        <div>
          <h3>Add a new Entry</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="entryDate"
              required
              onChange={handleChange}
              value={formData.entryDate}
            />

            <label>
              Choose the Entry Type
              <select value={entType} onChange={handleTypeSelect}>
                <option value="None"> </option>
                <option value="ToDo">To Do</option>
                <option value="Idea">Idea</option>
                <option value="Appt">Appt</option>
                <option value="Sched">Sched</option>
                <option value="List">List</option>
              </select>
            </label>

            <input
              type="text"
              name="description"
              required
              onChange={handleChange}
              value={formData.description}
            />

            <input type="submit" value="Add a new entry" />
          </form>
          <p>{entryUpdate}</p>
        </div>
      </div>
      {entries.length ? loaded() : loading()}{" "}
    </>
  );
}

export default BraindumpPage;
