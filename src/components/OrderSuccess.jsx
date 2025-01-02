import React from "react";
import { useHistory } from "react-router-dom";

const OrderSuccess = ({ onClose }) => {
  const history = useHistory();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            SİPARİŞİNİZ ALINDI
          </h2>
          <p className="text-gray-600 mb-6">
            Siparişiniz başarıyla oluşturuldu.
          </p>
        </div>

        <button
          onClick={() => history.push("/")}
          className="w-full bg-Primary text-white py-3 px-6 rounded-md hover:bg-Primary/90 transition-colors"
        >
          Alışverişe Devam Et
        </button>
        <button
          onClick={() => history.push("/PastOrders")}
          className="w-full bg-Primary text-white py-3 px-6 rounded-md my-2 hover:bg-Primary/90 transition-colors"
        >
          Siparişlerim
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
