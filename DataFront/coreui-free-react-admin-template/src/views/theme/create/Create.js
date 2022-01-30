import React, { useState } from 'react'
import crypto from 'crypto'
import axios from 'axios'
import { CSVLink } from 'react-csv'

const Create = () => {
  const [hash, setHash] = useState()
  const [array, setArray] = useState()
  const [fileName, setFileName] = useState()
  const [data, setData] = useState('')

  const deDuplicate = async () => {
    const uniqueData = []
    array.forEach((data) => {
      if (!uniqueData.includes(data)) {
        uniqueData.push(data)
      }
    })

    setArray(uniqueData)
    const _hash = crypto.createHash('sha256').update(uniqueData.toString()).digest('hex')
    setData(uniqueData.toString())
    console.log(uniqueData)

    const response = await axios.post('http://localhost:5000/add', {
      fileName,
      content: _hash,
      event: 'deduplicate',
    })

    console.log(response)
  }

  const onChange = (e) => {
    let file = e.target.files[0]
    let fileReader = new FileReader()

    fileReader.onload = () => {
      const data = fileReader.result
      const _array = data.split('\r')
      const _hash = crypto.createHash('sha256').update(data).digest('hex')
      setHash(_hash)
      setArray(_array)
      setFileName(file.name)
    }

    fileReader.readAsText(file)
  }

  return (
    <>
      <input type="file" onChange={onChange} />
      {array && (
        <>
          <div>
            <button onClick={deDuplicate}>Deduplicate</button>
            <CSVLink data={data} filename={fileName}>
              <button>Download</button>
            </CSVLink>
          </div>
          <div>{hash}</div>
          <div>
            {array.map((data, i) => {
              return <li key={i}>{data}</li>
            })}
          </div>
        </>
      )}
    </>
  )
}

export default Create
