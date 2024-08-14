import { useState, useCallback, useEffect, useRef} from 'react'

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
    // we can know a lot thing about passwor through password reference
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
        <div className='h-screen w-screen bg-one flex flex-wrap flex-col justify-center items-center gap-3'>
            <h1 className='h-max w-max bg-two hover:bg-three rounded-lg text-4xl'>Password Generator</h1>
            <div className='h-max min-w-9 bg-four hover:bg-five rounded-lg'>
                <input type="text" value={password} placeholder='password' readOnly ref={passwordRef} className='rounded-lg p-2 m-2 bg-one w-80' />
                {/* <button className='h-10 w-10 rounded-lg bg-blue-700' onClick={copyPassToClipBoard}>Copy</button> */}
                <button
                  onClick={() => {
                    copyPassToClipBoard();
                    handleClick(); 
                  }} 
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">{buttonText}</button>
            </div>
            <div>
                <div>
                    <input type="range" min={6} max={100} className='cursor-pointer bg-two' onChange={(e) => {setLength(e.target.value)}} />
                    <label>Length: {length}</label>
                </div>
                <div>
                    <input type="checkbox" defaultChecked={isContainNumber} onChange={() => {setIsContainNumber((prev) => !prev)}} />
                    <label>Numbers</label>
                </div>
                <div>
                    <input type="checkbox" defaultChecked={isContainSpecialCharacter} onChange={() => {setIsContainSpecialCharacter((prev) => !prev)}} />
                    <label>characters</label>
                </div>
            </div>
        </div>
    </>
  )
}

export default App