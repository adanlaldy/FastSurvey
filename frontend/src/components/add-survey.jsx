"use client"

import {Button} from "@/src/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"
import {Input} from "@/src/components/ui/input"
import {Label} from "@/src/components/ui/label"
import {CirclePlus, Trash} from "lucide-react"
import {SurveyType} from "@/src/components/survey-type";
import * as React from "react"

export function AddSurvey() {
    const [surveyType, setSurveyType] = React.useState("")
    const [answers, setAnswers] = React.useState([])

    const handleTypeChange = (value) => {
        setSurveyType(value)
    }

    const addAnswer = () => {
        setAnswers([...answers, ""])
    }

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers]
        newAnswers[index] = value
        setAnswers(newAnswers)
    }

    const removeAnswer = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index)
        setAnswers(newAnswers)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CirclePlus className={'size-24 hover:scale-110 duration-100'}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Add Survey</DialogTitle>
                    <DialogDescription>
                        Choose the type and create a new survey.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <SurveyType onChange={handleTypeChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" className="col-span-3" />
                    </div>

                    {surveyType === "unique" || surveyType === "multiple" ? (
                        <>
                            <div className="grid gap-4 py-4">
                                {answers.map((answer, index) => (
                                    <div key={index} className="grid grid-cols-4 items-center gap-3">
                                        <Label htmlFor={`answer-${index}`} className="text-right">
                                            Answer {index + 1}
                                        </Label>
                                        <Input
                                            id={`answer-${index}`}
                                            className="col-span-2"
                                            value={answer}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className={'flex mx-3'}
                                            onClick={() => removeAnswer(index)}
                                        >
                                            <Trash className="text-red-500"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* Button pour ajouter une nouvelle réponse */}
                            <div className="flex justify-end gap-4">
                                <Button type="button" onClick={addAnswer} variant="outline">
                                    <CirclePlus className="mr-2"/> Add Answer
                                </Button>
                            </div>
                        </>
                    ) : null}
                </div>

                <DialogFooter>
                    <Button type="submit">Create survey</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
