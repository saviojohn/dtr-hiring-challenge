import { useEffect, useState } from "react";
import axios from "axios";

export function Sales() {
  const [data, setData] = useState([]);
  const [invoice_number, setInvoice] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function Table() {
      try {
        const response = await axios.get("http://localhost:3001/sales");
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
      const response = await axios.post("http://localhost:3001/sales", {
        invoice_number,
        amount,
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

  return (
    <div>
      <div>
        <form action="POST">
          <input
            type="text"
            placeholder="Invoice Number"
            onChange={(e) => setInvoice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
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
            <th className="border">Sales ID</th>
            <th className="border">Invoice Number</th>
            <th className="border">Amount</th>
            <th className="border">Name</th>
            <th className="border">City</th>
            <th className="border">created_time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sales_details) => (
            <tr key={sales_details.sales_id}>
              <td className="border">{sales_details.sales_id}</td>
              <td className="border">{sales_details.invoice_number}</td>
              <td className="border">{sales_details.amount}</td>
              <td className="border">{sales_details.business_name}</td>
              <td className="border">{sales_details.city}</td>
              <td className="border">{sales_details.created_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
