import React from 'react'
import Navbar from './Navbar'
import userService from '../service/UserService'
import { useState } from 'react'
import AceEditor from "react-ace";
import { useCookies } from 'react-cookie';

const CreateQuiz = () => {


    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);


    const [quizMasterObject, setQuizMasterObject] = useState({
        quizTitle: "",
    })

    const [cuurentCode, setCurrentCode] = useState("")


    //pot accesa take quiz dar daca sunt pe lista cu studentii. 

    const [testCode, setTestCode] = useState("//Write tests");

    const handleChange = (e) => {

        const value = e.target.value
        setQuizMasterObject({ ...quizMasterObject, [e.target.name]: value })
        console.log(quizMasterObject);
    }

    function onChangeTest(newValue, e) {
        console.log(newValue)
        setTestCode(newValue)
    }

    const genQuizCode = async (e) => {
        e.preventDefault()
        if (quizMasterObject.quizTitle === null || quizMasterObject.quizTitle === undefined || quizMasterObject.quizTitle === "") {
            document.getElementById("quizTitle").style.borderColor = "red"
            console.log("red")
            console.log("red coode")
        } else {
            document.getElementById("quizTitle").style.borderColor = "black"
            console.log("black")
            await userService.addQuiz(quizMasterObject, cookies.jwt).then((response) => {
                console.log(response.data)
                setCurrentCode(response.data.quizCode)
            }).catch((error) => {
                console.log(error)
            })
        }



    }

    const addStudentToQuiz = (e) => {
        e.preventDefault();
        let flagCode = true;
        let flagStudent = true;
        if (quizMasterObject.quizCode === null || quizMasterObject.quizCode === undefined || quizMasterObject.quizCode === "") {
            document.getElementById("quizCode").style.borderColor = "red"
            console.log("red")
            console.log("red coode")
            flagCode = false;
        }
        else {
            document.getElementById("quizCode").style.borderColor = "black"
            console.log("black")
            flagCode = true;
        }
        if (quizMasterObject.students === null || quizMasterObject.students === undefined || quizMasterObject.students === "") {
            document.getElementById("students").style.borderColor = "red"
            console.log("red")
            console.log("red coode")
            flagStudent = false;
        }
        else {
            document.getElementById("students").style.borderColor = "black"
            console.log("black")
            flagStudent = true;
        }

        if (flagCode && flagStudent) {
            let studentsArray = quizMasterObject.students.split(",")
            let addStudentsDTO = {
                quizCode: quizMasterObject.quizCode,
                students: studentsArray
            }
            console.log(addStudentsDTO)
            userService.addStudentToQuiz(addStudentsDTO, cookies.jwt).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const addQuizProblem = async (e) => {
        e.preventDefault();
        let flagCode = true;
        let flagHeader = true;
        let flagCotnent = true;
        let flagIputs = true;
        if (quizMasterObject.quizCode === null || quizMasterObject.quizCode === undefined || quizMasterObject.quizCode === "") {
            document.getElementById("quizCode").style.borderColor = "red"
            console.log("red")
            console.log("red coode")
            flagCode = false;
        } else {
            document.getElementById("quizCode").style.borderColor = "black"
            console.log("black")
            flagCode = true;
        }
        if (quizMasterObject.problemHeader === null || quizMasterObject.problemHeader === undefined || quizMasterObject.problemHeader === "") {
            document.getElementById("problemHeader").style.borderColor = "red"
            console.log("red")
            flagHeader = false;
        } else {
            document.getElementById("problemHeader").style.borderColor = "black"
            flagHeader = true;
        }
        if (quizMasterObject.problemContent === null || quizMasterObject.problemContent === undefined || quizMasterObject.problemContent === "") {
            document.getElementById("problemContent").style.borderColor = "red"
            console.log("red")
            flagCotnent = false;
        } else {
            flagCotnent = true;
            document.getElementById("problemContent").style.borderColor = "black"
        }
        if (quizMasterObject.inputs === null || quizMasterObject.inputs === undefined || quizMasterObject.inputs === "") {
            document.getElementById("inputs").style.borderColor = "red"
            console.log("red")
            flagCotnent = false;
        } else {
            flagCotnent = true;
            document.getElementById("inputs").style.borderColor = "black"
        }
        if (flagCode && flagHeader && flagCotnent && flagIputs) {
            let addProblemDTO = {
                quizCode: quizMasterObject.quizCode,
                problemText: quizMasterObject.problemContent,
                problemHeader: quizMasterObject.problemHeader,
                inputs: quizMasterObject.inputs.split(","),
                test: testCode
            }
            await userService.addProblemToQuiz(addProblemDTO, cookies.jwt).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }


    }


    return (

        <>
            <Navbar></Navbar>
            <div className='flex justify-between'>
                <div className='w-3/4'>
                    <h1 className='px-44 text-4xl font-bold py-10'>Add quiz</h1>
                    {<h1 className='px-44 text-4xl font-bold py-10 text-green-400'>Current code: {cuurentCode}</h1>}
                    <h1 className='px-44 text-2xl font-bold py-10'>Provide the quiz title</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="quizTitle" name="quizTitle" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the quiz code (not necessary to generate new one, can use old) :</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="quizCode" name="quizCode" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Provide the emails of the students that will be able to participate :</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="students" name="students" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the problem title:</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="problemHeader" name="problemHeader" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the problem text:</h1>
                    <textarea onChange={(e) => handleChange(e)} id='problemContent' name='problemContent' spellCheck={true} className='ml-44 w-3/4 rounded-lg   outline-none h-[300px] resize-none border-2 border-black px-4 py-4 mb-10'></textarea>
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the problem inputs:</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="inputs" name="inputs" />
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
                        style={{ backgroundColor: 'black', color: 'white', marginLeft: '11rem', marginRight: '11rem', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}
                    />
                </div>
                <div className='flex'>
                    <button onClick={(e) => addQuizProblem(e)} className='text-white bg-green-500 hover:bg-green-600 rounded-lg px-4 py-4 mr-10 mt-10 w-52 h-[4.5rem] font-bold'>Add quiz problem</button>
                    <button onClick={(e) => genQuizCode(e)} className='text-white bg-green-500 hover:bg-green-600 rounded-lg px-4 py-4 mr-20 mt-10 w-52 h-[4.5rem] font-bold'>Generate Quiz Code</button>
                    <button onClick={(e) => addStudentToQuiz(e)} className='text-white bg-green-500 hover:bg-green-600 rounded-lg px-4 py-4 mr-20 mt-10 w-52 h-[4.5rem] font-bold'>Add Students</button>
                </div>
            </div>
        </>
    )
}


export default CreateQuiz


