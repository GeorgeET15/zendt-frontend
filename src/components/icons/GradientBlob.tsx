import React from "react";

export default function GradientBlob(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="379"
      height="278"
      viewBox="0 0 379 278"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="1.0" filter="url(#filter0_f_185_255)">
        <path
          d="M251.377 126.5C175.549 191.125 -23.4354 254.634 -88.0339 178.836C-152.632 103.039 -58.3827 -83.3622 17.4454 -147.987C93.2734 -212.611 207.112 -203.554 271.71 -127.757C336.309 -51.9591 327.205 61.8754 251.377 126.5Z"
          fill="url(#paint0_radial_185_255)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_185_255"
          x="-173.311"
          y="-254.853"
          width="551.843"
          height="531.944"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="31.8755"
            result="effect1_foregroundBlur_185_255"
          />
        </filter>
        <radialGradient
          id="paint0_radial_185_255"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(91.8381 25.5398) rotate(139.561) scale(236.334 180.324)"
        >
          <stop stopColor="#FFAD7A" />
          <stop offset="0.580821" stopColor="#5D689D" />
          <stop offset="1" stopColor="#142337" />
        </radialGradient>
      </defs>
    </svg>
  );
}
