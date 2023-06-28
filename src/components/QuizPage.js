import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import TimerElement from './TimerElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";
import userService from '../service/UserService';
import AceEditor from "react-ace";
import axios from 'axios'
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

const QuizPage = () => {

    const [cookies] = useCookies(['cookie-name']);





    let currentTime = (new Date()).getTime();
    let nextTime = currentTime + 1000 * 60 * 60

    const navigate = useNavigate();

    const [quiz, setQuiz] = useState({
        quizTitle: "",
        quizCode: "",
        usersEmails: [],
        problems: []
    });


    const [solutionCode, setSolutionCode] = useState("public class Main {\n" +
        "\tpublic static void main( String args[]) {\n" +
        "\t\tSystem.out.print(\"Hello world\");\n\t}\n" +
        "}\n");

    function onChange(newValue, e) {
        console.log(JSON.stringify(solutionCode))
        setSolutionCode(newValue)
    }

    const [testOutputs, setTestOutputs] = useState("")


    const [loading, setLoading] = useState(false);
    const [minutesLeft, setMinutesLeft] = useState();
    const [validSubmission, setValidSubmission] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState();
    const [timeLeft, setTimeLeft] = useState(nextTime - currentTime);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                let email = jwtDecode(cookies.jwt).sub
                await userService.isUserActive(email, cookies.jwt).then((response) => {
                    console.log(response.data)
                    if (response.data === false) {
                        navigate('/quiz/fallback')
                    }


                }).catch((error) => {
                    console.log(error)
                })
                const code = (await userService.getQuizCodeFromUser(email, cookies.jwt)).data
                await userService.getQuizByCode(code, cookies.jwt).then((response) => {
                    quiz.quizTitle = response.data.quizTitle
                    quiz.quizCode = response.data.quizCode
                    quiz.usersEmails = response.data.usersEmails
                    quiz.problems = response.data.problems
                    console.log(quiz)
                }).catch((error) => {
                    console.log(error)
                })

            } catch (err) {
                console.log(err)
            }
        };
        setLoading(false)
        fetchData();
    }, [cookies.jwt, loading, navigate, quiz])


    useEffect(() => {

        const intervalId = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1000)
                setMinutesLeft(Math.floor(timeLeft / 60000))
                setSecondsLeft(((timeLeft % 60000) / 1000).toFixed(0))
            } else {
                setValidSubmission(false)
            }

        }, 1000);
        // console.log("test")
        return () => clearInterval(intervalId);

    }, [timeLeft, validSubmission, testOutputs])



    const runCode = async (code, e) => {
        e.preventDefault()
        console.log(code)
        console.log(quiz.quizCode)
        const quizProblem = (await userService.getQuizProblem(quiz.quizCode, code, cookies.jwt)).data
        console.log(quizProblem.testCode)
        console.log(quizProblem.inputs)



        let submissions = []
        let tokens = []
        let codeOutputs = []
        let codeInputString = ""
        let tokenString = ""
        let data = {
            submissions: submissions
        }

        for (let i = 0; i < quizProblem.inputs.length; i++) {
            let submissionData = {
                source_code: solutionCode,
                "language_id": 91,
                "stdin": quizProblem.inputs[i]
            }
            submissions.push(submissionData)
        }

        await axios.post("https://judge0-ce.p.rapidapi.com/submissions/batch", data, {
            headers: {
                'X-RapidAPI-Key': '427d6c1267mshae7fe963ae0886cp106d18jsn5992b865ed82',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'content-type': 'application/json'
            },
        }).then((response) => {
            response.data.map((submission) => {
                tokens.push(submission.token)
                return tokens
            })
            tokenString = tokens.join(",")

        }).catch((error) => {
            console.log(error)
        })


        setTimeout(async () => {
            await axios.get("https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=" + tokenString, {
                headers: {
                    'X-RapidAPI-Key': '427d6c1267mshae7fe963ae0886cp106d18jsn5992b865ed82',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'content-type': 'application/json'
                },
            }).then((response) => {
                console.log(response)
                response.data.submissions.map((submission) => {
                    codeOutputs.push(submission.stdout)
                    return codeOutputs
                })
                // console.log(codeOutputs)
            }).catch((error) => {
                console.log(error)
            })

        }, 5000)

        setTimeout(async () => {
            codeInputString = codeOutputs.toString()
            let testObject = {
                source_code: quizProblem.testCode,
                language_id: 91,
                stdin: codeInputString
            }
            console.log(codeInputString)
            console.log(testObject)
            await axios.post("https://judge0-ce.p.rapidapi.com/submissions", testObject, {
                headers: {
                    'X-RapidAPI-Key': '427d6c1267mshae7fe963ae0886cp106d18jsn5992b865ed82',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'content-type': 'application/json'
                },
            }).then((response) => {

                axios.get("https://judge0-ce.p.rapidapi.com/submissions/" + response.data.token, {
                    headers: {
                        'X-RapidAPI-Key': '427d6c1267mshae7fe963ae0886cp106d18jsn5992b865ed82',
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                        'content-type': 'application/json'
                    },
                }).then((response) => {
                    console.log("🚀 ~ file: LectrueDisplayBlock.js:175 ~ runCode ~ response after final get:", response)
                    let formatted1 = response.data.stdout.replaceAll("elo", "❌")
                    let formatted2 = formatted1.replaceAll("hi", "✔️")
                    let formatted3 = formatted2.replaceAll(",", "\n")
                    setTestOutputs(formatted3)
                    console.log("🚀 ~ file: LectrueDisplayBlock.js:177 ~ runCode ~ testOutputs(what will be printed on the text area):", formatted3)
                }).catch((error) => {
                    setLoading(false)
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })

        }, 10000)
    }

    function testClick() {
        console.log("test")
    }
    //cand se termina timpu faci useru inactiv pt quiz
    return (
        <>
            <Navbar></Navbar>

            fiecare problema are nevoie de inputuri si test in backend
            cand ii dau render la problema pot sa ii iau si ID si bazat pe ID pot sa iau inputs si testele si in acceasi manevra pot rula
            {!loading && (
                <div className='pr-72 pl-20 relative'>
                    <p className='text-3xl py-10'>{quiz.quizTitle}</p>
                    {validSubmission ? <TimerElement minutes={minutesLeft} seconds={secondsLeft}></TimerElement> : <TimerElement minutes={0} seconds={0}></TimerElement>}
                    {quiz.problems.map((problem, y) => (
                        <div className='text-2xl' key={problem.quizProblemCode}>
                            <div className='bg-gray-400 h-1 my-10'></div>
                            <h1 >Problem name:</h1>
                            <h1 className='px-10 text-xl'>{problem.problemHeader}</h1>
                            <h1 >Problem text</h1>
                            <h1 className='px-10 text-xl'>{problem.problemText}</h1>
                            <h1 className='text-xl pt-10 pb-5'>Test outputs:</h1>
                            <textarea spellCheck={false} readOnly={true} className='text-xl bg-black  w-full rounded-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4' value={testOutputs}></textarea>
                            <h1 className='font-semibold pb-4'>Solution</h1>
                            <div className='grid grid-cols-1 grid-rows mb-10'>
                                {/* <textarea spellCheck={false} className='bg-black  w-full rounded-t-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea> */}
                                <AceEditor
                                    mode="java"
                                    theme="dracula"
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    height='800px'
                                    width='100%'
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        fontSize: 14,
                                        showPrintMargin: false,
                                    }}
                                    value={solutionCode}
                                    className="solutuionCode"
                                    style={{ backgroundColor: 'black', color: 'white', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}
                                />
                                <div className='bg-[#282A36] h-16 px-4 rounded-b-lg flex justify-end items-center  '>
                                    {
                                        loading === false ? <button onClick={(e) => runCode(problem.quizProblemCode, e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700  ">
                                            <span className="text-lg mr-3 ">Run</span> <FontAwesomeIcon icon={faPlay} />
                                        </button>
                                            : <button className=" bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 flex justify-center ">
                                                <svg className=" h-5 w-5 my-auto animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </button>
                                    }
                                </div>
                            </div>
                            {/* <div className='grid grid-cols-1 grid-rows mb-10'>
                                <textarea spellCheck={false} className=' bg-black  w-full rounded-t-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
                                <div className='bg-gray-800 h-16 px-4 rounded-b-lg flex justify-end items-center  '>
                                    <button onClick={(e) => testRun(problem.quizProblemCode, e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 "><span className="text-lg mr-3 ">Run</span> <FontAwesomeIcon icon={faPlay} /></button>
                                </div>
                            </div> */}
                        </div>))}
                    {validSubmission ? <button onClick={() => testClick()} className='hover:decoration-2 mb-10 bg-green-600 hover:bg-green-500 text-white font-semibold w-36 h-16 rounded-lg'>Submit</button> : <button className='hover:cursor-not-allowed mb-10 hover:decoration-2 bg-green-600 hover:bg-green-500 text-white font-semibold w-36 h-16 rounded-lg'>Submit</button>}
                </div >)
            }

        </>
    )
}

export default QuizPage