import { useEffect, useRef, useState } from "react";

interface TrackerProps {
    time: number;
    size?: number;
    stroke?: number;
}

export const Tracker = ({ time, size = 32, stroke = 4 }: TrackerProps) => {

    const [timeLeft, setTimeLeft] = useState(time);
    const [progress, setProgress] = useState(0);

    const radius = size / 2 - stroke;
    const strokeDashoffset = 2 * Math.PI * radius * (1 - progress / 100);

    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        setTimeLeft(time);
        setProgress(0);

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
            setProgress((prev) => prev + 100 / time);
        }, 1000);

        timerRef.current = interval;

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [time]);

    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(timerRef.current);
        }
    }, [timeLeft]);

    return (
        <svg className="progress" viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
            <circle
                stroke="white"
                fill="transparent"
                strokeWidth={stroke}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                style={{
                    strokeDashoffset: strokeDashoffset,
                    strokeDasharray: 2 * Math.PI * radius,
                    transition: 'stroke-dashoffset 0.35s',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                }}
            />
            <text x={size / 2} y={size / 2} textAnchor="middle" dy=".3em" fill="white">{timeLeft}</text>
        </svg>
    )
}
