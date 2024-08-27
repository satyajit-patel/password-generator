import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./text-reveal-card";

import { useState, useCallback, useEffect, useRef} from 'react'

export const TextCard = () => {
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

  const [buttonText, setButtonText] = useState('Copy ...');
  const handleClick = () => {
      setButtonText('Copied!');
      // Reset the button text back to 'Copy' after a 2-second delay
      setTimeout(() => {
          setButtonText('Copy ...');
      }, 2000);
  };

  return (
    
    <div
      className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
      <TextRevealCard text="You know the business" revealText="Code - Satyajit Patel..">
        <TextRevealCardTitle>
          Sometimes, you just need to Create a strong password.
        </TextRevealCardTitle>

        <TextRevealCardDescription>
        <div className='w-[600px] bg-four rounded-lg grid sm:grid-rows-3 gap-2 h-min justify-center'>
              <div className='flex m-2 p-2 gap-2 h-min'>
                <input className='rounded-md h-12 w-[450px] text-slate-400 bg-one' type="text" value={password} placeholder='password' readOnly ref={passwordRef}  />
                <button 
                  onClick={() => {
                    copyPassToClipBoard();
                    handleClick(); 
                  }} 
                  className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  {buttonText}
                </button>
              </div>

              <div className='flex h-min justify-start m-2 p-2 gap-4 items-center'>
                <div className='flex items-center gap-2 bg-one'>
                  <input className='cursor-pointer bg-slate-400' type="range" min={6} max={100} onChange={(e) => {setLength(e.target.value)}} />
                  <label className='text-slate-400'>Length: {length}</label>
                </div>
                
                <div className='flex items-center gap-2 bg-one'>
                  <input className='bg-slate-400' type="checkbox" defaultChecked={isContainNumber} onChange={() => {setIsContainNumber((prev) => !prev)}} />
                  <label className='text-slate-400'>Nums</label>
                </div>
                
                <div className='flex items-center gap-2 bg-one'>
                  <input className='bg-slate-400' type="checkbox" defaultChecked={isContainSpecialCharacter} onChange={() => {setIsContainSpecialCharacter((prev) => !prev)}} />
                  <label className='text-slate-400'>Chars</label>
                </div>
              </div>
          </div>
          </TextRevealCardDescription>



      </TextRevealCard>
    </div>

  )
}


