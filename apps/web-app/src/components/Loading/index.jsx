import * as React from 'react'

const loaderSize = {
  xs: 'w-4 h-4',
  sm: 'w-8 h-8',
  med: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
}

// TODO Review with design
const colorVariant = {
  primary: 'text-brand-beige fill-brand-yellow',
  secondary: 'text-brand-beige fill-brand-blue',
  teritary: 'text-brand-blue fill-brand-yellow',
  quaternary: 'text-brand-blue fill-brand-beige'
}

const Loading = ({ size = 'med', variant = 'primary', ...rest }) => (
  <div>
    <svg
      className={`inline animate-spin ${colorVariant[variant]} ${loaderSize[size]}`}
      viewBox="0 0 100 101"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919z"
        fill="currentColor"
      />
      <path
        d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0041.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0144.131 25.769c.902 2.34 3.361 3.802 5.787 3.165z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
)

export default Loading
