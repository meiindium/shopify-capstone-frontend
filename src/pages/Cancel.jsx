import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="success-card card" style={{ borderColor: '#EF4444' }}>
      <XCircle size={64} color="#EF4444" style={{ margin: '0 auto' }} />
      <h2 style={{ marginTop: '1rem' }}>Payment Cancelled</h2>
      <p>Your payment process was interrupted or failed. No charges were made.</p>
      <button 
        className="btn btn-outline" 
        style={{ marginTop: '1.5rem' }} 
        onClick={() => navigate('/')}
      >
        Return to Pricing
      </button>
    </div>
  );
}