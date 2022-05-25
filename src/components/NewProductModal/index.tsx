import axios from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { showSimpleErrorAlert } from '../../helpers/showAlert'
import { showToast } from '../../helpers/showToast'
import styles from './styles.module.scss'

interface NewProductModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export function NewProductModal({ setModal }: NewProductModalProps) {
  const [file, setFile] = useState<File>()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [smallPrice, setSmallPrice] = useState(0)
  const [mediumPrice, setMediumPrice] = useState(0)
  const [largePrice, setLargePrice] = useState(0)
  const [extraOptions, setExtraOptions] = useState<{ text: string, price: number }[]>([])
  const [extraTxt, setExtraTxt] = useState('')
  const [extraPrice, setExtraPrice] = useState(0)
  const [onRequest, setOnRequest] = useState(false)

  function handleClickCloseModal(e) {
    if(e.target.classList[0] == 'styles_modal__3U3IH'){
      setModal(false)
    }
  }

  function handleAddExtras() {
    if (extraTxt !== '' && extraPrice !== 0) {
      setExtraOptions(prevState => [...prevState, { text: extraTxt, price: extraPrice }])
    }
  }

  function handleCreate() {
    setOnRequest(true)
    const requiredFields = [file, title, desc, smallPrice, mediumPrice, largePrice]
    for(let i of requiredFields) {
      if (!i) {
        showSimpleErrorAlert('Error', 'Required field is missing')
        setOnRequest(false)
        return;
      }
    }
    axios.post('/api/products', {
      title, desc, img: '/img/pizza.png', 
      prices: [smallPrice, mediumPrice, largePrice], 
      extraOptions 
    })
    .then(res => {
      setOnRequest(false)
      setModal(false)
      showToast('Product created', 'success')
    })
    .catch(err => {
      showToast(`Something went wrong ${err.message}`, 'error')
    })
  }

  return (
    <div onClick={handleClickCloseModal} className={styles.modal}>
      <div className={styles.container}>
        <h1>Create new pizza</h1>
        <div className={styles.input}>
          <label htmlFor="file">Choose an image</label>
          <input 
            onChange={(e) => setFile(e.target.files[0])} 
            type="file" name="file"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="title">Title</label>
          <input 
            onChange={(e) => setTitle(e.target.value)} 
            type="text" name="tiel"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="desc">Description</label>
          <textarea 
            onChange={(e) => setDesc(e.target.value)}
            name='desc'
            rows={5} cols={33}
          ></textarea>
        </div>
        <div className={styles.input}>
          <label htmlFor="prices">Prices</label>
          <div className={styles.priceInputs}>
            <input
              placeholder='Small'
              onChange={(e) => setSmallPrice(Number(e.target.value))}
              type="number" name="prices"
            />
            <input
              placeholder='Medium'
              onChange={(e) => setMediumPrice(Number(e.target.value))}
              type="number" name="prices"
            />
            <input
              placeholder='Large'
              onChange={(e) => setLargePrice(Number(e.target.value))}
              type="number" name="prices"
            />
          </div>
        </div>
        <div className={styles.input}>
          <label htmlFor="prices">Extras</label>
          <div className={styles.extraInputs}>
            <input
              onChange={(e) => setExtraTxt(e.target.value)}
              type="text" name="extras"
            />
            <input
              onChange={(e) => setExtraPrice(Number(e.target.value))}
              type="number" name="extras"
            />
            <button onClick={handleAddExtras}>Add extra</button>
          </div>
        </div>
        <div  className={styles.extras}>
          {extraOptions && extraOptions.map(item => (
            <span key={item.text}>{item.text}</span>
          ))}
        </div>
        <button 
          disabled={onRequest}
          onClick={handleCreate} 
          className={styles.createBtn}
        >Create</button>
      </div>
    </div>
  )
}