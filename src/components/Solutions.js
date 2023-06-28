import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, useEffect } from 'react';
import userService from '../service/UserService'
import { useStore } from '../utils/store'
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";

//fa metoda sa dea fetch la poza de profil bazat pe mail


const Solutions = () => {

    const [userPhoto, setUserPhoto] = useState(null)

    const [relaod, setRelaod] = useState(true)

    const [text, setText] = useState({ value: 'Add a solution', caret: -1, target: null });

    useEffect(() => {

        if (text.caret >= 0) {

            text.target.setSelectionRange(text.caret + 4, text.caret + 4);

        }

    }, [text]);

    const handleTab = (e) => {

        let content = e.target.value;
        let caret = e.target.selectionStart;

        if (e.key === 'Tab') {
            e.preventDefault();
            let newText = content.substring(0, caret) + ' '.repeat(4) + content.substring(caret);
            setText({ value: newText, caret: caret, target: e.target });
        }
    }

    const handleText = (e) => setText({ value: e.target.value, caret: -1, target: e.target });

    const textareaRef = useRef(null)

    const [laoding, setLaoding] = useState(true)

    const [solutions, setSolutions] = useState(null)

    const courseZustand = useStore((state) => state.course)
    const lectureZustand = useStore((state) => state.lecture)

    const [cookies] = useCookies(['cookie-name']);


    const postSolution = (e) => {
        e.preventDefault();
        let solution
        let header
        if (lectureZustand === null) {
            header = courseZustand.lectures[0].header
            console.log(courseZustand.lectures[0].header)
        } else {
            header = lectureZustand.header
            console.log(lectureZustand.header)
        }
        solution = {
            coruseCode: courseZustand.courseCode,
            lectureHeader: header,
            solution: document.getElementById("solution").value,
            email: jwtDecode(cookies.jwt).sub
        }
        console.log(solution)
        userService.addSolutionToCourse(solution, cookies.jwt).then((response) => {
            setRelaod(!relaod)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            setLaoding(true);
            try {
                let header
                console.log(courseZustand.courseCode)
                if (lectureZustand === null) {
                    header = courseZustand.lectures[0].header
                    console.log(courseZustand.lectures[0].header)
                } else {
                    header = lectureZustand.header
                    console.log(lectureZustand.header)
                }
                const solutions = await (await userService.getCoruseSolutions(courseZustand.courseCode, header, cookies.jwt)).data
                const photo = await (await userService.getUserPhotoByEmail(jwtDecode(cookies.jwt).sub, cookies.jwt)).data
                setUserPhoto(photo)
                setSolutions(solutions)
            } catch (err) {
                console.log(err)
            }
            setLaoding(false);
        };
        fetchData();
    }, [cookies.jwt, courseZustand.courseCode, courseZustand.lectures, lectureZustand, relaod]);

    // console.log(userPhoto)

    return (
        <div className='px-[6.5rem]'>
            <div className='flex items-center justify-center mb-10 relative'>
                <img className='rounded-full w-14 mr-4 ' src={userPhoto} alt="Raton"></img>
                <textarea
                    ref={textareaRef} id="solution" onKeyDown={(e) => handleTab(e)} onChange={(e) => handleText(e)} value={text.value} spellCheck={false} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-12 py-4' ></textarea>
                <button onClick={(e) => postSolution(e)} className="  rounded-lg absolute text-white top-0 right-0  w-14 h-11"><FontAwesomeIcon icon={faPaperPlane} /></button>

            </div>
            {!laoding && (
                <div>
                    {solutions.map((solution, y) => (
                        <div className='flex items-center justify-center mb-10 ' key={y}>
                            <img className='rounded-full w-14 mr-4 ' src={solution.photoUrl} alt="Raton"></img>
                            <textarea
                                ref={textareaRef} readOnly={true} spellCheck={false} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4' defaultValue={solution.solution}></textarea>
                        </div>))}
                </div>)}
            {/* <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4' defaultValue="base java program"></textarea>
            </div>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4' defaultValue="nase java prgoram"></textarea>

            </div>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4' defaultValue="base java program"></textarea>
            </div> */}
        </div>
    )
}

export default Solutions