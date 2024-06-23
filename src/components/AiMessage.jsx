import React from 'react'

function AiMessage() {
  return (
    <div
      className="flex items-start space-x-4 bg-transparent w-full"
      dir="ltr"
      style={{
        fontFamily: "'Inter', sans-serif",
        wordBreak: "break-word",
      }}
    >
      <div className='flex-shrink-0'>
        <div className='w-10 h-10 rounded-full bg-gray-300'></div> {/* AI Image Placeholder */}
      </div>
      <div className="flex-1">
        <h1 className='text-base leading-normal'>
          The platform covers HTML, CSS, JavaScript, and React in the
          Frontend Developer Career Path, and AI solutions in the AI
          Engineering Path. The platform covers HTML, CSS, JavaScript,
          and React in the Frontend Developer Career Path, and AI
          solutions in the AI Engineering Path.
        </h1>
      </div>
    </div>
  )
}

export default AiMessage
