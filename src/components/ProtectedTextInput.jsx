import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const ProtectedTextInput = ({ name, id, placeholder }) => {
    function togglePassword(e) {
        e.preventDefault();

        // el represents the input element
        const el = document.getElementById(id);

        // Switch element's type on click
        if (el.type === "password") {
            el.type = "text";
        } else {
            el.type = "password";
        }
    }

    return (
        <>
            <div className="protectedInput flex rounded-md hover:shadow-lg border-2 border-black">
                <input type="password" name={name} id={id} placeholder={placeholder} className="bg-transparent w-full rounded-tl-md rounded-bl-md px-3 focus:outline-none focus:shadow-md" />
                <button onClick={(e) => { togglePassword(e) }} className="bg-gray-100 px-4 py-2 rounded-tr-md rounded-br-md">
                    <FontAwesomeIcon icon={faEyeSlash} />
                </button>
            </div>
        </>
    )
}


export default ProtectedTextInput


