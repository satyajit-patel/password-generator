import { useState, useCallback, useEffect, useRef} from 'react'

import {ShootingStarsAndStarsBackgroundDemo} from './components/shootingStarBackground/ShootingStarsAndStarsBackgroundDemo'
import {TextCard} from './components/textReveal/TextCard'

function App() {
  let [length, setLength] = useState(8);
  let [isContainNumber, setIsContainNumber] = useState(false);
  let [isContainSpecialCharacter, setIsContainSpecialCharacter] = useState(false);
  let [password, setPassword] = useState("");

  // this is for optimization (caching)
  const getPassword = useCallback(() => { // useCallback is like memoization(optimization)
    let ans = "";

    let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX";
    if(isContainNumber) {
      s += "0123456789";
    }
    if(isContainSpecialCharacter) {
      s += "`~!@#$%^&*()-_=+[]{}";
    }
    for(let i=0; i<length; i++) {
      let index = Math.floor(Math.random() * s.length + 1);
      ans += s[index]; 
    }

    setPassword(ans);
  }, [length, isContainNumber, isContainSpecialCharacter, setPassword]);

  // this is for run
  useEffect(() => {getPassword()}, [length, isContainNumber, isContainSpecialCharacter, getPassword]);

  // useRef Hook
  const passwordRef = useRef(null);

  // we can optimize this also
  const copyPassToClipBoard = useCallback(() => {
    // we can know a lot thing about password through password reference
    // passwordRef
    passwordRef.current?.select(); // shows blue background sign that pass has been selected
    // ? means optionally select as value could be zero
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]); // I think in dependencies only passwod will be affect

  const [buttonText, setButtonText] = useState('Copy');
  const handleClick = () => {
      setButtonText('Copied!');
      // Reset the button text back to 'Copy' after a 2-second delay
      setTimeout(() => {
          setButtonText('Copy');
      }, 2000);
  };

  return (
    <>
      <div className="relative h-screen w-screen flex flex-wrap items-center justify-center">

        <div className="absolute inset-0 z-0">
          <ShootingStarsAndStarsBackgroundDemo />
        </div>

        <div className='flex flex-wrap flex-col h-[800px]'>
          <div className='h-[50px] w-[560px]'>
            <TextCard />
          </div>

          <div className='relative z-10 h-[100px] w-[560px] bg-four rounded-lg flex flex-wrap'>
              <div>
                <input type="text" value={password} placeholder='password' readOnly ref={passwordRef} className='rounded-md p-2 bg-one h-12 w-[450px] text-slate-400' />
                <button 
                  onClick={() => {
                    copyPassToClipBoard();
                    handleClick(); 
                  }} 
                  className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  {buttonText}
                </button>
              </div>
              <div>
                <label className='text-slate-400'>Length:{length}</label>
                <input type="range" min={6} max={100} className='m-2 cursor-pointer bg-slate-400' onChange={(e) => {setLength(e.target.value)}} />

                <input className='m-2 bg-slate-400' type="checkbox" defaultChecked={isContainNumber} onChange={() => {setIsContainNumber((prev) => !prev)}} />
                <label className='text-slate-400'>Numbers</label>

                <input className='m-2 bg-slate-400' type="checkbox" defaultChecked={isContainSpecialCharacter} onChange={() => {setIsContainSpecialCharacter((prev) => !prev)}} />
                <label className='text-slate-400'>characters</label>
              </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App