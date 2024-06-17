import React from 'react';
import { useNavigate } from 'react-router-dom';


class RazorpayPayment extends React.Component {
  handlePayment = async () => {
    const script = document.createElement('script');
    const navigate = useNavigate();

    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    navigate('/payment');
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Enter the Key ID generated from the Dashboard
        amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or INR 500.
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: '', // Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    };
  };

  render() {
    return (
      <button onClick={this.handlePayment}>
        Pay with Razorpay
      </button>
    );
  }
}

export default RazorpayPayment;
