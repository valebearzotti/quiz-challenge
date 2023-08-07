import survey_data from "@/data/sample.json";
import { Question, Survey } from "@/types/survey";
import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface Answer {
    question: string | undefined;
    answer: string;
    index: number;
}

interface SurveyContextProps {
    survey: Survey;
    questions: Question[];
    answers: Answer[];
    currentQuestionIndex: number;
    currentQuestionTime: number;
    answersIds: number[];
    handleAnswer: (text: string, index: number) => void;
    handleTimer: () => void;
    setCurrentQuestionIndex: (index: number) => void;
    setAnswersIds: (ids: number[]) => void;
    reset: () => void;
}

const SurveyContext = createContext<SurveyContextProps>({} as SurveyContextProps);

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestionTime, setCurrentQuestionTime] = useState<number>(survey_data.questions[0]!.lifetimeSeconds)
    const [answers, setAnswers] = useState<Answer[]>([])
    const [answersIds, setAnswersIds] = useState<number[]>([])
    const questions = survey_data.questions;
    const timerRef = useRef<NodeJS.Timeout>();

    const handleAnswer = (text: string, index: number) => {
        setAnswers((prev) => [...prev,
        {
            question: questions[currentQuestionIndex]?.text,
            answer: text,
            index: index
        }]);
        setAnswersIds((prev) => [...prev, index]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setCurrentQuestionTime(questions[currentQuestionIndex + 1]!.lifetimeSeconds);
        } else if (currentQuestionIndex === questions.length - 1) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    }

    const handleTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (currentQuestionIndex < questions.length - 1) {
            timerRef.current = setTimeout(() => {
                handleAnswer('No answer', 0);
            }, currentQuestionTime * 1000);
        } else if (currentQuestionIndex === questions.length - 1) {
            timerRef.current = setTimeout(() => {
                handleAnswer('No answer', 0);
            }, currentQuestionTime * 1000);
        }
    }

    const reset = () => {
        setCurrentQuestionIndex(0);
        setCurrentQuestionTime(questions[0]!.lifetimeSeconds);
        setAnswers([]);
        setAnswersIds([]);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }

    useEffect(() => {
        if (currentQuestionIndex < questions.length && currentQuestionIndex >= 0) {
            setCurrentQuestionTime(questions[currentQuestionIndex]!.lifetimeSeconds);
            handleTimer();
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [currentQuestionIndex]);

    return (
        <SurveyContext.Provider value={{
            survey: survey_data,
            questions,
            answers,
            currentQuestionIndex,
            currentQuestionTime,
            answersIds,
            handleAnswer,
            handleTimer,
            setCurrentQuestionIndex,
            setAnswersIds,
            reset
        }}>
            {children}
        </SurveyContext.Provider>
    )

}

export const useSurvey = () => {
    const context = useContext(SurveyContext);
    if (context === undefined) {
        // This just helps debugging in case there's no SurveyProvider wrapping the app components (-> prevent TS errors)
        throw new Error('Context is undefined: useSurvey must be used within a SurveyProvider.');
    }
    return context;
}