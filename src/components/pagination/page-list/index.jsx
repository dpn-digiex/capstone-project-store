'use client'
import React, { useMemo } from 'react'
import { MdArrowForwardIos, MdKeyboardDoubleArrowRight, MdOutlineArrowBackIos } from 'react-icons/md'
import clsx from 'clsx'

import styles from '../index.module.css'

const PageListComponent = ({ totalRecord, pageSize, currentPage, onSelect, onChange, displayCount = 3, step = 4 }) => {
  // [STATES]
  const numberOfPage = useMemo(() => {
    return Math.ceil(totalRecord / pageSize)
  }, [totalRecord, pageSize])
  const pageList = useMemo(() => {
    if (numberOfPage < 1) return [1]
    return [...Array(numberOfPage).keys()].map((i) => i + 1)
  }, [numberOfPage])

  // [RENDERS]
  return (
    <div className={styles['page-list']}>
      <div className={styles['page-arrow']} onClick={onChange?.(-1)}>
        <MdOutlineArrowBackIos size={16} stroke='white' />
      </div>
      {pageList.slice(0, displayCount).map((page) => (
        <div
          key={page}
          role='button'
          className={clsx(styles['page-item'], {
            [styles['page-active']]: page === currentPage,
            'pointer-events-none': page === currentPage
          })}
          onClick={() => onSelect?.(page)}
        >
          {page}
        </div>
      ))}
      {numberOfPage <= displayCount + 1 ? null : (
        <div
          role='button'
          className={styles['page-item']}
          onClick={onChange?.(step * -1)}
          title={`Go to previous ${step} page`}
        >
          &#x2022;&#x2022;&#x2022;
        </div>
      )}
      {currentPage > displayCount && currentPage < numberOfPage ? (
        <div role='button' className={clsx(styles['page-item'], styles['page-active'])}>
          {currentPage}
        </div>
      ) : null}
      {numberOfPage <= displayCount + 1 ? null : (
        <div role='button' className={styles['page-item']} onClick={onChange?.(step)} title={`Go to next ${step} page`}>
          <MdKeyboardDoubleArrowRight size={16} stroke='white' />
        </div>
      )}
      {numberOfPage < displayCount + 1 ? null : (
        <div
          role='button'
          className={clsx(styles['page-item'], {
            [styles['page-active']]: numberOfPage === currentPage,
            'pointer-events-none': numberOfPage === currentPage
          })}
          onClick={() => onSelect?.(numberOfPage)}
        >
          {numberOfPage}
        </div>
      )}
      <div className={styles['page-arrow']} onClick={onChange?.(1)}>
        <MdArrowForwardIos size={16} stroke='white' />
      </div>
    </div>
  )
}

export default PageListComponent
