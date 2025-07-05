const { useState, useEffect } = React
export function LongTxt({ txt, minLength = 5, maxLength = 70 }) {
  const [isExtended, setIsExtended] = useState(false)
  const [visibleLength, setVisibleLength] = useState(maxLength)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 500) {
        setVisibleLength(minLength);
      } else if (width >= 500 && width < 900) {
        setVisibleLength(Math.floor((minLength + maxLength) / 2))
      } else {
        setVisibleLength(maxLength)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [minLength, maxLength])


  return (
    <p className='long-txt'>{isExtended ? txt : txt.substring(0, visibleLength)}
      {txt.length > visibleLength && (

        <span onClick={() => setIsExtended(!isExtended)}>
          {isExtended ? '' : '...'}</span>
      )}
    </p>
  )
}