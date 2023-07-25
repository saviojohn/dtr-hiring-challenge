import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export function Business() {
  const [data, setData] = useState([]);
  const [business_name, setName] = useState("");
  const [business_email_id, setEmail] = useState("");
  const [contact_number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [edit, setEdit] = useState(-1);
  const [editBusinessName, setEditBusinessName] = useState(null);
  const [editBusinessEmail, setEditBusinessEmail] = useState(null);
  const [editContactNumber, setEditContactNumber] = useState(null);
  const [editCity, setEditCity] = useState(null);

  useEffect(() => {
    async function Table() {
      try {
        const response = await axios.get("http://localhost:3001/business");
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
      const response = await axios.post("http://localhost:3001/business", {
        business_name,
        business_email_id,
        contact_number,
        city,
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

  const Edit = (business_id) => {
    const business = data.find(
      (business) => business.business_id === business_id
    );
    if (business) {
      setEditBusinessName(business.business_name);
      setEditBusinessEmail(business.business_email_id);
      setEditContactNumber(business.contact_number);
      setEditCity(business.city);
      setEdit(business_id);
    }
  };

  async function Update(e) {
    e.preventDefault();

    try {
      const businessToUpdate = data.find(
        (business) => business.business_id === edit
      );

      if (businessToUpdate) {
        const updatedBusiness = {
          business_id: edit,
          business_name: editBusinessName || businessToUpdate.business_name,
          business_email_id:
            editBusinessEmail || businessToUpdate.business_email_id,
          contact_number: editContactNumber || businessToUpdate.contact_number,
          city: editCity || businessToUpdate.city,
        };

        const response = await axios.put(
          `http://localhost:3001/business/${edit}`,
          updatedBusiness
        );

        if (response.status === 200) {
          const updatedResponse = await axios.get(
            "http://localhost:3001/business"
          );
          if (updatedResponse.status === 200) {
            setData(updatedResponse.data.data);
          }

          setEdit(-1);
          setEditBusinessName(null);
          setEditBusinessEmail(null);
          setEditContactNumber(null);
          setEditCity(null);
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
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact"
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
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
            <th className="border">Name</th>
            <th className="border">Business ID</th>
            <th className="border">Email ID</th>
            <th className="border">Contact Number</th>
            <th className="border">City</th>
            <th className="border">created_time</th>
            <th className="border">last_modified</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((business_details) =>
            business_details.business_id === edit ? (
              <tr key={business_details.business_id}>
                <td>{business_details.business_id}</td>
                <td>
                  <input
                    type="text"
                    value={editBusinessName}
                    onChange={(e) => setEditBusinessName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editBusinessEmail}
                    onChange={(e) => setEditBusinessEmail(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editContactNumber}
                    onChange={(e) => setEditContactNumber(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={Update}>Update</button>
                </td>
              </tr>
            ) : (
              <tr>
                <td className="border">{business_details.business_name}</td>
                <td className="border">{business_details.business_id}</td>
                <td className="border">{business_details.business_email_id}</td>
                <td className="border">{business_details.contact_number}</td>
                <td className="border">{business_details.city}</td>
                <td className="border">{business_details.created_time}</td>
                <td className="border">{business_details.last_modified}</td>
                <td className="border">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => Edit(business_details.business_id)}
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
