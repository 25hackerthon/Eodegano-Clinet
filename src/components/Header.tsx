import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-3 flex justify-between items-center">
      <img src={logo} className="w-[5%] ml-[3%]" />
    </header>
  );
}
