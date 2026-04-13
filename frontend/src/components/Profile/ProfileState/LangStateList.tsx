import React from 'react'
interface props {
        languages: { label: string; hours: number }[];
        getColor: (index: number) => string;
}

export default function LangStateList({ languages, getColor }: props) {
  return (
    <div className='flex flex-col overflow-y-auto scrollbar-hide [scrollbar-width:none] gap-4 h-full'>
       { languages.map((lang, index) => (
        <List key={index} language={lang.label} hours={lang.hours} color={getColor(index)} />
       ))}
    </div>
  )
}


function List({language, hours, color} : {language : string, hours : number, color : string}) {
    return(
        <div className='flex items-center justify-between border border-(--color-border) rounded-2xl px-5 py-4 gap-2 '>
        <div className='flex items-center gap-4'>
        <span className="h-5 w-5 rounded-full" style={{ backgroundColor: color }} />
        <span className='font-semibold text-xl text-(--color-text-primary)'>{language}</span>
        </div>

        <div className='flex flex-col '>
            <span className='font-semibold text-xl text-(--color-text-primary)'>{hours}</span>
            <span className='font-medium text-sm text-(--color-text-secondary)'>50.3%</span>
        </div>
        </div>
    )
}