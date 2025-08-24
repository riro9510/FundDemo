import React, { useState } from "react";
import { useRequest } from "../hooks/useRequest";
import  {PostRequest} from "../models/PostRequest";
import { IDonation } from "../models/donations.interface";
import '../styles/form.css';
import { toast } from "react-toastify";
import MessageBox from "./messageBox";
import { useWebSocket } from '../context/useWebSocketToken';
import { time } from "framer-motion";


const DonationForm: React.FC = () => {
    const { send:postData, loading, error } = useRequest((data:IDonation) => new PostRequest("/donations/",data));
    const [loadingHold, setLoadingHold] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const { renewToken } = useWebSocket();


    const [form, setForm] = useState<IDonation>({
        donorName: "",
        donorEmail: "",
        amount: "" as unknown as number,
        description: "",
        paymentMethod: "credit_card",
        status: "completed", 
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "amount" ? (value === "" ? "" : parseFloat(value)) : value,
        }));
    };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoadingHold(true);

  try {
    const response = await postData({
      donorName: form.donorName,
      donorEmail: form.donorEmail,
      amount: Number(form.amount),
      description: form.description,
      paymentMethod: form.paymentMethod,
      status: "completed",
    });

    if (response.status === 201) {
      setLoadingHold(false);
      setMessage({ type: "success", text: "Donation registered successfully!" });

      setTimeout(() => {
        setForm({               
          donorName: "",
          donorEmail: "",
          amount: 0,
          description: "",
          paymentMethod: "credit_card",
          status: "completed",
        });

        setTimeout(() => setMessage(null), 3000);
      }, 500);
    }
  } catch (err: any) {
    setMessage({ type: "error", text: "Failed to register donation" });
    setTimeout(() => setMessage(null), 3000);
    setLoadingHold(false);
  }
};

    if(message) {
      <MessageBox
      type={message.type}
      message={message.text}
      onClose={() => setMessage(null)}
  />
    }
    if (loading|| loadingHold) {
    return (
        <div className="loaderContainer">
            <div className="spinner"></div>
            <p className="loadingText">Loading...</p>
        </div>
    );
}
    return (
  <div className="form-container">
    <div className="form-card">
      <h2 className="form-title">New Donation</h2>

      <form onSubmit={handleSubmit} className="form">
  <div className="form-group">
    <label>Donor Name</label>
    <input
      className="form-input"
      name="donorName"
      value={form.donorName}
      onChange={handleChange}
      required
      minLength={2}
      maxLength={100}
      pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
      title="Name can just contain letters and spaces"
    />
  </div>

  <div className="form-group">
    <label>Email</label>
    <input
      type="email"
      className="form-input"
      name="donorEmail"
      value={form.donorEmail}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Amount</label>
    <input
      type="number"
      className="form-input"
      name="amount"
      value={form.amount}
      onChange={handleChange}
      required
      min={1}
      step="0.01"
      title="The amount must be a positive number"
    />
  </div>

  <div className="form-group">
    <label>Description</label>
    <textarea
      className="form-input"
      name="description"
      value={form.description ?? ""}
      onChange={handleChange}
      maxLength={500}
      title="500 characters max"
    />
  </div>

  <div className="form-group">
    <label>Payment Method</label>
    <select
      className="form-input"
      name="paymentMethod"
      value={form.paymentMethod}
      onChange={handleChange}
      required
    >
      <option value="">-- Choose --</option>
      <option value="credit_card">Credit Card</option>
      <option value="paypal">PayPal</option>
      <option value="bank_transfer">Bank Transfer</option>
      <option value="other">Other</option>
    </select>
  </div>

  <button
    type="submit"
    className="form-button"
    disabled={loading}
  >
    {loading ? "Sending..." : "Register Donation"}
  </button>

  {error && <p className="error-text">{error}</p>}
</form>
       {message && (
        <MessageBox
          type={message.type}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  </div>
);

};

export default DonationForm;
