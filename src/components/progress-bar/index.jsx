import React from 'react'
import clsx from 'clsx'

import styles from './index.module.css'

const ProgressBar = ({ progress, customStyle = '' }) => {
  return (
    <div className={clsx(styles['progress-bar-container'], customStyle)}>
      <div className={styles['progress-bar']} style={{ width: `${progress}%` }}></div>
    </div>
  )
}

export default ProgressBar
