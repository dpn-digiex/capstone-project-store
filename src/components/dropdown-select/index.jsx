'use client'
import React, { useState } from 'react'
import clsx from 'clsx'

import styles from './index.module.css'

const DropdownSelect = ({ options, selectedOption, onSelect }) => {
  const [selected, setSelected] = useState(options[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.label} onClick={() => setIsOpen(!isOpen)}>
        <p className='font-[500] mr-1'>Xếp theo:</p>
        {selected}
        <span className={clsx(styles.arrow, { [styles.arrowOpen]: isOpen })}>▼</span>
      </div>

      <div className={clsx(styles.dropdown, { [styles.optionsOpen]: isOpen })}>
        {options.map((option, index) => (
          <div
            key={index}
            className={clsx(styles.option, {
              [styles.optionSelected]: option === selected
            })}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownSelect
