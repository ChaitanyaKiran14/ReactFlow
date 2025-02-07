import React from "react"
import { Search, X } from "lucide-react"
import '../index.css'
export const NodePalette = ({onClose}) => {

  return(
    <div className="absolute top-5 left-5 z-10   w-[300px]  max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden ">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex gap-4">
        <button className="text-black font-medium pb-2 border-b-2 border-pink-500">Node Library</button>
        <button className="text-gray-500 font-medium pb-2" >Subflow Library</button>
        </div>
        <button  onClick={onClose} className='text-gray-400 hover:text-gray-600 '>
        <X className="w-5 h-5" />
        </button>
      </div>

    </div>
  )
}