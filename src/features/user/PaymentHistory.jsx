import { useEffect, useState } from "react";
import api from "../../utils/axios";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get("/users/my-payments", {
          withCredentials: true,
        });
        setPayments(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p>Loading payment history...</p>;
  if (!payments.length) return <p>No payments yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Payment Method</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="p-2 border">
                {p.course?.title || "Course Deleted"}
              </td>
              <td className="p-2 border">Rs. {p.amount}</td>
              <td className="p-2 border">{p.payment_method}</td>
              <td className="p-2 border">{p.status}</td>
              <td className="p-2 border">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
