const CheckmarkIcon = ( {size,color} ) => {
    return (
        <svg  width={size} height={size} viewBox="19 24 236 208" version="1.1">
            <path d="M 239.500 25.393 C 234.656 27.515, 198.330 60.505, 173.955 84.919 C 143.827 115.094, 116.232 147.294, 96.784 174.964 C 93.328 179.882, 90.193 183.814, 89.817 183.703 C 89.031 183.469, 78.537 166.239, 61.680 137.500 C 55.227 126.500, 49.397 116.804, 48.724 115.954 C 43.996 109.984, 36.262 109.346, 28.107 114.254 C 16.512 121.232, 15.754 126.692, 24.305 141.642 C 47.019 181.359, 74.921 227.650, 77.123 229.270 C 82.389 233.146, 92.615 233.093, 98 229.162 C 99.375 228.158, 106.263 219.274, 113.306 209.419 C 158.288 146.478, 190.743 106.082, 243.358 47.548 C 250.493 39.610, 255 33.774, 255 32.472 C 255 29.967, 251.640 26.565, 247.685 25.067 C 244.151 23.728, 243.215 23.765, 239.500 25.393" stroke="none" fill={color} fillRule="evenodd"></path>
        </svg> 
    )
}

export default CheckmarkIcon