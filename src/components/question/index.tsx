import type { Question } from "@/types/survey";
import { useEffect, useState } from "react";

const ProgressTracker = ({ progress, timeLeft }: { progress: number, timeLeft: number }) => {

    const strokeDashoffset = 2 * Math.PI * 16 * (1 - progress / 100);

    return (
        <svg className="progress" viewBox="0 0 40 40" width="32" height="32"> {/* Ajusta el tamaño de la vista del SVG */}
            <circle
                stroke="white"
                fill="transparent"
                strokeWidth="4"
                cx="20"
                cy="20"
                r="16"
                style={{
                    strokeDashoffset: strokeDashoffset,
                    strokeDasharray: 2 * Math.PI * 16,
                    transition: 'stroke-dashoffset 0.35s',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                }}
            />
            <text x="20" y="20" textAnchor="middle" dy=".3em" fill="white">{timeLeft}</text>
        </svg>
    )
}

export default function Question({ question }: { question: Question }) {
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(question.lifetimeSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 0;
                }

                return prev + 100 / question.lifetimeSeconds;
            })

            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }

                return prev - 1;
            })
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [question.lifetimeSeconds]);

    return (
        <div className="flex flex-col gap-4 w-full bg-[#525252] rounded-xl p-4">
            <div className="flex flex-row justify-between items-center w-full">
                <h1>{question.text}</h1>
                <ProgressTracker
                    progress={progress}
                    timeLeft={timeLeft}
                />
            </div>
        </div>
    )
}