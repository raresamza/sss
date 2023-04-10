import axios from "axios";

const BASE_URL="http://localhost:8080/user";
const MONGO_URL="https://licenta-production.up.railway.app/user"

class UserService {

        saveUser(user) {
            return axios.post(MONGO_URL+"/register/teacher",user);
        }
        saveUserPhoto(user) {
            return axios.post(MONGO_URL+"/register/teacherP",user);
        }
        saveUserBasePhoto(user) {
            return axios.post(BASE_URL+"/register/teacherP",user);
        }
        saveUserBase(user) {
            return axios.post(BASE_URL+"/register/teacher",user);
        }

        saveUserStudentPhoto(user) {
            return axios.post(MONGO_URL+"/register/studentP",user);
        }

        saveUserStudentBasePhoto(user) {
            return axios.post(BASE_URL+"/register/studentP",user);
        }

        getStudents() {
            return axios.get(MONGO_URL+"/student");
        }

        getStudentsBase() {
            return axios.get(BASE_URL+"/student");
        }
}
//removed "new" keyword before UserService maybe this broke if it breaks   
export default new UserService();

