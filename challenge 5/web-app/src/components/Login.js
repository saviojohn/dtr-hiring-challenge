import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function Submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/", {
        email_id,
        password,
      });
      if (response.status === 201) {
        navigate("/home", { state: { id: email_id } });
      } else if (response.status === 401) {
        alert("Don't have an account");
      }
    } catch (e) {
      console.log(e);
      alert("wrong details");
    }
  }
  return (
    <div className="login">
      <div class="h-screen flex items-center justify-center">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action="POST"
        >
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="Email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              name=""
              id=""
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              name=""
              id=""
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={Submit}
            >
              Sign In
            </button>
            <Link to="/signup">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
