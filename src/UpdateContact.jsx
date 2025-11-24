import React, { useState } from "react";

export default function UpdateContact() {
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setResponseMsg("");

    if (!oldName.trim()) {
      setResponseMsg("Enter the name of the contact to update.");
      return;
    }

    try {
      const res = await fetch(
        `https://cs3870-backend-i.onrender.com/contacts/${encodeURIComponent(oldName)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contact_name: newName,
            phone_number: phone,
            message,
            image_url: imageUrl,
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setResponseMsg(data?.message || "Update failed");
      } else {
        setResponseMsg("Contact updated successfully!");
      }
    } catch (err) {
      setResponseMsg("Network error.");
    }
  };

  return (
    <div>
      <h2>Update Contact</h2>
      <form onSubmit={handleUpdate}>
        <input
          placeholder="Old Name (contact to update)"
          value={oldName}
          onChange={(e) => setOldName(e.target.value)}
        /><br/><br/>

        <input
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        /><br/><br/>

        <input
          placeholder="New Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br/><br/>

        <input
          placeholder="New Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        /><br/><br/>

        <input
          placeholder="New Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        /><br/><br/>

        <button type="submit">Update Contact</button>
      </form>

      {responseMsg && <p style={{ marginTop: "15px" }}>{responseMsg}</p>}
    </div>
  );
}

