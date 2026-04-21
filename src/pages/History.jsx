import { useEffect, useState } from 'react';
import { getPaymentHistory } from '../services/api';

export default function History() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaymentHistory()
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch history', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader-container"><h2>Loading History...</h2></div>;

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--card-bg)', borderRadius: '8px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Date</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Plan</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Amount</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Order ID</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                    {new Date(payment.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>{payment.plan}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                    ₹{(payment.amount / 100).toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{payment.session_id}</span>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      backgroundColor: payment.status === 'success' ? '#d1fae5' : '#fee2e2',
                      color: payment.status === 'success' ? '#065f46' : '#991b1b'
                    }}>
                      {payment.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}