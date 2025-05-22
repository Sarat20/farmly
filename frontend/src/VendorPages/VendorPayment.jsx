
import React, { useState, useEffect } from 'react';

const VendorPayments = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                setIsLoading(true);
                const vendorToken = localStorage.getItem('vtoken');

                if (!vendorToken) {
                    setError('Authentication required. Please log in to view payments.');
                    setIsLoading(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vendor/payments`, {
                    headers: { 'vtoken': vendorToken },
                });

                if (!response.ok) {
                    const errorJson = await response.json().catch(() => ({ message: response.statusText }));
                    throw new Error(errorJson.message || 'Failed to fetch payment data');
                }

                const data = await response.json();
                if (data.success) {
                    setPaymentData(data);
                } else {
                    setError(data.message || 'Failed to load payment data');
                }
            } catch (err) {
                setError(err.message || 'Unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentDetails();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!paymentData || !paymentData.summary || !paymentData.transactions) return <div>No data available.</div>;

    const { summary, transactions } = paymentData;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Vendor Payments Dashboard</h2>

            <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Earnings Summary</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ flex: '1 1 200px', border: '1px solid #ddd', padding: '10px' }}>
                        <strong>₹{summary.totalEarnings.toFixed(2)}</strong>
                        <div>Total Earnings</div>
                    </div>
                    <div style={{ flex: '1 1 200px', border: '1px solid #ddd', padding: '10px' }}>
                        <strong>₹{summary.availableForPayout.toFixed(2)}</strong>
                        <div>Available for Payout</div>
                    </div>
                    <div style={{ flex: '1 1 200px', border: '1px solid #ddd', padding: '10px' }}>
                        <strong>₹{summary.pendingEarnings.toFixed(2)}</strong>
                        <div>Pending Clearance</div>
                    </div>
                    <div style={{ flex: '1 1 200px', border: '1px solid #ddd', padding: '10px' }}>
                        <strong>₹{summary.lastPayout.amount.toFixed(2)}</strong>
                        <div>Last Payout ({formatDate(summary.lastPayout.date)})</div>
                    </div>
                </div>
            </section>

            <section style={{ padding: '15px', border: '1px solid #ccc' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Transaction History</h3>
                {transactions.length === 0 ? (
                    <p>No transactions available.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Type</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Description</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Amount</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, i) => (
                                <tr key={i} style={{ backgroundColor: tx.type === 'Payout' ? '#ffe5e5' : 'transparent' }}>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{formatDateTime(tx.date)}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{tx.type}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{tx.description}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px', color: tx.type === 'Payout' ? 'red' : 'green' }}>
                                        {tx.type === 'Payout' ? '-' : '+'}₹{tx.amount.toFixed(2)}
                                    </td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{tx.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};

export default VendorPayments;
