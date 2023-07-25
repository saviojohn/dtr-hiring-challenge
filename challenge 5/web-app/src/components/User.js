import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export function User() {
  const [data, setData] = useState([]);
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [gender, setGender] = useState("");
  const [email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setNumber] = useState("");
  const [active, setActive] = useState("");
  const [role_name, setRole] = useState("");
  const [edit, setEdit] = useState(-1);
  const [editfirst_name, setEditFirst] = useState("");
  const [editlast_name, setEditLast] = useState("");
  const [editgender, setEditGender] = useState("");
  const [editemail_id, setEditEmail] = useState("");
  const [editpassword, setEditPassword] = useState("");
  const [editphone_number, setEditNumber] = useState("");
  const [editactive, setEditActive] = useState("");
  const [editrole_name, setEditRole] = useState("");

  useEffect(() => {
    async function Table() {
      try {
        const response = await axios.get("http://localhost:3001/users/");
        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (e) {
        console.log(e);
        alert("Invalid");
      }
    }
    Table();
  }, []);

  async function Submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/users", {
        first_name,
        last_name,
        gender,
        email_id,
        phone_number,
        password,
        active,
        role_name,
      });
      if (response.status === 201) {
        alert("Created");
      } else {
        alert("Have an issue Try Again ");
      }
    } catch (e) {
      console.log(e);
      alert("inputting details in a wrong way");
    }
  }

  const Edit = (user_id) => {
    const user = data.find((user) => user.user_id === user_id);
    if (user) {
      setEditFirst(user.first_name);
      setEditLast(user.last_name);
      setEditGender(user.gender);
      setEditEmail(user.email_id);
      setEditNumber(user.phone_number);
      setEditActive(user.active);
      setEditRole(user.role_name);
      setEdit(user_id);
    }
  };

  async function Update(e) {
    e.preventDefault();

    try {
      const userToUpdate = data.find((user) => user.user_id === edit);

      if (userToUpdate) {
        const updateduser = {
          user_id: edit,
          first_name: editfirst_name || userToUpdate.first_name,
          last_name: editlast_name || userToUpdate.last_name,
          gender: editgender || userToUpdate.gender,
          email_id: editemail_id || userToUpdate.email_id,
          phone_number: editphone_number || userToUpdate.phone_number,
          active: editactive || userToUpdate.active,
          role_name: editrole_name || userToUpdate.role_name,
          password: editpassword || userToUpdate.password,
        };

        const response = await axios.put(
          `http://localhost:3001/users/${edit}`,
          updateduser
        );

        if (response.status === 200) {
          const updatedResponse = await axios.get("http://localhost:3001/user");
          if (updatedResponse.status === 200) {
            setData(updatedResponse.data.data);
          }

          setEdit(-1);
          setEditFirst("");
          setEditLast("");
          setEditGender("");
          setEditEmail("");
          setEditPassword("");
          setEditNumber("");
          setEditActive("");
          setEditRole("");
          setEdit("");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div>
        <form action="POST">
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => setFirst(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => setLast(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Active"
            onChange={(e) => setActive(e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            onChange={(e) => setRole(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={Submit}
          >
            {" "}
            Create{" "}
          </button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <table className="table-auto border border-collapse border-gray-500 dark:border-darken-">
        <thead>
          <tr>
            <th className="border">User ID</th>
            <th className="border">First Name</th>
            <th className="border">Last Name</th>
            <th className="border">Gender</th>
            <th className="border">Email</th>
            <th className="border">Contact Number</th>
            <th className="border">Is Active</th>
            <th className="border">Role</th>
            <th className="border">created_time</th>
            <th className="border">last_modified</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user_details) =>
            user_details.user_id === edit ? (
              <tr key={user_details.user_id}>
                <td>{user_details.user_id}</td>
                <td>
                  <input
                    type="text"
                    value={editfirst_name}
                    onChange={(e) => setEditFirst(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editlast_name}
                    onChange={(e) => setEditLast(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editemail_id}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editgender}
                    onChange={(e) => setEditGender(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editactive}
                    onChange={(e) => setEditActive(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editphone_number}
                    onChange={(e) => setEditNumber(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={Update}>Update</button>
                </td>
              </tr>
            ) : (
              <tr>
                <td className="border">{user_details.user_id}</td>
                <td className="border">{user_details.first_name}</td>
                <td className="border">{user_details.last_name}</td>
                <td className="border">{user_details.gender}</td>
                <td className="border">{user_details.email_id}</td>
                <td className="border">{user_details.phone_number}</td>
                <td className="border">
                  {user_details.active ? "True" : "False"}
                </td>
                <td className="border">{user_details.role_name}</td>
                <td className="border">{user_details.created_time}</td>
                <td className="border">{user_details.last_modified_time}</td>
                <td className="border">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => Edit(user_details.user_id)}
                  >
                    edit
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
