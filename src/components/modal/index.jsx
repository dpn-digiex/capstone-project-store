'use client'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoClose } from 'react-icons/io5'
import clsx from 'clsx'

import styles from './index.module.css'

const Modal = ({ isOpen, onCloseModal, customStyle, children }) => {
  const [className, setClassName] = useState(null)

  const onClose = () => {
    setClassName(styles['close'])
    onCloseModal()
  }

  useEffect(() => {
    setClassName(styles['open'])
  }, [])

  return isOpen
    ? createPortal(
        <div id='modal-backdrop' className={clsx(className, styles['modal-backdrop'])} onClick={onClose}>
          <div
            id='modal-content'
            className={clsx(className, styles['modal-content'], customStyle)}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
            <div className={styles['close-icon']} onClick={onClose}>
              <IoClose fill='#3e3e3e' size={20} />
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}

export default Modal
