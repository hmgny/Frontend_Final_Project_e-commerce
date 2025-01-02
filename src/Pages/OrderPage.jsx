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
  const [cities, setCities] = useState(["İstanbul", "Ankara", "İzmir"]); // Örnek iller
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

    // İlçeleri güncelle
    if (selectedCity === "İstanbul") {
      setDistricts(["Kadıköy", "Üsküdar", "Beşiktaş"]);
    } else if (selectedCity === "Ankara") {
      setDistricts(["Çankaya", "Keçiören", "Altındağ"]);
    } else if (selectedCity === "İzmir") {
      setDistricts(["Karşıyaka", "Konak", "Bornova"]);
    } else {
      setDistricts([]);
    }
    setNeighborhoods([]); // İl değiştiğinde mahalleleri sıfırla
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setNewAddress({ ...newAddress, district: selectedDistrict });

    // Mahalleleri güncelle
    if (selectedDistrict === "Kadıköy") {
      setNeighborhoods(["Bostancı", "Erenköy", "Suadiye"]);
    } else if (selectedDistrict === "Çankaya") {
      setNeighborhoods(["Ayrancı", "Birlik", "Bahçelievler"]);
    } else {
      setNeighborhoods([]);
    }
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
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCard(newCard));
      setShowCardForm(false);
      setNewCard({
        card_no: "",
        expire_month: "",
        expire_year: "",
        name_on_card: "",
      });
    } catch (error) {
      console.error("Error submitting card:", error);
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
      console.log("order dataaaaaaaaaaaaaaaaaaa", orderData);

      try {
        const success = await dispatch(createOrder(orderData));
        if (success) {
          setShowSuccess(true); // Show success modal instead of toast
          await dispatch(clearCart()); // Sepeti temizle
          // Don't redirect immediately, let user click the continue button
        } else {
          toast.error("Sipariş oluşturulurken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Order creation error:", error);
        toast.error("Sipariş oluşturulurken bir hata oluştu.");
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
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Teslimat Adresi</h2>
      {addresses && addresses.length > 0 ? (
        <ul className="list-disc pl-5">
          {addresses.map((address) => (
            <li
              key={address.id}
              className={`mb-2 p-4 rounded-lg ${
                selectedAddress === address.id
                  ? "bg-blue-50 border border-Primary"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="selectedAddress"
                value={address.id}
                checked={selectedAddress === address.id}
                onChange={() => setSelectedAddress(address.id)}
                className="mr-2"
              />
              {`${address.title}, ${address.city}, ${address.district}, ${address.neighborhood}`}
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="ml-4 text-red-500 hover:underline"
              >
                Sil
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
                  });
                  setShowForm(true);
                }}
                className="ml-4 text-blue-500 hover:underline"
              >
                Güncelle
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Kayıtlı adresiniz bulunmamaktadır.</p>
      )}

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        + Yeni Adres Ekle
      </button>
    </div>
  );

  const renderCardSection = () => (
    <div className="card-section bg-white p-10 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Kayıtlı Kartlarım</h2>
      <div className="space-y-4">
        {creditCards && creditCards.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4">
            {" "}
            {/* Changed from grid-cols-1 to grid-cols-2 */}
            {creditCards.map((card) => (
              <label key={card.id} className="block cursor-pointer">
                <div
                  className={`relative overflow-hidden rounded-xl ${
                    selectedCard === card.id
                      ? "bg-gradient-to-r from-Primary to-Secondary"
                      : "bg-gradient-to-r from-gray-400 to-gray-500"
                  } text-white p-6 aspect-[1.7/1]`}
                >
                  {" "}
                  {/* Added fixed height */}
                  {/* Rest of the card content */}
                  <div className="absolute top-4 left-4">
                    <svg width="45" height="35" viewBox="0 0 45 35" fill="none">
                      <path
                        d="M0 5C0 2.23858 2.23858 0 5 0H40C42.7614 0 45 2.23858 45 5V30C45 32.7614 42.7614 35 40 35H5C2.23858 35 0 32.7614 0 30V5Z"
                        fill="#FFD700"
                      />
                      <rect x="5" y="8" width="35" height="5" fill="#DAA520" />
                      <rect x="5" y="16" width="35" height="5" fill="#DAA520" />
                    </svg>
                  </div>
                  {/* Card Content */}
                  <div className="mt-12">
                    <input
                      type="radio"
                      name="paymentCard"
                      value={card.id}
                      checked={selectedCard === card.id}
                      onChange={() => setSelectedCard(card.id)}
                      className="absolute top-4 right-4"
                    />
                    <p className="text-2xl font-mono tracking-wider mb-8">
                      **** **** **** {card.card_no.slice(-4)}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-75">Kart Sahibi</p>
                        <p className="font-medium">{card.name_on_card}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-75">Son Kullanma</p>
                        <p className="font-mono">
                          {card.expire_month}/{card.expire_year}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCardDelete(card.id);
                    }}
                    className="absolute bottom-4 right-4 opacity-75 hover:opacity-100 transition-opacity"
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
                  {/* Card Network Logo - Updated positioning and size */}
                  <div className="absolute top-4 right-12">
                    <div className="text-white text-sm font-bold opacity-75">
                      MASTERCARD
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </ul>
        ) : (
          <p>Kayıtlı kartınız bulunmamaktadır.</p>
        )}

        {/* Add New Card Button - full width */}
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
            Yeni Kart Ekle
          </span>
        </button>
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
              Adres Bilgileri
            </button>
            <button
              className={`py-2 px-4 ${
                selectedTab === "card"
                  ? "border-b-2 border-Primary text-Primary font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("card")}
            >
              Kart Bilgileri
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
                onClick={handleButtonClick}
                disabled={!isButtonActive()}
                className={`w-full py-3 rounded-md mt-6 transition-all ${
                  isButtonActive()
                    ? "bg-Primary text-white hover:bg-Primary/90"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selectedTab === "address"
                  ? "Kaydet ve Devam Et"
                  : selectedTab === "card"
                  ? "Ödeme Yap"
                  : "Devam Et"}
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

      {/* Modals */}
      {showSuccess && <OrderSuccess />}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleAddAddress}
            className="bg-white p-8 rounded shadow-md w-full sm:w-1/3"
          >
            <h3 className="text-lg font-semibold mb-4">Yeni Adres Ekle</h3>

            {/* Ad ve Soyad */}
            <div className="flex justify-between gap-4 mb-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Ad<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Adınızı giriniz"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Soyad<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Soyadınızı giriniz"
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
                  Telefon<span className="text-red-500">*</span>
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
                  İl<span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={newAddress.city}
                  onChange={handleCityChange} // Dinamik ilçe güncellemesi
                  required
                  className="block w-full border p-2 rounded"
                >
                  <option value="">İl Seçiniz</option>
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
                  İlçe<span className="text-red-500">*</span>
                </label>
                <select
                  name="district"
                  value={newAddress.district}
                  onChange={handleDistrictChange} // Dinamik mahalle güncellemesi
                  required
                  className="block w-full border p-2 rounded"
                >
                  <option value="">İlçe Seçiniz</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Mahalle<span className="text-red-500">*</span>
                </label>
                <select
                  name="neighborhood"
                  value={newAddress.neighborhood}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded"
                >
                  <option value="">Mahalle Seçiniz</option>
                  {neighborhoods.map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Adres Detayı */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Adres Detayı<span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                placeholder="Detaylı adres bilgisi giriniz"
                value={newAddress.address}
                onChange={handleInputChange}
                required
                className="block w-full border p-2 rounded"
              />
            </div>

            {/* Adres Başlığı */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Adres Başlığı<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Adres Başlığı"
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
                İptal
              </button>
              <button
                onClick={handleAddAddress}
                type="submit"
                className="bg-Primary text-white py-2 px-4 rounded"
              >
                Kaydet
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
            <h3 className="text-lg font-semibold mb-4">Yeni Kart Ekle</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Kart Üzerindeki İsim
                </label>
                <input
                  type="text"
                  value={newCard.name_on_card}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      name_on_card: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Kart Numarası
                </label>
                <input
                  type="text"
                  value={newCard.card_no}
                  onChange={(e) =>
                    setNewCard({ ...newCard, card_no: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  maxLength="16"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Son Kullanma Ay
                  </label>
                  <select
                    value={newCard.expire_month}
                    onChange={(e) =>
                      setNewCard({
                        ...newCard,
                        expire_month: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">Ay Seçin</option>
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
                    Son Kullanma Yıl
                  </label>
                  <select
                    value={newCard.expire_year}
                    onChange={(e) =>
                      setNewCard({
                        ...newCard,
                        expire_year: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">Yıl Seçin</option>
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
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-Primary text-white rounded hover:bg-Primary/90"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
