import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartCount,
  removeFromCart,
  toggleCartItem,
} from "../store/actions/shoppingCartActions";
import { useHistory } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const ShoppingCartTable = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart || []);
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);

  const handleCheckout = () => {
    if (user || localStorage.getItem("token")) {
      history.push("/order");
    } else {
      history.push("/login");
    }
  };

  const calculateTotal = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0);
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
              Sepetim (
              {cart
                .filter((item) => item.checked)
                .reduce((total, item) => total + item.count, 0)}{" "}
              Ürün)
            </h2>
            {cart.map((item) => (
              <div className="flex justify-between px-6 border border-gray-100">
                <div key={item.product.id} className="border-b py-4">
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() =>
                          dispatch(toggleCartItem(item.product.id))
                        }
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="w-24">
                      <img
                        src={
                          item.product.image?.url ||
                          item.product.images?.[0]?.url
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
                        <div className="flex items-center gap-2 border border-gray-200">
                          <button
                            onClick={() =>
                              dispatch(
                                updateCartCount(
                                  item.product.id,
                                  Math.max(1, item.count - 1)
                                )
                              )
                            }
                            className="p-1 rounded-full  text-gray-300 hover:bg-gray-100 hover:text-black"
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
                            className="p-1 rounded-full  text-gray-300 hover:bg-gray-100 hover:text-black"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-around items-center gap-4">
                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold line-through">
                      {(item.product.price * item.count).toFixed(2)} TL
                    </span>
                    <span className="font-semibold text-red-500">
                      {`${(
                        Math.floor(
                          ((item.product.price * item.count) / 2) * 100
                        ) / 100
                      ).toFixed(2)}`}{" "}
                      TL
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">
              Sipariş Özeti (
              {cart
                .filter((item) => item.checked)
                .reduce((total, item) => total + item.count, 0)}{" "}
              Ürün)
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>{(calculateTotal() * 0.5).toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo</span>
                <span>49.90 TL</span>
              </div>
              <div className="flex justify-between">
                <span className="flex flex-wrap">
                  {calculateTotal() * (0.5).toFixed(2) > 500
                    ? "500 TL ve üzeri alışverişlerde kargo ücretsiz"
                    : ""}
                </span>
                <span className="text-red-500">
                  {calculateTotal() * (0.5).toFixed(2) > 500
                    ? "- 49.90 TL"
                    : ""}
                </span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Toplam</span>
                  <span>
                    {(
                      calculateTotal() * (0.5).toFixed(2) +
                      (calculateTotal() * (0.5).toFixed(2) > 500 ? 0 : 49.9)
                    ).toFixed(2)}
                    TL
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-Primary text-white py-3 rounded-md mt-6 hover:bg-Primary/90"
              >
                Sepeti Onayla
              </button>
              <span className="h7 text-red-600">
                {calculateTotal() * (0.5).toFixed(2) > 500
                  ? ""
                  : "500 TL ve üzeri alışverişlerde kargo ücretsiz"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartTable;
