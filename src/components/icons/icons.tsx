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
  Google: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 262"
      {...props}>
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
    </svg>
  ),
};
