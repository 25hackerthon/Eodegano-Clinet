import { Link } from 'react-router-dom'



export default function HeaderComponent() {
  return (
    <header className="w-full bg-white border-b border-gray-400 h-29 flex items-center sticky top-0 z-[100]">
      <div className="w-full max-w-screen-2xl mx-auto flex items-center px-5 gap-10">
        <Link to="/" className="flex items-center gap-3 no-underline cursor-pointer">
          <div className="w-13 h-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg flex items-center justify-center before:content-['✈'] before:text-2xl before:text-white">
          </div>
          <span className="font-inter font-light text-4xl text-black">
            logo
          </span>
        </Link>
      </div>
    </header>
  )

}
