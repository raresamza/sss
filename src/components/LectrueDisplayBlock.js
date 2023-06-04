import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import qs from 'qs';
import userService from '../service/UserService'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

const LectrueDisplayBlock = ({ lectureZustand, courseZustand }) => {



    function onChange(newValue) {
        console.log(newValue);
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

        let data = {
            source_code: "print(\"Hello World\")\n" +
                "print(\"Hi\")\n" +
                "val=input()\n" +
                "print(val)\n",
            "language_id": 92,
            "stdin": "world"
        }

        await axios.post("https://judge0-ce.p.rapidapi.com/submissions", data, {
            headers: {
                'X-RapidAPI-Key': '427d6c1267mshae7fe963ae0886cp106d18jsn5992b865ed82',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'content-type': 'application/json'
            },
        }).then((response) => {
            console.log(response.data.token)
            axios.get("https://judge0-ce.p.rapidapi.com/submissions/" + response.data.token, {
                headers: {
                    'X-RapidAPI-Key': '427d6c1267mshae7fe963ae0886cp106d18jsn5992b865ed82',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                },
            }).then((response) => {
                console.log(response.data.stdout)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        });
    }

    let value = "class Main {\n" + "\tpublic static void main( String args[]) {\n" + "\t\tSystem.out.println(\"Hello world\")\n" + "    }\n"



    return (

        <>
            <div className=' px-44'>

                {/* {console.log(courseZustand, "COURSE")} */}
                {lectureZustand !== null ? <h1 className='py-4  text-3xl font-semibold'>{lectureZustand.header}</h1> : <h1 className='py-4  text-3xl font-semibold'>{courseZustand.lectures[0].header}</h1>}
                {lectureZustand !== null ? <p className='pb-4' >{lectureZustand.content}</p> : <p className='pb-4' >{courseZustand.lectures[0].content}</p>}
                {lectureZustand !== null ? <h1 className='py-4  text-3xl font-semibold'>{lectureZustand.problemHeader}</h1> : <h1 className='py-4  text-3xl font-semibold'>{courseZustand.lectures[0].problemHeader}</h1>}
                {lectureZustand !== null ? <p className='pb-4' >{lectureZustand.problemContent}</p> : <p className='pb-4' >{courseZustand.lectures[0].problemContent}</p>}
                <h1 className='pb-4 font-semibold'>Test output</h1>
                <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
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
                        value={value}
                        className="class"
                        style={{ backgroundColor: 'black', color: 'white', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}
                    />
                    <div className='bg-[#282A36] h-16 px-4 rounded-b-lg flex justify-end items-center  '>
                        <button onClick={(e) => handleClick(e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 "><span className="text-lg mr-3 ">Run</span> <FontAwesomeIcon icon={faPlay} /></button>
                    </div>
                </div>


                <AceEditor
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
                />
            </div>

        </>
    )
}

export default LectrueDisplayBlock