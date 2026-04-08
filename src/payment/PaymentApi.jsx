import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../utils/axios";
import { Loader2, CreditCard } from "lucide-react";

function PaymentApi() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const hasCreated = useRef(false);
  console.log(state);

  const isProd = (import.meta.MODE = "production");
  const successUrl = isProd
    ? "https://lms-app-lps9.onrender.com/api/v1/enrollment/verify-esewa"
    : "http://localhost:7000/api/v1/enrollment/verify-esewa";

  const failureUrl = isProd
    ? "https://lms-frontend-jade-xi.vercel.app/failure"
    : "http://localhost:5173/payment-failure";
  useEffect(() => {
    if (!state || hasCreated.current) return;

    const createPending = async () => {
      try {
        const res = await api.post("/enrollment/create", {
          address: state.address,
          phone: state.phone,
          course: state.courseId,
        });
        setPaymentData(res.data);
        hasCreated.current = true;
      } catch (err) {
        console.error("Enrollment error:", err);
      }
    };

    createPending();
  }, [state]);

  if (!state) {
    return (
      <div className="flex flex-col items-center mt-20">
        <p className="text-red-500 font-bold">Invalid Request</p>
        <button
          onClick={() => navigate("/courses")}
          className="text-blue-500 underline mt-2"
        >
          Return to Courses
        </button>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="flex flex-col items-center justify-center mt-40">
        <Loader2 className="animate-spin text-orange-500 mb-4" size={48} />
        <p className="text-gray-600 font-medium tracking-tight">
          Preparing your secure checkout...
        </p>
      </div>
    );
  }

  const { amount, transaction_uuid, signature, product_code } = paymentData;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="bg-white flex shadow-2xl rounded-3xl justify-center gap-y-8 items-center flex-col p-12 w-full max-w-md border border-gray-100"
      >
        <div className="text-center">
          <div className="bg-orange-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="text-orange-600" size={32} />
          </div>
          <h2 className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            Total Amount
          </h2>
          <h1 className="text-gray-900 font-black text-5xl mt-2">
            Rs. {amount}
          </h1>
        </div>

        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="tax_amount" value="0" />
        <input type="hidden" name="total_amount" value={amount} />
        <input type="hidden" name="transaction_uuid" value={transaction_uuid} />
        <input type="hidden" name="product_code" value={product_code} />
        <input type="hidden" name="product_service_charge" value="0" />
        <input type="hidden" name="product_delivery_charge" value="0" />
        <input
          type="hidden"
          name="success_url"
          value={successUrl}
        />
        <input
          type="hidden"
          name="failure_url"
          value={failureUrl}
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="signature" value={signature} />

        <div className="w-full border-t border-gray-100 pt-6">
          <p className="text-[10px] text-gray-400 text-center mb-6 leading-relaxed">
            You will be redirected to eSewa to complete your payment securely.
            Do not refresh or close this window.
          </p>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-100 text-xl flex items-center justify-center"
          >
            Pay with eSewa
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentApi;
