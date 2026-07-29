import { SVGProps, forwardRef, CSSProperties, ReactNode, useId } from "react";

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
    /** React content to render inside screen */
    children?: ReactNode;
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
            bezelColor = "#101013",
            screenRadius = 55,
            shadow = true,
            rounded = true,
            contentClassName,
            contentStyle,
            showCamera = true,
            screenGradient,
            hoverAnimation = true,
            children,
            ...props
        }: Iphone16ProProps,
        ref
    ) => {
        const screenClipId = useId().replace(/:/g, "");
        const gradientId = `${screenClipId}-gradient`;
        const screenInset = 5;
        const screenSizeOffset = screenInset * 2;
        const innerRadius = Math.max(screenRadius - screenInset, 0);

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
                    x="0.5"
                    y="0.5"
                    width={width - 1}
                    height={height - 1}
                    rx={rounded ? screenRadius : 0}
                    fill={frameColor}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1"
                />

                {/* Screen area */}
                <clipPath id={screenClipId}>
                    <rect
                        x={screenInset}
                        y={screenInset}
                        width={width - screenSizeOffset}
                        height={height - screenSizeOffset}
                        rx={innerRadius}
                        ry={innerRadius}
                    />
                </clipPath>

                <rect
                    x={screenInset}
                    y={screenInset}
                    width={width - screenSizeOffset}
                    height={height - screenSizeOffset}
                    rx={innerRadius}
                    fill={bezelColor}
                />

                {screenGradient && (
                    <rect
                        x={screenInset}
                        y={screenInset}
                        width={width - screenSizeOffset}
                        height={height - screenSizeOffset}
                        rx={innerRadius}
                        ry={innerRadius}
                        fill={`url(#${gradientId})`}
                        clipPath={`url(#${screenClipId})`}
                    />
                )}

                {src && (
                    <image
                        href={src}
                        x={screenInset}
                        y={screenInset}
                        width={width - screenSizeOffset}
                        height={height - screenSizeOffset}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`url(#${screenClipId})`}
                        className={contentClassName}
                        style={contentStyle}
                    />
                )}

                {videoSrc && (
                    <foreignObject
                        x={screenInset}
                        y={screenInset}
                        width={width - screenSizeOffset}
                        height={height - screenSizeOffset}
                        clipPath={`url(#${screenClipId})`}
                    >
                        <video
                            className={`w-full h-full object-cover ${contentClassName}`}
                            style={{ borderRadius: `${innerRadius}px`, ...contentStyle }}
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </foreignObject>
                )}

                {children && !src && !videoSrc && (
                    <foreignObject
                        x={screenInset}
                        y={screenInset}
                        width={width - screenSizeOffset}
                        height={height - screenSizeOffset}
                        clipPath={`url(#${screenClipId})`}
                    >
                        <div 
                            className={`w-full h-full overflow-hidden ${contentClassName}`}
                            style={{ borderRadius: `${innerRadius}px`, ...contentStyle }}
                        >
                            {children}
                        </div>
                    </foreignObject>
                )}

                {/* Dynamic island */}
                {showIsland && (
                    <rect
                        x={width / 2 - islandWidth / 2}
                        y="8"
                        width={islandWidth}
                        height={islandHeight}
                        rx={5}
                        fill="#050506"
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
                        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
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

