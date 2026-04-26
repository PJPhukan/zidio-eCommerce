// src/components/Navbar.jsx
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-xl sticky top-0 z-50 transform hover:shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16">
          <Logo />
          <div className="hidden md:block">
            <NavLinks />
          </div>
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <SearchBar />
            <UserActions />
            <div className="md:hidden">
              <NavLinks />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
