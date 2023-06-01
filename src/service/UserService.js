import axios from "axios";

const BASE_URL = "http://localhost:8080/user";
const BASE_URL_ATUH = "http://localhost:8080/auth";
const BASE_URL_COURSE = "http://localhost:8080/course";
const MONGO_URL = "https://licenta-production.up.railway.app/user"

class UserService {

    saveUser(user) {
        return axios.post(MONGO_URL + "/register/teacher", user);
    }
    saveUserPhoto(user) {
        return axios.post(MONGO_URL + "/register/teacherP", user);
    }
    saveUserBasePhoto(user) {
        return axios.post(BASE_URL + "/register/teacherP", user);
    }
    saveUserBase(user) {
        return axios.post(BASE_URL + "/register/teacher", user);
    }

    saveUserStudentPhoto(user) {
        return axios.post(MONGO_URL + "/register/studentP", user);
    }

    saveUserStudentBasePhoto(user) {
        return axios.post(BASE_URL + "/register/studentP", user);
    }

    getStudents() {
        return axios.get(MONGO_URL + "/student");
    }

    getStudentsBase() {
        return axios.get(BASE_URL + "/student");
    }

    authenticateBaseUser(user) {
        return axios.post(BASE_URL_ATUH + "/authenticate", user)
    }

    getUserByEmail(email) {
        return axios.get(BASE_URL + "/" + email, email);
    }

    changeEmail(newEmail) {
        return axios.put(BASE_URL + "/updateEmail", newEmail)
    }
    changePassword(password) {
        return axios.post(BASE_URL + "/changePassword", password)
    }

    addCourse(courseDTO) {
        return axios.post(BASE_URL_COURSE + "/add", courseDTO)
    }
    addCourseUser(addDTO) {
        return axios.put(BASE_URL + "/add/course", addDTO, {
            validateStatus: function (status) {
                return status < 500;
            }
        })
    }
    getCourses() {
        return axios.get(BASE_URL_COURSE);
    }
    getCoursesByEmail(email) {
        return axios.get(BASE_URL_COURSE + "/" + email, email);
    }

    getCoursesByCode(code) {
        return axios.get(BASE_URL_COURSE + "/get-by-code/" + code, code);
    }

    addLectureToCourse(lecture) {
        return axios.put(BASE_URL_COURSE + "/add/lecture", lecture)
    }

    addCommentToCourse(addCommentDTO) {
        return axios.put(BASE_URL_COURSE + "/add/comment", addCommentDTO);
    }

    getCoruseComments(coruseCode, lectureHeader) {
        return axios.get(BASE_URL_COURSE + "/comments/" + coruseCode + "/" + lectureHeader, coruseCode, lectureHeader)
    }
}
//removed "new" keyword before UserService maybe this broke if it breaks   
let userService = new UserService();
export default userService;

