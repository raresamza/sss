import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import userService from '../service/UserService'
import { useStore } from '../utils/store'
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";



const Discussions = () => {



    const [relaod, setRelaod] = useState(true)

    const [laoding, setLaoding] = useState(true)

    const [comments, setComments] = useState(null)

    const courseZustand = useStore((state) => state.course)
    const lectureZustand = useStore((state) => state.lecture)


    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    // console.log("course")
    // console.log(courseZustand)
    // console.log("lecture")
    // console.log(lectureZustand)

    const postComment = (e) => {
        e.preventDefault();
        let comment
        let header
        if (lectureZustand === null) {
            header = courseZustand.lectures[0].header
            console.log(courseZustand.lectures[0].header)
        } else {
            header = lectureZustand.header
            console.log(lectureZustand.header)
        }
        comment = {
            coruseCode: courseZustand.courseCode,
            lectureHeader: header,
            comment: document.getElementById("comment").value,
            email: jwtDecode(cookies.jwt).sub
        }
        userService.addCommentToCourse(comment).then((response) => {
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

                const comments = await (await userService.getCoruseComments(courseZustand.courseCode, header)).data
                setComments(comments)
            } catch (err) {
                console.log(err)
            }
            setLaoding(false);
        };
        fetchData();
    }, [relaod]);


    // console.log(comments)

    return (

        <div className='px-44 '>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <div className=' w-full flex justify-end items-center relative '>
                    <input className=" w-full px-4 rounded-full border-[2px] border-gray-900 p-2 " type="text" id="comment" name="comment" placeholder="Start a discussion..." />
                    <button onClick={(e) => postComment(e)} className=" hover:bg-gray-300 rounded-3xl absolute text-black right-0 border-2 w-14 h-11 border-black"><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>
            </div>
            {!laoding && (
                <div>
                    {comments.map((comment, y) => (
                        <div className='flex items-center justify-center mb-10 ' key={y}>
                            <img className='rounded-full w-14 mr-4 ' src={comment.photoUrl} alt="Raton"></img>
                            <p className=" w-full px-4 p-2 " type="text" id="comment" name="comment">{comment.comment}</p>
                        </div>))}
                </div>)}

            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <p className=" w-full px-4 p-2 " type="text" id="comment" name="comment">testing</p>
            </div>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <p className=" w-full px-4 p-2 " type="text" id="comment" name="comment">testing</p>
            </div>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <p className=" w-full px-4 p-2 " type="text" id="comment" name="comment">testing</p>
            </div>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <p className=" w-full px-4 p-2 " type="text" id="comment" name="comment">testing</p>
            </div>
        </div>
    )
}

export default Discussions