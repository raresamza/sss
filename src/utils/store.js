import { create } from 'zustand'


export const useStore = create((set) => ({
    course: null,
    lecture: null,
    setCourse: (courseInfo) => { set(() => ({ course: courseInfo })) },
    setLecture: (lectureInfo) => { set(() => ({ lecture: lectureInfo })) },
}));
