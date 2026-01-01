import React, { useEffect, useState } from "react";
const API_URL = "http://localhost:8086/api/betternship/v1/payment/payments";

type Payment = {
  id: string;
  amount: number;
  description: string;
  date: string;
};

const Home: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const fetchPayments = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPayments(data);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);

  const createPayment = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount), description }),
    });

    setAmount("");
    setDescription("");
    fetchPayments();
  };

  const updatePayment = async (id: string) => {
    const newAmount = prompt("New amount:");
    if (!newAmount) return;

    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(newAmount) }),
    });

    fetchPayments();
  };

  const deletePayment = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchPayments();
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 w-1/3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 w-2/3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={createPayment}
          className="bg-blue-600 text-black px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {payments.map((p) => (
          <li
            key={p.id}
            className="border p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">₦{p.amount}</p>
              <p className="text-sm text-gray-600">{p.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updatePayment(p.id)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deletePayment(p.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
