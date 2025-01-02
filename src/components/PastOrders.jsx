import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        history.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          "https://workintech-fe-ecommerce.onrender.com/order",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        setError("Siparişler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, history]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Geçmiş Siparişlerim</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Sipariş ID</th>
              <th className="py-2 px-4 border-b">Tarih</th>
              <th className="py-2 px-4 border-b">Toplam Fiyat</th>
              <th className="py-2 px-4 border-b">Durum</th>
              <th className="py-2 px-4 border-b">Detaylar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {order.price.toFixed(2)} TL
                </td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => history.push(`/order/${order.id}`)}
                    className="text-blue-500 hover:underline"
                  >
                    Görüntüle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastOrders;
