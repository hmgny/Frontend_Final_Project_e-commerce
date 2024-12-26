import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartCount,
  removeFromCart,
} from "../store/actions/shoppingCartActions";
import { useHistory } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const ShoppingCartTable = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart || []);
  const history = useHistory();

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    );
  };

  if (!cart.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50">
        <div className="text-center">
          <img
            src="/empty-cart.svg"
            alt="Empty Cart"
            className="w-32 h-32 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Sepetiniz şu an boş</h2>
          <p className="text-gray-500 mb-4">
            Sepetinize ürün eklemek için alışverişe başlayın!
          </p>
          <button
            onClick={() => history.push("/shop")}
            className="bg-Primary text-white px-6 py-2 rounded-md hover:bg-Primary/90"
          >
            Alışverişe Başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Sepetim ({cart.length} Ürün)
            </h2>
            {cart.map((item) => (
              <div key={item.product.id} className="border-b py-4">
                <div className="flex gap-4">
                  <div className="w-24">
                    <img
                      src={
                        item.product.image?.url || item.product.images?.[0]?.url
                      }
                      alt={item.product.name}
                      className="w-full h-auto rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <div className="text-gray-500 text-sm mt-1">
                      Satıcı: MeyaShop
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            dispatch(
                              updateCartCount(
                                item.product.id,
                                Math.max(1, item.count - 1)
                              )
                            )
                          }
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.count}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateCartCount(item.product.id, item.count + 1)
                            )
                          }
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          {(item.product.price * item.count).toFixed(2)} TL
                        </span>
                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.product.id))
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Ürünlerin Toplamı</span>
                <span>{calculateTotal().toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Kargo Ücreti</span>
                <span>Ücretsiz</span>
              </div>
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Toplam</span>
                <span>{calculateTotal().toFixed(2)} TL</span>
              </div>
            </div>
            <button
              onClick={() => history.push("/checkout")}
              className="w-full bg-Primary text-white py-3 rounded-md mt-6 hover:bg-Primary/90"
            >
              Sepeti Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartTable;
