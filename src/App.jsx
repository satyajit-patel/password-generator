import { useState, useCallback, useEffect} from 'react'

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

  return (
    <>
        <div className='h-screen w-screen bg-one flex flex-wrap flex-col justify-center items-center gap-7'>
            <h1 className='h-max w-max bg-two hover:bg-three rounded-lg text-4xl'>Password Generator</h1>
            <div className='h-max w-max bg-four hover:bg-five rounded-lg'>
                <input type="text" value={password} placeholder='password' readOnly className='rounded-lg p-2 m-2 bg-one' />
                <button className='h-10 w-10 rounded-lg bg-blue-700'>Copy</button>
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
