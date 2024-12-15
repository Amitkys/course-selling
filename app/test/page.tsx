"use client";
import { QRCodeCanvas } from "qrcode.react";

export default function ReportPage() {
    // Static data
    const qrUrl = "https://google.com";
    const userData = { name: "Amit Kumar", age: 56 };

    // Handle the print action
    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Static Report Page</h1>

            <section>
                <h2>User Details:</h2>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Age:</strong> {userData.age}</p>
            </section>

            <section>
                <h2>QR Code (Canvas):</h2>
                <QRCodeCanvas value={qrUrl} size={100} />
                <p style={{ fontSize: "0.9em", color: "#555" }}>
                    (Scan the QR code to visit: <a href={qrUrl}>{qrUrl}</a>)
                </p>
            </section>

            <button
                onClick={handlePrint}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Generate Report
            </button>
        </div>
    );
}
