type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  ),
  // https://yesicon.app/search/arm
  arm: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="currentColor"
        d="M3 18.34S4 7.09 7 3l5 1l-1 3.09H9v7.16h1c2-3.07 6.14-4.19 8.64-3.07c3.3 1.53 3 6.14 0 8.18C16.24 21 9 22.43 3 18.34"
      />
    </svg>
  ),
  medal: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 36 36"
      {...props}>
      <path
        fill="#55ACEE"
        d="M25 0H11a2 2 0 0 0-2 2v11s0 1 1 2l6.429 5h3.142L26 15c1-1 1-2 1-2V2a2 2 0 0 0-2-2"
      />
      <path fill="#E1E8ED" d="M12 0v16.555L16.429 20h3.142L24 16.555V0z" />
      <path fill="#DD2E44" d="M14 0v18.111L16.429 20h3.142L22 18.111V0z" />
      <path
        fill="#FFAC33"
        d="M21.902 21.02A1.5 1.5 0 0 0 22 20.5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5c0 .183.038.357.098.52A7.993 7.993 0 0 0 10 28a8 8 0 1 0 16 0c0-3-1.654-5.611-4.098-6.98"
      />
      <circle cx="18" cy="28" r="6" fill="#FFD983" />
      <path
        fill="#FFAC33"
        d="M20.731 32.36a.58.58 0 0 1-.339-.109L18 30.535l-2.393 1.716a.58.58 0 0 1-.892-.647l.892-2.88l-2.371-1.671a.582.582 0 0 1 .341-1.049L16.514 26l.935-2.809a.58.58 0 0 1 1.102 0L19.47 26l2.952.004a.58.58 0 0 1 .341 1.049l-2.371 1.671l.892 2.88a.58.58 0 0 1-.553.756"
      />
    </svg>
  ),
};
