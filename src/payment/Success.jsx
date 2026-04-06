

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    
    console.log("Payment confirmed by backend.");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">✅</div>
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
