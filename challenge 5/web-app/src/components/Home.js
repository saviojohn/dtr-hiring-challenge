import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
// import { Hello } from "./Business";

export function Home() {
  const location = useLocation();
  const [business, setBusiness] = useState([]);

  async function Details(e) {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3001/business");
      if (response.status === 200) {
        setBusiness(response.data.data);
      }
    } catch (e) {
      console.log(e);
      alert("Invalid");
    }
  }

  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="homepage">
      <strong>Hello {location.state.id} and welcome to home </strong>
      <ul class="flex">
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            href="/business"
          >
            Business
          </a>
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            href="/sales"
          >
            Sales
          </a>
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            href="/user"
          >
            Users
          </a>
        </li>
        <li class="flex-1 mr-2">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={Details}
          >
            Click on it to see the business list
          </button>
        </li>
        <li class="flex-1 mr-2">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" onClick={Logout}
          >
            Logout
          </button>
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {business.map((business_list) => (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p>
              <strong>Name:</strong> {business_list.business_name}
            </p>
            <p>
              <strong>Business ID:</strong> {business_list.business_id}
            </p>
            <p>
              <strong>Email ID:</strong> {business_list.business_email_id}
            </p>
            <p>
              <strong>Contact Number:</strong> {business_list.contact_number}
            </p>
            <p>
              <strong>City:</strong> {business_list.city}
            </p>
            <p>
              <strong>Created Time:</strong> {business_list.created_time}
            </p>
            <p>
              <strong>Last Modified:</strong> {business_list.last_modified}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
