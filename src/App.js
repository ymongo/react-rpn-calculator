import './App.css';
import React from 'react';

function App() {
  const [value, setValue] = React.useState();
  const [result, setResult] = React.useState();


  async function handleCalcClick() {
    const payload = value?.split(' ');
    try {
      const response = await fetch('http://localhost:5005/calculate', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ 'input': payload })
      })
      const data = await response.json()

      if (!response.ok) {
        const errordata = data?.detail[0]['msg']
        throw new Error(`${response.status} ${response.statusText} \n ${errordata}`);
      }

      setResult(data.output)
    }
    catch (err) {
      alert(err.message)
    }
  }
  function handleClearClick() {
    setValue("")
    setResult(undefined)
  }

  return (
    <div className='py-24 px-4 bg-red-100 min-h-screen'>
      <div className='max-w-md  mx-auto flex flex-col rounded-lg bg-red-200 shadow-lg p-4'>
        <h1 className='h1 mx-auto font-bold my-6 text-3xl text-slate-600'>Calculate RPN operations</h1>
        <label htmlFor='input' className='mb-1 text-slate-600'>Enter space-separated operands and operators:</label>
        <input value={value} onChange={e => setValue(e.target.value)} type='text' name='input' id='input' className='block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder='Example: 3 2 +' />
        <span className='font-bold mt-4 text-slate-600'>Result : {result}</span>
        <div className='mt-4 flex flex-row-reverse space-x-2 space-x-reverse'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleCalcClick}>Calculate!</button>
          <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded' onClick={handleClearClick}>Clear</button>
        </div>
      </div>
      <div className='flex flex-row'>
        <a href='http://localhost:5005/operations' className=' text-sm text-slate-500 font-bold mt-8 mx-auto' >Get All Operations</a>

      </div>
    </div>
  );
}

export default App;
