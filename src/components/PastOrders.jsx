import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
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

        // Siparişleri en yeniden eskiye sıralama
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.order_date) - new Date(a.order_date)
        );
        setOrders(sortedOrders);
      } catch (error) {
        setError("Siparişler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, history]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getOrderStatus = (index) => {
    if (index === 0) {
      return "Hazırlanıyor";
    } else if (index === 1 || index === 2) {
      return "Kargoya Verildi";
    } else {
      return "Teslim Edildi";
    }
  };

  const getStatusIcon = (index) => {
    if (index > 2) {
      return (
        <svg
          className="h-7 w-7 text-green-500 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    } else if (index === 1 || index === 2) {
      return (
        <svg
          className="h-7 w-7 text-blue-500 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </svg>
      );
    } else if (index === 0) {
      return (
        <svg
          className="h-7 w-7 text-yellow-500 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22v-9" />
          <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" />
          <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
          <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />
        </svg>
      );
    }
    return null;
  };

  const getOrderBorderColor = (index) => {
    if (index > 2) {
      return "border-green-500 hover:shadow-green-500/50";
    } else if (index === 1 || index === 2) {
      return "border-blue-500 hover:shadow-blue-500/50";
    } else if (index === 0) {
      return "border-yellow-500 hover:shadow-yellow-500/50";
    }
    return "";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Geçmiş Siparişlerim
      </h2>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className={`bg-white p-4 rounded-lg shadow border ${getOrderBorderColor(
              index
            )} transition-shadow hover:shadow-lg`}
          >
            <div className="flex justify-around items-center">
              <div className="text-center w-full flex justify-between items-center">
                <div>
                  {(index > 2 || index === 1 || index === 2 || index === 0) && (
                    <div className="flex justify-center items-center mb-2">
                      {getStatusIcon(index)}
                      <span className="text-gray-600">
                        {getOrderStatus(index)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-base font-semibold">
                    Sipariş No: {order.id}
                  </p>
                  <div>
                    <p className="text-gray-600">
                      Sipariş Tarihi:{" "}
                      {new Date(order.order_date).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <p className="text-gray-600">Tutar:</p>
                      <p className="text-green-500 font-semibold">
                        {order.price.toFixed(2)} TL
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleOrderDetails(order.id)}
                  className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition-colors py-1 px-2 m-4"
                >
                  {expandedOrderId === order.id ? "Gizle" : "Sipariş Detayı"}
                </button>
              </div>
            </div>
            {expandedOrderId === order.id && (
              <div className="mt-4">
                <ul className="space-y-2">
                  {order.products.map((product) => (
                    <li
                      key={product.product_id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <p className="font-medium">{product.detail}</p>
                          <p className="text-gray-600">
                            Ürün Adı: {product.name}
                          </p>
                          <p className="text-gray-600">Adet: {product.count}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        {product.price.toFixed(2)} TL
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastOrders;
