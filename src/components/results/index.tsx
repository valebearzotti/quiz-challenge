import { useSurvey } from "@/context/surveyContex";

export const Results = () => {

    const { answers } = useSurvey();

    return (
        <div className="flex flex-col rounded-lg border border-neutral-600 border-opacity-50 bg-gradient-to-bl from-black via-neutral-900 to-neutral-900 p-4 gap-6">
            <div className="flex flex-col gap-4">
                {answers.map((answer, index) => (
                    <div key={index} className="flex flex-col w-full">
                        <h2 className="text-lg font-bold">{answer.question}</h2>
                        <h4 className="text-base italic">{answer.answer}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}