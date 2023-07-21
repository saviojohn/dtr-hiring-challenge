import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [gender, setgender] = useState("");
  const [email_id, setEmail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [role_name, setrole_name] = useState("");
  const [password, setPassword] = useState("");

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
        role_name,
      });
      if (response.status === 201) {
        alert("Account created");
        navigate("/home", { state: { id: first_name, last_name } });
      } else {
        alert("Have an issue Try Again ");
      }
    } catch (e) {
      console.log(e);
      alert("inputting details in a wrong way");
    }
  }
  return (
    <div className="Signup">
      <form action="POST">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              <input
                type="text"
                onChange={(e) => {
                  setfirst_name(e.target.value);
                }}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name=""
                placeholder="First name"
              />
              <input
                type="text"
                onChange={(e) => {
                  setlast_name(e.target.value);
                }}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name=""
                placeholder="Last name"
              />
              <input
                type="text"
                onChange={(e) => {
                  setgender(e.target.value);
                }}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name=""
                placeholder="Gender"
              />
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Email"
                name=""
                id=""
              />
              <input
                type="text"
                onChange={(e) => {
                  setphone_number(e.target.value);
                }}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name=""
                placeholder="Phone_number"
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                name=""
                id=""
              />
              <input
                type="text"
                onChange={(e) => {
                  setrole_name(e.target.value);
                }}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name=""
                placeholder="Role_name"
              />
              <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={Submit}
                >
                  Submit
                </button>

                <Link to="/">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
