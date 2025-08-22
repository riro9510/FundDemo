import React, { useState } from "react";
import { useRequest } from "../hooks/useRequest";
import  {PostRequest} from "../models/PostRequest";
import { IDonation } from "../models/donations.interface";
import '../styles/form.css';

const DonationForm: React.FC = () => {
    const { send:postData, loading, error } = useRequest((data:IDonation) => new PostRequest("/donations/",));

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
        await postData({
            donorName: form.donorName,
            donorEmail: form.donorEmail,
            amount: form.amount,
            description: form.description,
            paymentMethod: form.paymentMethod,
            status: "completed",
        });
        setForm({
            donorName: "",
            donorEmail: "",
            amount: 0,
            description: "",
            paymentMethod: "credit_card",
            status: "completed",
        });
    };

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
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-input"
            name="description"
            value={form.description ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            className="form-input"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
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
    </div>
  </div>
);

};

export default DonationForm;
