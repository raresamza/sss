import React from 'react'
import { useState, useEffect } from 'react'

export default function useEffectExample({ courseCode }) {
    const [courseData, setCourseData] = useState(null);

    useEffect(async () => {
        setCourseData(getCoursesByCode(courseCode))
    }, []);

    return (
        <div>useEffectExample</div>
    )
}
