import React, { useState } from "react";
import { useRequest } from "../hooks/useRequest";
import  {PostRequest} from "../models/PostRequest";
import { IDonation } from "../models/donations.interface";

const DonationForm: React.FC = () => {
    const { send:postData, loading, error } = useRequest((data:IDonation) => new PostRequest("/donations/",));

    const [form, setForm] = useState<IDonation>({
        donorName: "",
        donorEmail: "",
        amount: 0,
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
            [name]: name === "amount" ? parseFloat(value) || 0 : value,
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
        <div className="card">
            <h2 className="card-title">New Donation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">Donor Name</label>
                    <input
                        className="input"
                        name="donorName"
                        value={form.donorName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input"
                        name="donorEmail"
                        value={form.donorEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="label">Amount</label>
                    <input
                        type="number"
                        className="input"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="label">Description</label>
                    <textarea
                        className="input"
                        name="description"
                        value={form.description ?? ""}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="label">Payment Method</label>
                    <select
                        className="input"
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
                    className="btn-primary"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Register Donation"}
                </button>

                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default DonationForm;
