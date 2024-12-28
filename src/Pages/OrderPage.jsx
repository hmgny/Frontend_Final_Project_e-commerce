import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"; // Backend ile iletişim için axios kullanıyoruz.

const OrderPage = () => {
  const history = useHistory();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]); // Başlangıçta boş bir dizi olarak tanımlanır.
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
      fetchAddresses();
    }
  }, [history, token]);

  // Adres listesini backend'den çek
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        "https://workintech-fe-ecommerce.onrender.com/user/address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Gelen verinin bir dizi olduğundan emin olun
      if (Array.isArray(response.data)) {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error("Error fetching addresses", error);
      setAddresses([]); // Hata durumunda boş bir dizi set edin
    }
  };

  // Formdaki inputları kontrol et
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Adres eklemek için API'ye POST isteği gönder
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://workintech-fe-ecommerce.onrender.com/user/address",
        {
          title: newAddress.title,
          name: newAddress.name,
          surname: newAddress.surname,
          phone: newAddress.phone,
          city: newAddress.city,
          district: newAddress.district,
          neighborhood: newAddress.neighborhood,
          address: newAddress.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses([...addresses, response.data]); // Yeni adresi listeye ekle
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
      console.error("Error adding address", error);
    }
  };

  // Adres güncelleme işlemi
  const handleUpdateAddress = async (address) => {
    try {
      const response = await axios.put(
        "https://workintech-fe-ecommerce.onrender.com/user/address",
        {
          id: address.id,
          title: address.title,
          name: address.name,
          surname: address.surname,
          phone: address.phone,
          city: address.city,
          district: address.district,
          neighborhood: address.neighborhood,
          address: address.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses(
        addresses.map((addr) => (addr.id === address.id ? response.data : addr))
      );
    } catch (error) {
      console.error("Error updating address", error);
    }
  };

  // Adres silme işlemi
  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(
        `https://workintech-fe-ecommerce.onrender.com/user/address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses(addresses.filter((address) => address.id !== addressId));
    } catch (error) {
      console.error("Error deleting address", error);
    }
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
            <>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border p-4 mb-2 rounded cursor-pointer ${
                    selectedAddress === address.id
                      ? "border-Primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <h3 className="font-bold">{address.title}</h3>
                  <p>{`${address.name} ${address.surname}`}</p>
                  <p>{address.phone}</p>
                  <p>{`${address.city}, ${address.district}, ${address.neighborhood}`}</p>
                  <p>{address.address}</p>
                </div>
              ))}

              <button
                className="mt-4 text-blue-500 underline"
                onClick={() => setShowForm(true)}
              >
                Yeni Adres Ekle
              </button>
            </>
          )}

          {selectedTab === "card" && (
            <div>
              <p>Kart bilgileri burada görünecek.</p>
              {/* Kart bilgileri formu buraya eklenebilir */}
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

        <div className="w-2/5 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-4">Sipariş Özeti</h2>
          <p className="mb-2">
            Ürünün Toplamı: <strong>8.448,99 TL</strong>
          </p>
          <p className="mb-2">
            Kargo Toplamı: <strong>29,99 TL</strong>
          </p>
          <p className="mb-4">
            Toplam: <strong>8.478,98 TL</strong>
          </p>
          <button className="w-full bg-Primary text-white py-2 px-4 rounded">
            Kaydet ve Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
