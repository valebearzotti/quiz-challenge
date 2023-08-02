// IRL you'd probably want to use a DB to store all surveys, so this endpoint is used to simulate fetching the survey data instead of just importing the JSON file in the frontend.
// I also added an ID field to the survey's sample data (and made it an array), so this endpoint can be used to fetch any survey that exists.

import survey_data from "@/data/sample.json";
import type { Survey } from '@/types/survey';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (id) {
        const survey = survey_data.find((survey: Survey) => survey.id === id);

        if (!survey) {
            return res.status(404).json({ message: "Survey not found" });
        }

        return res.status(200).json(survey);
    }

    return null;
}