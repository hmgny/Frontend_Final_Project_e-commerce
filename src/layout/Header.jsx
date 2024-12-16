import React, { useEffect, useState } from "react";
import { User, Search, ShoppingCart, AlignRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

function Header() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // localStorage'dan kullanıcı bilgisini al
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Kullanıcıyı state'e yerleştir
    }
  }, []); // State sadece component mount olduğunda güncellenir.

  const handleLogout = () => {
    // Çıkış yapıldığında localStorage'ı temizle
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Kullanıcıyı state'ten sil
  };

  return (
    <header className="flex flex-col px-8 py-4 sm:flex-row sm:justify-between">
      <div className="flex justify-between w-full">
        <Link
          to=""
          className="h4 font-bold text-textColor sm:flex sm:justify-start"
        >
          Bandage
        </Link>
      

      <div className="flex gap-5 items-center justify-end">
        <div className="flex gap-1">
          {user ? (
            <div className="flex items-center">
              <Avatar
                className="hidden sm:block "
                name={user.name}
                src={user.avatar || "/images/men.jpg"}
                size="40" // Avatar boyutu
                round={true} // Yuvarlak avatar
              />
              <h6 className="text-Primary h6 font-bold ml-2 hidden sm:block">
                {user.name}
              </h6>
              <button
                onClick={handleLogout}
                className="ml-2 text-red-500 font-bold"
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="flex">
                <p className="w-6 h-6">
                  <User className="text-black sm:text-Primary" />
                </p>
                <h6 className="text-Primary h6 font-bold">Login</h6>
              </Link>
              <h6 className="text-Primary h6 font-bold">/</h6>
              <Link to="/signup" className="flex">
                <h6 className="text-Primary h6 font-bold">Register</h6>
              </Link>
            </>
          )}
        </div>

        <Link to="" className="w-6 h-6">
          <Search className="text-black sm:text-Primary" />
        </Link>
        <Link to="" className="w-6 h-6">
          <ShoppingCart className="text-black sm:text-Primary" />
        </Link>
        <Link to="" className="sm:w-6 sm:h-6 hidden sm:block">
          <Heart className="sm:text-Primary" />
        </Link>
        <button
          className="w-6 h-6 sm:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AlignRight className="text-black" />
        </button>
      </div>
      </div>
      <div className={`flex flex-col items-center gap-7 py-20 sm:flex-row sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <Link to="" className="text-SecondaryTextColor h3">
          Home
        </Link>
        <Link to="" className="text-SecondaryTextColor h3">
          Product
        </Link>
        <Link to="" className="text-SecondaryTextColor h3">
          Pricing
        </Link>
        <Link to="" className="text-SecondaryTextColor h3">
          Contact
        </Link>
      </div>
    </header>
  );
}

export default Header;
