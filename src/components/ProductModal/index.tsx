import axios from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { showSimpleErrorAlert } from '../../helpers/showAlert'
import { showToast } from '../../helpers/showToast'
import { ProductInterface } from '../../interfaces/ProductInterface'
import styles from './styles.module.scss'

interface ProductModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  product?: ProductInterface;
}

export function ProductModal({ setModal, product }: ProductModalProps) {
  const [file, setFile] = useState<File | string>(product?.img || undefined)
  const [title, setTitle] = useState(product?.title || '')
  const [desc, setDesc] = useState(product?.desc || '')
  const [smallPrice, setSmallPrice] = useState(product?.prices[0] || 0)
  const [mediumPrice, setMediumPrice] = useState(product?.prices[1] || 0)
  const [largePrice, setLargePrice] = useState(product?.prices[2] || 0)
  const [extraOptions, setExtraOptions] = useState<{ text: string, price: number }[]>(product?.extraOptions || [])
  const [extraTxt, setExtraTxt] = useState('')
  const [extraPrice, setExtraPrice] = useState(0)
  const [onRequest, setOnRequest] = useState(false)

  function handleClickCloseModal(e) {
    if(e.target.classList[0] == 'styles_modal__5iPqE'){
      setModal(false)
    }
  }

  function handleAddExtras() {
    if (extraTxt !== '' && extraPrice !== 0) {
      setExtraOptions(prevState => [...prevState, { text: extraTxt, price: extraPrice }])
    }
  }

  function handleDeleteExtra(text: string) {
    setExtraOptions(prevState => prevState.filter(i => i.text !== text))
  }

  async function handleCreateUpdate() {
    setOnRequest(true)
    const requiredFields = [file, title, desc, smallPrice, mediumPrice, largePrice]
    for(let i of requiredFields) {
      if (!i) {
        showSimpleErrorAlert('Error', 'Required field is missing')
        setOnRequest(false)
        return;
      }
    }
    try {
      let tmpImg;

      if (file !== undefined && typeof file !== 'string') {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('upload_preset', 'pizzas')
        const cloudnary = await axios.post('https://api.cloudinary.com/v1_1/djcswbnye/image/upload', fd)
        const { url } = cloudnary.data
        tmpImg = url;
      } else {
        tmpImg = file
      }

      axios.post('/api/products', {
        id: product?._id || null,
        title, desc, img: tmpImg, 
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
    } catch(err) {
      showToast(`Something went wrong ${err.message}`, 'error')
    }
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
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            type="text" name="tiel"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="desc">Description</label>
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            name='desc'
            rows={5} cols={33}
          ></textarea>
        </div>
        <div className={styles.input}>
          <label htmlFor="prices">Prices</label>
          <div className={styles.priceInputs}>
            <input
              value={smallPrice}
              placeholder='Small'
              onChange={(e) => setSmallPrice(Number(e.target.value))}
              type="number" name="prices"
            />
            <input
              value={mediumPrice}
              placeholder='Medium'
              onChange={(e) => setMediumPrice(Number(e.target.value))}
              type="number" name="prices"
            />
            <input
              value={largePrice}
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
            <span key={item.text}>
              {item.text}
              <span onClick={() => handleDeleteExtra(item.text)}>X</span>
            </span>
          ))}
        </div>
        <button 
          disabled={onRequest}
          onClick={handleCreateUpdate} 
          className={styles.createBtn}
        >Create/Update</button>
      </div>
    </div>
  )
}