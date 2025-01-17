import { useState, useCallback, useEffect,useRef} from 'react'


function App() {
 const [length, setLength] = useState(8)
 const [num, setNum] = useState(false)
 const [char, setChar] = useState(false)
 const [password, setPassowrd] = useState()


 //ref
 const passwordRef = useRef(null)

 const passwordGet =useCallback( () =>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(num) str += "0123456789"
  if(char) str += "@#$%&*~?,.:;+-_"

  for (let i = 0; i <= length; i++) {
    let char2 = Math.floor(Math.random() * str.length + 1)

    pass += str.charAt(char2)
    
  }
  setPassowrd(pass)

 },[length, num, char, setPassowrd])

 const copyPassword = useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
 },[password])
  
  useEffect ( () => {
     passwordGet()
  }, [length, num , char, passwordGet])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-blue-600 bg-black'>
     <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
       <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3' 
        placeholder='Password'
        ref = {passwordRef}
        />
        <button onClick = {copyPassword} className='outline-none bg-black text-blue-600 font-semibold px-3 py-0.5 shrink-0 rounded-md transform transition duration-300 hover:scale-110 hover:bg-gray-800'>COPY</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min = {6}
          max = {20}
          value = {length}
          className='cursor-pointer'
          onChange = {(e) =>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked = {setNum}
            onChange={() => {
              setNum((prev) => !prev)
            }}
            /><label className=''>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked = {setChar}
          onChange = {() =>{
               setChar((prev) => !prev)
          }}
          /><label className=''>Character</label>

        </div>
      </div>
     </div>
    </>
  )
}

export default App


