import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { Loader2 } from "lucide-react";

function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  const tid = searchParams.get("tid");

  useEffect(() => {
    const verifyEnrollment = async () => {
      if (!tid) {
        console.error("No Transaction ID found in URL");
        navigate("/");
        return;
      }

      try {
        const res = await api.get(`/enrollment/check-status/${tid}`);

        if (res.data.status === "paid") {
          setStatus("success");
        } else {
          setStatus("error");
          setTimeout(() => navigate("/payment-failure"), 3000);
        }
      } catch (err) {
        console.error("Verification API failed", err);
        setStatus("error");
        navigate("/");
      }
    };

    verifyEnrollment();
  }, [tid, navigate]);

  if (status === "verifying") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-green-500 mb-4" size={48} />
        <p className="text-gray-600">Confirming your enrollment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center mt-20 text-red-500">
        Verification failed. Redirecting...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4 animate-bounce">✅</div>
      <h1 className="text-3xl text-green-600 font-bold mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 mb-8">
        Your course enrollment is now complete.
      </p>
      <button
        onClick={() => navigate("/user/dashboard")}
        className="px-10 py-3 bg-amber-500 hover:bg-amber-600 text-white text-xl font-semibold rounded-2xl shadow-md transition-all"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default Success;
