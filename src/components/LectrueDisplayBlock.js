import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faVialCircleCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import qs from 'qs';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";
import userService from '../service/UserService';

const LectrueDisplayBlock = ({ lectureZustand, courseZustand }) => {

    const [cookies] = useCookies(['cookie-name']);
    const [role, setRole] = useState("STUDENT")



    const [solutionCode, setSolutionCode] = useState("public class Main {\n" +
        "\tpublic static void main( String args[]) {\n" +
        "\t\tSystem.out.print(\"Hello world\");\n\t}\n" +
        "}\n");
    const [testCode, setTestCode] = useState();
    const [testOutputs, setTestOutputs] = useState("")
    const [inputs, setInputs] = useState("");

    const [loading, setLoading] = useState(false)
    const [loadingTest, setLoadingTest] = useState(false)
    const [loadingInputs, setLoadingInputs] = useState(false)
    const [inputsBackend, setInputsBackend] = useState("")
    const [testsBackend, setTestsBackend] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const role = (await userService.getUserByEmail(jwtDecode(cookies.jwt).sub)).data
                setRole(role.role)
                console.log(role.role)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [cookies.jwt, loading])


    useEffect(() => {
        const fetchData = async () => {
            try {

                let header
                if (lectureZustand === null) {
                    header = courseZustand.lectures[0].header
                    console.log(courseZustand.lectures[0].header)
                } else {
                    header = lectureZustand.header
                    console.log(lectureZustand.header)
                }

                const inputsBackend = (await userService.getInputs(courseZustand.courseCode, header)).data
                setInputsBackend(inputsBackend)
                const testsBackend = (await userService.getTests(courseZustand.courseCode, header)).data
                setTestsBackend(testsBackend)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [cookies.jwt, courseZustand.courseCode, courseZustand.lectures, lectureZustand])


    const doesOutputContainNull = (output) => {
        for (let i = 0; i < output.length; i++) {
            if (output[i] === null) {
                return true
            }
        }
        return false
    }
    const isOutputEmpty = (output) => {
        if (output.length === 0) {
            return true
        }
        return false
    }

    const runCode = async (e) => {
        e.preventDefault();
        let submissions = []
        let tokens = []
        let codeOutputs = []
        let codeInputString = ""
        let tokenString = ""
        let data = {
            submissions: submissions
        }

        for (let i = 0; i < inputsBackend.length; i++) {
            let submissionData = {
                source_code: solutionCode,
                "language_id": 91,
                "stdin": inputsBackend[i]
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
                source_code: testsBackend,
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
                    setTestOutputs(response.data.stdout.replace(",", "\n"))
                    let formatted1 = response.data.stdout.replace("elo", "❌")
                    let formatted2 = formatted1.replace("hi", "✔️")
                    let formatted3 = formatted2.replace(",", "\n")
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
    //cand postez testu tre sa dau refresh la pagina ca sa se traga din db

    const onChangeInputs = (e, newValue) => {
        setInputs(e.target.value)


    }
    function onChange(newValue, e) {
        console.log(JSON.stringify(solutionCode))
        setSolutionCode(newValue)
    }
    function onChangeTest(newValue, e) {
        setTestCode(newValue)
    }





    const postTest = async (e) => {
        e.preventDefault();
        setLoadingTest(true)
        let header
        if (lectureZustand === null) {
            header = courseZustand.lectures[0].header
            console.log(courseZustand.lectures[0].header)
        } else {
            header = lectureZustand.header
            console.log(lectureZustand.header)
        }
        let addTestDTO = {
            "coruseCode": courseZustand.courseCode,
            "lectureHeader": header,
            "testCode": testCode
        }
        console.log(addTestDTO)

        await userService.postTests(addTestDTO).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
            setLoadingTest(false)
        })
        setLoadingTest(false)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        // var data = {
        //     'code': 'val = int(input("Enter your value: ")) + 5\nprint(val)',
        //     'language': 'py',
        //     'input': '7'
        // };
        // await axios.post("https://api.codex.jaagrav.in", data, {
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //     },
        // }).then((response) => {
        //     console.log(response.data)
        // }).catch((error) => {
        //     console.log(error)
        // })
        // console.log(data)
        setLoading(true)
        let data = {
            source_code: solutionCode,
            "language_id": 91,
            "stdin": "world"
        }

        await axios.post("https://judge0-ce.p.rapidapi.com/submissions", data, {
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
                console.log(response.data.stdout)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
            })
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        });
        setLoading(false)
    }
    //iei inputs, pt fiecare test??? faci un obiect de tip data carea va avea codu luat editor,laguage 91
    //  pt java si std in din inputs si le pui in array u submissions
    //iei tokenurile si le pui in array u tokens
    //faci call la api cu un string care o sa fie tokens.join(",") ca header, vezi postman
    //dai display la teste vezi tu cum dupa cum iti da arrayu de truth cu numele->subject to change aici vezi cum faci testele
    //  ca sa poti da display calumea
    const postInputs = async (e) => {

        e.preventDefault();

        setLoadingInputs(true)
        let header
        if (lectureZustand === null) {
            header = courseZustand.lectures[0].header
            console.log(courseZustand.lectures[0].header)
        } else {
            header = lectureZustand.header
            console.log(lectureZustand.header)
        }
        let addInputDTO = {
            "coruseCode": courseZustand.courseCode,
            "lectureHeader": header,
            "inputs": inputs.split(",")
        }
        console.log(addInputDTO)

        await userService.postInputs(addInputDTO).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
            setLoadingInputs(false)
        })
        setLoadingInputs(false)
    }


    return (

        <>
            <div className=' px-44'>

                {/* {console.log(courseZustand, "COURSE")} */}
                {lectureZustand !== null ? <h1 className='py-4  text-3xl font-semibold'>{lectureZustand.header}</h1> : <h1 className='py-4  text-3xl font-semibold'>{courseZustand.lectures[0].header}</h1>}
                {lectureZustand !== null ? <p className='pb-4' >{lectureZustand.content}</p> : <p className='pb-4' >{courseZustand.lectures[0].content}</p>}
                {lectureZustand !== null ? <h1 className='py-4  text-3xl font-semibold'>{lectureZustand.problemHeader}</h1> : <h1 className='py-4  text-3xl font-semibold'>{courseZustand.lectures[0].problemHeader}</h1>}
                {lectureZustand !== null ? <p className='pb-4' >{lectureZustand.problemContent}</p> : <p className='pb-4' >{courseZustand.lectures[0].problemContent}</p>}
                {role === "STUDENT" ?
                    <div>
                        <h1 className='pb-4 font-semibold'>Test output</h1>
                        <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
                    </div>
                    :
                    <div>
                        <h1 className='pb-4 font-semibold'>Write tests</h1>
                        <AceEditor
                            mode="java"
                            theme="dracula"
                            onChange={(e) => {
                                onChangeTest(e);
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
                            value={testCode}
                            className="solutuionCode"
                            style={{ backgroundColor: 'black', color: 'white', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}
                        />
                        <div className='bg-[#282A36] h-16 px-4 rounded-b-lg flex justify-end items-center  '>
                            {
                                loadingTest === false ? <button onClick={(e) => postTest(e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700  ">
                                    <span className="text-lg mr-3 ">Upload Tests</span> <FontAwesomeIcon icon={faPlay} />
                                </button>
                                    : <button className=" bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 flex justify-center ">
                                        <svg className=" h-5 w-5 my-auto animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </button>
                            }
                        </div>
                        <div className=' w-full flex justify-end items-center relative my-5'>
                            <input onChange={(e) => { onChangeInputs(e); }} className=" w-full px-4 rounded-full border-[2px] border-gray-900 p-2 " type="text" id="inputs" name="inputs" placeholder="Start a discussion..." />
                            <button onClick={(e) => postInputs(e)} className=" hover:bg-gray-300 rounded-3xl absolute text-black right-0 border-2 w-14 h-11 border-black"><span className='text-xl '> <FontAwesomeIcon icon={faVialCircleCheck} /></span></button>
                        </div>
                        <button onClick={(e) => runCode(e)} className=" bg-green-600 rounded-lg h-12  w-36 align-left text-white hover:bg-green-700 mb-10 ">Test</button>

                    </div>
                }
                {/* <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea> */}
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
                            loading === false ? <button onClick={(e) => handleClick(e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700  ">
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
                {/* <AceEditor
                    mode="java"
                    theme="dracula"
                    onChange={(e) => {
                        onChange(e);
                    }}
                    width='100%'
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        fontSize: 14,
                        showPrintMargin: false,
                    }}
                    value={value}
                    className="class"
                    style={{ backgroundColor: 'black', color: 'white', borderRadius: '10px' }}
                /> */}
            </div>

        </>
    )
}

export default LectrueDisplayBlock