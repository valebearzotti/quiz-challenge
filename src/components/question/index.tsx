import { Button } from "@/components/button";
import { Tracker } from "@/components/tracker";
import { useSurvey } from "@/context/surveyContex";

export default function Question() {

    const { questions, currentQuestionIndex, handleAnswer } = useSurvey();

    return (
        <div className="flex flex-col rounded-lg border border-neutral-600 border-opacity-50 bg-gradient-to-bl from-black via-neutral-900 to-neutral-900 p-4 gap-6">
            <div className="flex flex-row justify-between items-center w-full">
                <h1>{questions[currentQuestionIndex]?.text}</h1>
                <Tracker
                    time={questions[currentQuestionIndex]!.lifetimeSeconds}
                    key={questions[currentQuestionIndex]!.text}
                />
            </div>
            <img src={questions[currentQuestionIndex]?.image} className="object-cover rounded-lg w-full h-[200px]" alt="Question image" />
            <div className="flex flex-col gap-4">
                {questions[currentQuestionIndex]?.options.map((option, index) => (
                    <Button
                        key={option.text}
                        onClick={() => {
                            handleAnswer(option.text, index)
                        }}
                    >
                        <p>{option.text}</p>
                    </Button>
                ))}
            </div>
        </div>
    )
}