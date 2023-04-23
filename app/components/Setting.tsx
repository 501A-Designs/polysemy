import React, { useState } from 'react'
import { Button, ButtonProps } from './Button'
import { ClipboardIcon, ColorWheelIcon, CubeIcon, InfoCircledIcon, MagicWandIcon, Pencil1Icon, TextIcon, TransformIcon } from '@radix-ui/react-icons';

interface SettingButtonProps extends ButtonProps{
  name:string,
  action:any,
}

export default function Setting(props:any) {
  const [response, setResponse] = useState([])
  const [commandType, setCommandType] = useState('')
  const changeTheme = () =>{
    console.log('bruh')
  }

  const options:SettingButtonProps[] = [
    {
      icon:<CubeIcon/>,
      name:"Feed data",
      action:props.consume,
    },
    {
      icon:<ColorWheelIcon/>,
      name:"Set to " + "color" + " theme",
      action:changeTheme(),
    },
    {
      icon:<MagicWandIcon/>,
      name:"Copy all text ",
      action:props.copyAllRaw,
    },
    {
      icon:<TextIcon/>,
      name:"Display word count",
      action:() => props.setDisplayWordCound(props.displayWordCound ? false:true),
    },
    {
      icon:<InfoCircledIcon/>,
      name:"View docs",
      action:props.copyAllRaw,
    },
  ];

  return (
    <section
      className={`
        z-0
        sticky top-0
        p-2 print:hidden font-serif select-none
        overflow-x-auto 
        flex items-center
        border-t
        border-gray-300
        bg-gray-100
        dark:border-gray-800
        dark:bg-gray-900
      `}
    >
      {options.map((obj:SettingButtonProps, i:number)=>        
        <Button
          key={i}
          icon={obj.icon}
          onClick={obj.action}
        >
          {obj.name}
        </Button>
      )}
    </section>
  )
}
