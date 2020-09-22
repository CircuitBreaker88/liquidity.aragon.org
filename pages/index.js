import React, { useEffect, useState } from 'react'
import { useViewport } from 'use-viewport'
import NavBar from 'components/NavBar/NavBar'
import logoAnt from 'components/Logo/logo-ant.svg'
import StakeModule from 'components/StakeModule/StakeModule'

export default () => {
  const { below } = useViewport()
  const [isCompact, setIsCompact] = useState(false)
  const smallLayout = below(415)
  useEffect(() => {
    setTimeout(() => {
      setIsCompact(smallLayout)
    }, 0)
  }, [smallLayout])

  return (
    <div
      css={`
        position: relative;
        min-height: 100vh;
        background: #f6f6fc;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <NavBar logoMode={'ant'} />
      <StakeModule />
      <div
        css={`
          position: absolute;
          bottom: 8px;
          left: 0;
          margin-top: 24px;
          width: 100%;
          align-self: flex-end;
          color: #8398ac;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px 0 16px;
          ${isCompact &&
            `
          position: relative;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          padding: 0;
          margin-bottom: 8px;

        `}
        `}
      >
        <ul
          css={`
            display: block;
            list-style-type: none;
            margin: 0;
            padding: 0;
            > li {
              display: inline;
              margin-left: 16px;
              > a {
                color: #8398ac;
              }
            }
            > li:first-child {
              margin-left: 0;
            }
          `}
        >
          <li>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://nova.org/"
            >
              About
            </a>
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://nova.org/token/ant"
            >
              NMT
            </a>
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://wiki.nova.org/"
            >
              Wiki
            </a>
          </li>
        </ul>
        <div
          css={`
            ${isCompact && 'margin-top: 8px;'}
          `}
        >
          Powered By <img src={logoAnt} alt="NMT Logo" width="30" />
        </div>
      </div>
    </div>
  )
}
