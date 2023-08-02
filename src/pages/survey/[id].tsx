import Question from "@/components/question";
import { Survey } from "@/types/survey";
import type { GetServerSideProps } from "next";

export default function SurveyPageId({ survey }: { survey: Survey }) {
    return (
        <div>
            <h1>{survey.title}</h1>
            {typeof survey.questions[0] !== "undefined" &&
                <Question key={survey.questions[0].text} question={survey.questions[0]} />
            }
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (params) => {
    const { id } = params.query;

    const response = await fetch(`http://localhost:3000/api/survey/${id}`)
    const responseData = await response.json();

    return {
        props: {
            survey: responseData
        }
    };
}