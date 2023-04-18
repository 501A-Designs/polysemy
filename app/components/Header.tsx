import React from 'react'


export default function Header({status}:{status:string}) {
  return (
    <header
      className={`
        px-10 py-7 print:hidden font-serif select-none
        border
        text-black
        dark:text-white
        border-gray-200 
        border-b-gray-300
        dark:border-black 
        dark:border-b-gray-800
        bg-gray-200
        dark:bg-gray-900
      `}
    >
      <h1 className="text-2xl whitespace-nowrap">
        Polysemy.{" "}
        {status && 
          <span className="text-xs font-mono text-orange-500">
            {status}
          </span>
        }
      </h1>
      <h6 className="text-xs">
        The blockbased text editor
      </h6>
    </header>
  )
}
