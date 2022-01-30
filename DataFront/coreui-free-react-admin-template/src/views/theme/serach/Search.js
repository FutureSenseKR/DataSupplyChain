import React, { useState } from 'react'
import axios from 'axios'

const Search = () => {
  const [data, setData] = useState()
  const [filename, setFileName] = useState()

  const click = async () => {
    const state = await axios.get('http://localhost:5000/read/' + filename)
    setData(state.data)
    console.log(state.data)
  }

  return (
    <>
      <input type="search" placeholder="FileName" onChange={(e) => setFileName(e.target.value)} />
      <button onClick={click}>Search</button>
      <div>
        {data && (
          <>
            <div>File Name : {data.fileName}</div>
            <div>Current Content Hash : {data.content}</div>
            <table>
              <thead>
                <tr>
                  <th className="id">ID</th>
                  <th>Event</th>
                  <th>Content Hash</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {data.stateList.map((state, i) => {
                  return (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{state.event}</td>
                      <td>{state.hash}</td>
                      <td>{state.time}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  )
}

export default Search
