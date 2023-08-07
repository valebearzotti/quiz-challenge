import { Button } from "@/components/button";
import Question from "@/components/question";
import { Results } from "@/components/results";
//import Question from "@/components/question";
import { useSurvey } from "@/context/surveyContex";
import { useContract } from "@/hooks/useContract";
import { useEffect } from "react";

const Arrow = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.16699 10L15.8337 10M4.16699 10L9.16699 5M4.16699 10L9.16699 15" stroke="#7375D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

interface Answer {
    question: string | undefined;
    answer: string;
    index: number;
}

export default function SurveyPageId() {

    const { submit } = useContract();

    const { survey, questions, answers, currentQuestionIndex, answersIds, reset } = useSurvey();

    useEffect(() => {
        // Just in case reset the survey on page load
        reset();
    }, [])

    return (
        <div className="flex flex-col gap-2 max-w-[500px] w-full">
            <div className="flex flex-row gap-4">
                <Button intent="tertiary" onClick={() => window.history.back()}>
                    <Arrow />
                    Go back
                </Button>
            </div>
            <h1 className="text-2xl font-bold py-1">{survey.title}</h1>
            <div className="flex flex-col gap-4">
                {currentQuestionIndex < questions.length && (
                    <Question />
                )}
            </div>
            {currentQuestionIndex >= questions.length && (
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold">
                        Thank you for completing the survey!
                    </h2>
                    <Results />
                    <Button intent="primary" onClick={() => {
                        void submit(1, answersIds);
                    }}>
                        Submit
                    </Button>
                    <Button intent="secondary" onClick={() => {
                        reset();
                    }}>
                        Restart
                    </Button>
                </div>
            )}
        </div>
    )
}