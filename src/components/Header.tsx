import Logo_fake from "../assets/logo_fake.svg";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-3 flex justify-between items-center">
      <img src={Logo_fake} className="w-[5%]" />
    </header>
  );
}
