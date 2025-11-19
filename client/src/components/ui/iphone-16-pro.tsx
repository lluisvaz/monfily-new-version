import { SVGProps, forwardRef, CSSProperties } from "react";

export interface Iphone16ProProps extends SVGProps<SVGSVGElement> {
    /** Frame width */
    width?: number;
    /** Frame height */
    height?: number;
    /** Image source for screen */
    src?: string;
    /** Video source for screen */
    videoSrc?: string;
    /** Show dynamic island */
    showIsland?: boolean;
    /** Island width */
    islandWidth?: number;
    /** Island height */
    islandHeight?: number;
    /** Frame color (light mode) */
    frameColor?: string;
    /** Frame color (dark mode) */
    frameDarkColor?: string;
    /** Bezel color */
    bezelColor?: string;
    /** Screen border radius */
    screenRadius?: number;
    /** Shadow toggle */
    shadow?: boolean;
    /** Rounded corners toggle */
    rounded?: boolean;
    /** Class for inner content (video/image) */
    contentClassName?: string;
    /** Custom styles for video/image */
    contentStyle?: CSSProperties;
    /** Toggle camera dot */
    showCamera?: boolean;
    /** Background gradient for screen */
    screenGradient?: string;
    /** Enable animation on hover */
    hoverAnimation?: boolean;
}

export const Iphone16Pro = forwardRef<SVGSVGElement, Iphone16ProProps>(
    (
        {
            width = 433,
            height = 882,
            src,
            videoSrc,
            showIsland = true,
            islandWidth = 125,
            islandHeight = 40,
            frameColor = "white",
            frameDarkColor = "black",
            bezelColor = "neutral-100",
            screenRadius = 55,
            shadow = true,
            rounded = true,
            contentClassName,
            contentStyle,
            showCamera = true,
            screenGradient,
            hoverAnimation = true,
            ...props
        }: Iphone16ProProps,
        ref
    ) => {
        return (
            <svg
                ref={ref}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`
          ${shadow ? "drop-shadow-2xl" : ""}
          ${hoverAnimation ? "transition-transform duration-500 hover:scale-[1.02]" : ""}
        `}
                {...props}
            >
                {/* Outer frame */}
                <rect
                    x="1"
                    y="1"
                    width={width - 2}
                    height={height - 2}
                    rx={rounded ? 45 : 0}
                    fill={frameColor}
                    stroke="rgb(229, 231, 235)"
                    strokeWidth="0.5"
                />

                {/* Inner bezel */}
                <rect
                    x="12"
                    y="12"
                    width={width - 24}
                    height={height - 24}
                    rx={rounded ? 45 : 0}
                    fill="rgb(245, 245, 245)"
                    stroke="rgba(212, 212, 212, 0.4)"
                    strokeWidth="0.5"
                />

                {/* Screen area */}
                <clipPath id="screen">
                    <rect
                        x="13"
                        y="13"
                        width={width - 26}
                        height={height - 26}
                        rx={screenRadius}
                        ry={screenRadius}
                    />
                </clipPath>

                {screenGradient && (
                    <rect
                        x="13"
                        y="13"
                        width={width - 26}
                        height={height - 26}
                        rx={screenRadius}
                        ry={screenRadius}
                        fill={`url(#gradient)`}
                        clipPath="url(#screen)"
                    />
                )}

                {src && (
                    <image
                        href={src}
                        x="13"
                        y="13"
                        width={width - 26}
                        height={height - 26}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#screen)"
                        className={contentClassName}
                        style={contentStyle}
                    />
                )}

                {videoSrc && (
                    <foreignObject
                        x="13"
                        y="13"
                        width={width - 26}
                        height={height - 26}
                        clipPath="url(#screen)"
                    >
                        <video
                            className={`w-full h-full object-cover ${contentClassName}`}
                            style={{ borderRadius: `${screenRadius}px`, ...contentStyle }}
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </foreignObject>
                )}

                {/* Dynamic island */}
                {showIsland && (
                    <rect
                        x={width / 2 - islandWidth / 2}
                        y="20"
                        width={islandWidth}
                        height={islandHeight}
                        rx={20}
                        fill="rgb(229, 231, 235)"
                    />
                )}

                {/* Camera dot */}
                {showCamera && (
                    <circle
                        cx={width / 2 + islandWidth / 4}
                        cy="40"
                        r="6"
                        fill="rgb(156, 163, 175)"
                    />
                )}

                {/* Optional gradient definition */}
                {screenGradient && (
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={screenGradient.split(",")[0]} />
                            <stop offset="100%" stopColor={screenGradient.split(",")[1] || screenGradient.split(",")[0]} />
                        </linearGradient>
                    </defs>
                )}
            </svg>
        );
    }
);

Iphone16Pro.displayName = "Iphone16Pro";

