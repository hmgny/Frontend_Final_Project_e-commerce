import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../store/actions/orderActions";
import {
  fetchCards,
  addCard,
  updateCard,
  deleteCard,
} from "../store/actions/cardActions";

const OrderPage = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.order?.addresses || []);
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
  const cards = useSelector((state) => state.card?.cards || []);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
  });

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
    if (!token) {
      history.push("/login");
    } else {
      dispatch(fetchAddresses());
      dispatch(fetchCards());
    }
  }, [history, token, dispatch]);

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
      // Adres eklendikten sonra adres listesini güncelle
      dispatch(fetchAddresses());
      console.log("adres eklendi", fetchAddresses);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  // Adres güncelleme işlemi
  const handleUpdateAddress = async (address) => {
    await dispatch(updateAddress(address));
  };

  // Adres silme işlemi
  const handleDeleteAddress = async (addressId) => {
    await dispatch(deleteAddress(addressId));
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(addCard(newCard));
    if (success) {
      setShowCardForm(false);
      setNewCard({
        card_no: "",
        expire_month: "",
        expire_year: "",
        name_on_card: "",
      });
    }
  };

  const handleCardDelete = async (cardId) => {
    await dispatch(deleteCard(cardId));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start">
        <div className="w-3/5 p-4">
          <div className="flex justify-around mb-4">
            <button
              className={`p-2 ${
                selectedTab === "address" ? "border-b-2 border-Primary" : ""
              }`}
              onClick={() => setSelectedTab("address")}
            >
              Adres Bilgileri
            </button>
            <button
              className={`p-2 ${
                selectedTab === "card" ? "border-b-2 border-Primary" : ""
              }`}
              onClick={() => setSelectedTab("card")}
            >
              Kart Bilgileri
            </button>
          </div>
          {selectedTab === "address" && (
            <div className="address-section">
              <h2 className="text-xl font-semibold mb-4">Teslimat Adresi</h2>
              <div className="grid grid-cols-1 gap-4">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`relative border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                      selectedAddress === address.id
                        ? "border-Primary bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="deliveryAddress"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                        className="mt-1"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-lg mb-1">
                            {address.title}
                          </h3>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteAddress(address.id);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-1">{`${address.name} ${address.surname}`}</p>
                        <p className="text-gray-600 mb-1">{address.phone}</p>
                        <p className="text-gray-600">{`${address.address}`}</p>
                        <p className="text-gray-600">{`${address.neighborhood} Mah. ${address.district}/${address.city}`}</p>
                      </div>
                    </div>
                  </label>
                ))}

                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-Primary hover:bg-gray-50"
                >
                  <div className="text-center">
                    <span className="block text-3xl mb-2">+</span>
                    <span className="text-gray-600">Yeni Adres Ekle</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {selectedTab === "card" && (
            <div className="card-section bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Kayıtlı Kartlarım</h2>
              <div className="space-y-4">
                {cards.map((card) => (
                  <label
                    key={card.id}
                    className={`flex items-start p-4 border rounded-lg cursor-pointer ${
                      selectedCard === card.id
                        ? "border-Primary bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentCard"
                      value={card.id}
                      checked={selectedCard === card.id}
                      onChange={() => setSelectedCard(card.id)}
                      className="mt-1"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <p className="font-medium">{card.name_on_card}</p>
                        <button
                          onClick={() => handleCardDelete(card.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Sil
                        </button>
                      </div>
                      <p className="text-gray-600">
                        **** **** **** {card.card_no.slice(-4)}
                      </p>
                      <p className="text-gray-600">
                        {card.expire_month}/{card.expire_year}
                      </p>
                    </div>
                  </label>
                ))}

                <button
                  onClick={() => setShowCardForm(true)}
                  className="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-Primary"
                >
                  <span className="text-gray-600">+ Yeni Kart Ekle</span>
                </button>
              </div>

              {showCardForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <form
                    onSubmit={handleCardSubmit}
                    className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      Yeni Kart Ekle
                    </h3>

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
          )}

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
        </div>

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
              <button className="w-full bg-Primary text-white py-3 rounded-md mt-6 hover:bg-Primary/90">
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
    </div>
  );
};

export default OrderPage;
