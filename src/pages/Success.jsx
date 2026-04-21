import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyPayment } from '../services/api';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const orderId = searchParams.get('order_id');
  
  const [status, setStatus] = useState('verifying');
  const [details, setDetails] = useState(null);
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    if (hasVerified.current) return;
    hasVerified.current = true;

    verifyPayment({ order_id: orderId })
      .then((res) => {
        if (res.data.success) {
          setStatus('success');
          setDetails(res.data.data);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.error('Verification failed', err);
        navigate('/'); 
      });
  }, [orderId, navigate]);

  if (status === 'verifying') return <div className="loader-container"><h2>Verifying Secure Payment...</h2></div>;

  return (
    <div className="success-card card">
      <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto' }} />
      <h2>Payment Successful!</h2>
      <p>Thank you for subscribing to the <strong>{details?.plan}</strong>.</p>
      <div className="receipt-details">
        <p><strong>Amount Paid:</strong> ${(details?.amount / 100).toFixed(2)}</p>
        <p><strong>Transaction ID:</strong> {details?.payment_id}</p>
        <p><strong>Order ID:</strong> {details?.session_id}</p>
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}