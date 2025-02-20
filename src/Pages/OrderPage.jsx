import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  createOrder,
} from "../store/actions/orderActions";
import {
  fetchCards,
  addCard,
  updateCard,
  deleteCard,
} from "../store/actions/cardActions";
import { clearCart } from "../store/actions/shoppingCartActions"; // Bu action'ı oluşturmanız gerekebilir
import { toast } from "react-toastify";
import OrderSuccess from "../components/OrderSuccess";

const OrderPage = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.addres.addresses || {});
  const history = useHistory();
  const cart = useSelector((state) => state.shoppingCart.cart || []);
  const user = useSelector((state) => state.auth.user);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    address: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("address");
  const token = localStorage.getItem("token");
  const [cities, setCities] = useState(["Istanbul", "Ankara", "Izmir"]); // Örnek iller
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const creditCards = useSelector((state) => state.card.cards || []);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateTotal = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setNewAddress({ ...newAddress, city: selectedCity });
  };

  // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir.
  useEffect(() => {
    const loadData = async () => {
      if (token) {
        try {
          await Promise.all([
            dispatch(fetchAddresses()),
            dispatch(fetchCards()),
          ]);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      } else {
        history.push("/login");
      }
    };

    loadData();
  }, [dispatch, token, history]);

  // Formdaki inputları kontrol et
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Adres eklemek için API'ye POST isteği gönder
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addAddress(newAddress));
      setShowForm(false);
      setNewAddress({
        title: "",
        name: "",
        surname: "",
        phone: "",
        city: "",
        district: "",
        neighborhood: "",
        address: "",
      });
      toast.success("New address added successfully.");
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("An error occurred while adding the address.");
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "card_no") {
      const formattedValue = value
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setNewCard((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setNewCard((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateCardForm = () => {
    const { card_no, name_on_card, expire_month, expire_year } = newCard;
    if (
      card_no.replace(/\s/g, "").length !== 16 ||
      !name_on_card ||
      !expire_month ||
      !expire_year
    ) {
      toast.error("Please fill in all fields correctly.");
      return false;
    }
    return true;
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    if (!validateCardForm()) return;
    try {
      if (newCard.id) {
        await dispatch(updateCard(newCard));
        toast.success("The card has been successfully updated.");
      } else {
        await dispatch(addCard(newCard));
        toast.success("New card successfully added.");
      }
      setShowCardForm(false);
      setNewCard({
        id: "",
        card_no: "",
        expire_month: "",
        expire_year: "",
        name_on_card: "",
      });
      await dispatch(fetchCards()); // Refresh the card list
    } catch (error) {
      console.error("Error submitting card:", error);
      toast.error("An error occurred while adding a card.");
    }
  };

  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchCards());
  }, [dispatch]);

  // Adres güncelleme işlemi
  const handleUpdateAddress = async (address) => {
    await dispatch(updateAddress(address));
  };

  // Adres silme işlemi
  const handleDeleteAddress = async (addressId) => {
    await dispatch(deleteAddress(addressId));
  };

  const handleCardDelete = async (cardId) => {
    await dispatch(deleteCard(cardId));
  };

  const handleEditCard = (card) => {
    setNewCard({
      id: card.id,
      card_no: card.card_no,
      expire_month: card.expire_month,
      expire_year: card.expire_year,
      name_on_card: card.name_on_card,
    });
    setShowCardForm(true);
  };

  // Buton durumunu kontrol eden fonksiyon
  const isButtonActive = () => {
    if (selectedTab === "address") {
      return selectedAddress !== null;
    }
    if (selectedTab === "card") {
      return selectedCard !== null;
    }
    return false;
  };

  const handleCreateOrder = async () => {
    if (selectedAddress && selectedCard) {
      const selectedCardData = creditCards.find(
        (card) => card.id === selectedCard
      );

      const orderData = {
        address_id: selectedAddress,
        order_date: new Date().toISOString(),
        card_no: selectedCardData.card_no,
        card_name: selectedCardData.name_on_card,
        card_expire_month: selectedCardData.expire_month,
        card_expire_year: selectedCardData.expire_year,
        card_ccv: "123", // Güvenlik için gerçek CCV kullanılmıyor
        price: calculateTotal(),
        products: cart
          .filter((item) => item.checked)
          .map((item) => ({
            product_id: item.product.id,
            count: item.count,
            detail: `${item.product.color} - ${item.product.size}`,
          })),
      };

      try {
        const success = await dispatch(createOrder(orderData));
        if (success) {
          setShowSuccess(true); // Show success modal instead of toast
          await dispatch(clearCart()); // Sepeti temizle
          toast.success("Order completed successfully.");
          // Don't redirect immediately, let user click the continue button
        } else {
          toast.error("An error occurred while creating the order.");
        }
      } catch (error) {
        console.error("Order creation error:", error);
        toast.error("An error occurred while creating the order.");
      }
    }
  };

  // Buton işlevini yöneten fonksiyon
  const handleButtonClick = () => {
    if (selectedTab === "address" && selectedAddress) {
      setSelectedTab("card");
    } else if (selectedTab === "card" && selectedCard) {
      handleCreateOrder();
    }
  };

  const renderAddressSection = () => (
    <div className="mt-8 ">
      <h2 className="text-xl font-semibold mb-2">Address Information</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
          {addresses && addresses.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`relative p-4 border border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all w-full ${
                    selectedAddress === address.id
                      ? "bg-blue-50 border border-Primary"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="mr-2"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-500 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setNewAddress({
                            title: address.title,
                            name: address.name,
                            phone: address.phone,
                            city: address.city,
                            district: address.district,
                            neighborhood: address.neighborhood,
                            address: address.address,
                          });
                          setShowForm(true);
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-pencil"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{address.name}</span>
                    <span>{address.phone}</span>
                  </div>
                  <div className="text-sm">
                    {`${address.title}, ${address.city}, ${address.district}, ${address.neighborhood}, ${address.address}`}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You do not have a registered address.</p>
          )}
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="w-full flex items-center justify-center p-6 border-2 border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all group"
          >
            <span className="flex items-center text-Primary group-hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Address
            </span>
          </button>
        </div>
        {/* Fatura Adresi */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-2">Invoice Address</h3>
          {addresses && addresses.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`relative p-4 border border-green-300 rounded-xl hover:bg-green-50 hover:border-green-400 transition-all w-full ${
                    selectedBillingAddress === address.id
                      ? "bg-green-50 border border-Primary"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <input
                      type="radio"
                      name="selectedBillingAddress"
                      value={address.id}
                      checked={selectedBillingAddress === address.id}
                      onChange={() => setSelectedBillingAddress(address.id)}
                      className="mr-2"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-500 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setNewAddress({
                            title: address.title,
                            name: address.name,
                            phone: address.phone,
                            city: address.city,
                            district: address.district,
                            neighborhood: address.neighborhood,
                            address: address.address,
                          });
                          setShowForm(true);
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-pencil"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{address.name}</span>
                    <span>{address.phone}</span>
                  </div>
                  <div className="text-sm">
                    {`${address.title}, ${address.city}, ${address.district}, ${address.neighborhood}, ${address.address}`}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You do not have a registered address.</p>
          )}
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="w-full flex items-center justify-center p-6 border-2 border-dashed border-green-300 rounded-xl hover:bg-green-50 hover:border-green-400 transition-all group"
          >
            <span className="flex items-center text-succes group-hover:text-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Invoice Address
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCardSection = () => (
    <div className="card-section bg-white p-10 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Registered Cards</h2>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-4">
          {creditCards && creditCards.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
              {creditCards.map((card) => (
                <label key={card.id} className="block cursor-pointer">
                  <div
                    className={`relative overflow-hidden rounded-xl ${
                      selectedCard === card.id
                        ? "bg-gradient-to-r from-Primary to-Secondary"
                        : "bg-gradient-to-r from-gray-400 to-gray-500"
                    } text-white p-6 aspect-[1.7/1]`}
                  >
                    <div className="absolute top-4 left-4">
                      <svg
                        width="35"
                        height="25"
                        viewBox="0 0 45 35"
                        fill="none"
                      >
                        <path
                          d="M0 5C0 2.23858 2.23858 0 5 0H40C42.7614 0 45 2.23858 45 5V30C45 32.7614 42.7614 35 40 35H5C2.23858 35 0 32.7614 0 30V5Z"
                          fill="#FFD700"
                        />
                        <rect
                          x="5"
                          y="8"
                          width="35"
                          height="5"
                          fill="#DAA520"
                        />
                        <rect
                          x="5"
                          y="16"
                          width="35"
                          height="5"
                          fill="#DAA520"
                        />
                      </svg>
                    </div>
                    <div className="mt-8">
                      <input
                        type="radio"
                        name="paymentCard"
                        value={card.id}
                        checked={selectedCard === card.id}
                        onChange={() => setSelectedCard(card.id)}
                        className="absolute top-4 right-4"
                      />
                      <p className="text-lg font-mono tracking-wider mb-2">
                        **** **** **** {card.card_no.slice(-4)}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs opacity-75">Card Owner</p>
                          <p className="font-medium">{card.name_on_card}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-75">Expiry Date</p>
                          <p className="font-mono">
                            {card.expire_month}/{card.expire_year}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEditCard(card);
                        }}
                        className="opacity-75 hover:opacity-100 transition-opacity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 20h9"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCardDelete(card.id);
                        }}
                        className="opacity-75 hover:opacity-100 transition-opacity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute top-4 right-12">
                      <div className="text-white text-xs font-bold opacity-75">
                        MASTERCARD
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </ul>
          ) : (
            <p>You do not have a registered card.</p>
          )}

          <button
            onClick={() => setShowCardForm(true)}
            className="w-full flex items-center justify-center p-6 border-2 border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all group"
          >
            <span className="flex items-center text-Primary group-hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Card
            </span>
          </button>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-6">Installment Options</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                name="installmentOption"
                value="singlePayment"
                checked={true}
                className="form-radio h-5 w-5 text-Primary"
              />
              <label className="text-ml">One Take</label>
            </div>
            <div className="text-right">
              <span className="text-gray-500">
                {(
                  calculateTotal() * (0.5).toFixed(2) +
                  (calculateTotal() * (0.5).toFixed(2) > 500 ? 0 : 49.9)
                ).toFixed(2)}{" "}
                $
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                name="installmentOption"
                value="installment"
                className="form-radio h-5 w-5 text-Primary"
              />
              <label className="text-ml">2 Inst.</label>
            </div>
            <div className="text-right">
              <span className="text-gray-500">
                {(
                  (calculateTotal() * (0.55).toFixed(2) +
                    (calculateTotal() * (0.5).toFixed(2) > 500 ? 0 : 49.9)) /
                  3
                ).toFixed(2)}{" "}
                $ x 2 mo.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                name="installmentOption"
                value="installment"
                className="form-radio h-5 w-5 text-Primary"
              />
              <label className="text-ml">3 Inst.</label>
            </div>
            <div className="text-right">
              <span className="text-gray-500">
                {(
                  (calculateTotal() * (0.6).toFixed(2) +
                    (calculateTotal() * (0.5).toFixed(2) > 500 ? 0 : 49.9)) /
                  3
                ).toFixed(2)}{" "}
                $ x 3 mo.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                name="installmentOption"
                value="installment"
                className="form-radio h-5 w-5 text-Primary"
              />
              <label className="text-ml">6 Inst.</label>
            </div>
            <div className="text-right">
              <span className="text-gray-500">
                {(
                  (calculateTotal() * (0.65).toFixed(2) +
                    (calculateTotal() * (0.5).toFixed(2) > 500 ? 0 : 49.9)) /
                  3
                ).toFixed(2)}{" "}
                $ x 6 mo.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between gap-8">
        {/* Left Side - Tab Content */}
        <div className="w-2/3">
          {/* Tab Buttons */}
          <div className="flex space-x-4 border-b mb-6">
            <button
              className={`py-2 px-4 ${
                selectedTab === "address"
                  ? "border-b-2 border-Primary text-Primary font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("address")}
            >
              Address Information
            </button>
            <button
              className={`py-2 px-4 ${
                selectedTab === "card"
                  ? "border-b-2 border-Primary text-Primary font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("card")}
            >
              Card Information
            </button>
          </div>

          {/* Dynamic Content Area */}
          <div className="bg-white rounded-lg p-6 shadow-sm min-h-[400px]">
            {selectedTab === "address"
              ? renderAddressSection()
              : selectedTab === "card"
              ? renderCardSection()
              : null}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">
              Order Summary (
              {cart
                .filter((item) => item.checked)
                .reduce((total, item) => total + item.count, 0)}{" "}
              Product)
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{(calculateTotal() * 0.5).toFixed(2)} $</span>
              </div>
              {(calculateTotal() * 0.5).toFixed(2) > 0 && (
                <div className="flex justify-between">
                  <span>Cargo</span>
                  <span>49.90 $</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="flex flex-wrap">
                  {calculateTotal() * (0.5).toFixed(2) > 500
                    ? "Free shipping for purchases of 500 $ and above"
                    : ""}
                </span>
                <span className="text-red-500">
                  {calculateTotal() * (0.5).toFixed(2) > 500 ? "- 49.90 $" : ""}
                </span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Toplam</span>
                  {(calculateTotal() * 0.5).toFixed(2) > 0 ? (
                    <span>
                      {(
                        calculateTotal() * (0.5).toFixed(2) +
                        (calculateTotal() * (0.5).toFixed(2) > 500 ? 0 : 49.9)
                      ).toFixed(2)}
                      $
                    </span>
                  ) : (
                    <span>{calculateTotal() * (0.5).toFixed(2)}$</span>
                  )}
                </div>
              </div>
              <button
                onClick={handleButtonClick}
                disabled={!isButtonActive()}
                className={`w-full py-3 rounded-md mt-6 transition-all ${
                  isButtonActive()
                    ? "bg-Primary text-white hover:bg-Primary/90"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selectedTab === "address"
                  ? "Save and Continue"
                  : selectedTab === "card"
                  ? "Make a Payment"
                  : "Continue"}
              </button>
              <span className="h7 text-red-600">
                {calculateTotal() * (0.5).toFixed(2) > 500
                  ? ""
                  : "Free shipping for purchases of 500 $ and above"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSuccess && <OrderSuccess />}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleAddAddress}
            className="bg-white p-8 rounded shadow-md w-full sm:w-1/3"
          >
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>

            {/* Ad ve Soyad */}
            <div className="flex justify-between gap-4 mb-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Surname<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Enter your surname"
                  value={newAddress.surname}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded"
                />
              </div>
            </div>

            {/* Telefon ve İl */}
            <div className="flex justify-between gap-4 mb-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="0(---)--- -- --"
                  value={newAddress.phone}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  City<span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={newAddress.city}
                  onChange={handleCityChange} // Dinamik ilçe güncellemesi
                  required
                  className="block w-full border p-2 rounded text-gray-500"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* İlçe ve Mahalle */}
            <div className="flex justify-between gap-4 mb-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  District<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="Enter district"
                  value={newAddress.district}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Neighborhood<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  placeholder="Enter neighborhood"
                  value={newAddress.neighborhood}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded"
                />
              </div>
            </div>

            {/* Adres Detayı */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Address Detail<span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                placeholder="Enter detailed address information"
                value={newAddress.address}
                onChange={handleInputChange}
                required
                className="block w-full border p-2 rounded"
              />
            </div>

            {/* Adres Başlığı */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Address Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Address Title"
                value={newAddress.title}
                onChange={handleInputChange}
                required
                className="block w-full border p-2 rounded"
              />
            </div>

            {/* Butonlar */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                type="submit"
                className="bg-Primary text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showCardForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleCardSubmit}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4">Add New Card</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name on the Card
                </label>
                <input
                  type="text"
                  name="name_on_card"
                  value={newCard.name_on_card}
                  onChange={handleCardInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="card_no"
                  value={newCard.card_no}
                  onChange={handleCardInputChange}
                  className="w-full border rounded p-2"
                  maxLength="19" // 16 digits + 3 spaces
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry Month
                  </label>
                  <select
                    name="expire_month"
                    value={newCard.expire_month}
                    onChange={handleCardInputChange}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (month) => (
                        <option key={month} value={month}>
                          {month.toString().padStart(2, "0")}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry Year
                  </label>
                  <select
                    name="expire_year"
                    value={newCard.expire_year}
                    onChange={handleCardInputChange}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">Select Year</option>
                    {Array.from(
                      { length: 10 },
                      (_, i) => new Date().getFullYear() + i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowCardForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-Primary text-white rounded hover:bg-Primary/90"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
