import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

export function Home() {
  const location = useLocation();

  const navigate = useNavigate();

  async function Details(e) {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3001/business");
      if (response.status === 200) {
        console.log(response.data)
      } else  {
        alert("Don't have any Details");
      }
    } catch (e) {
      console.log(e);
      alert("Invalid");
    }
  }

  return (
    <div className="homepage">
      <h1>Hello {location.state.id} and welcome to home </h1>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={Details}
      >
        Click on it to see the business list
      </button>
    </div>
  );
}
