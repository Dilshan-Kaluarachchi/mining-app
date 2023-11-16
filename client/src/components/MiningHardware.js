import React, { useState, useEffect } from "react";

const MiningHardware = () => {
  const [miningHardwareList, setMiningHardwareList] = useState([]);
  const [newHardware, setNewHardware] = useState({
    name: "",
    location: "",
    hashRate: "",
  });

  // Fetch the list of mining hardware
  useEffect(() => {
    // API call to fetch mining hardware
    fetch("/api/miningHardware")
      .then((response) => response.json())
      .then((data) => setMiningHardwareList(data))
      .catch((error) => console.error("Error fetching mining hardware", error));
  }, []);

  // Function to handle adding new mining hardware
  const handleAddHardware = () => {
    // API call to add new mining hardware
    fetch("/api/miningHardware", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHardware),
    })
      .then((response) => response.json())
      .then((data) => {
        setMiningHardwareList([...miningHardwareList, data]);
        setNewHardware({ name: "", location: "", hashRate: "" });
      })
      .catch((error) => console.error("Error adding mining hardware", error));
  };

  return (
    <div>
      <h2>Mining Hardware Management</h2>
      <ul>
        {miningHardwareList.map((hardware) => (
          <li key={hardware.id}>
            {hardware.name} - {hardware.location} - {hardware.hashRate}
            {/* Add edit and delete options here */}
          </li>
        ))}
      </ul>
      <h3>Add New Mining Hardware</h3>
      <label>
        Name:
        <input
          type="text"
          value={newHardware.name}
          onChange={(e) =>
            setNewHardware({ ...newHardware, name: e.target.value })
          }
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={newHardware.location}
          onChange={(e) =>
            setNewHardware({ ...newHardware, location: e.target.value })
          }
        />
      </label>
      <label>
        Hash Rate:
        <input
          type="text"
          value={newHardware.hashRate}
          onChange={(e) =>
            setNewHardware({ ...newHardware, hashRate: e.target.value })
          }
        />
      </label>
      <button onClick={handleAddHardware}>Add Hardware</button>
    </div>
  );
};

export default MiningHardware;
