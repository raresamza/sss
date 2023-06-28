import axios from "axios";

const BASE_URL = "http://localhost:8080/user";
const BASE_URL_ATUH = "http://localhost:8080/auth";
const BASE_URL_QUIZ = "http://localhost:8080/quiz";
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

    getStudents(token) {
        return axios.get(MONGO_URL + "/student", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

    getStudentsBase(token) {
        return axios.get(BASE_URL + "/student", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

    authenticateBaseUser(user) {
        return axios.post(BASE_URL_ATUH + "/authenticate", user)
    }

    getUserByEmail(email, token) {
        return axios.get(BASE_URL + "/" + email, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, email);
    }

    changeEmail(newEmail, token) {
        return axios.put(BASE_URL + "/updateEmail", newEmail, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }
    changePassword(password, token) {
        return axios.post(BASE_URL + "/changePassword", password, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    addCourse(courseDTO, token) {
        return axios.post(BASE_URL_COURSE + "/add", courseDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }
    addCourseUser(addDTO, token) {
        return axios.put(BASE_URL + "/add/course", addDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, {
            validateStatus: function (status) {
                return status < 500;
            }
        })
    }
    getCourses(token) {
        return axios.get(BASE_URL_COURSE, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }
    getCoursesByEmail(email, token) {
        return axios.get(BASE_URL_COURSE + "/" + email, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, email);
    }

    getCoursesByCode(code, token) {
        return axios.get(BASE_URL_COURSE + "/get-by-code/" + code, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, code);
    }

    addLectureToCourse(lecture, token) {
        return axios.put(BASE_URL_COURSE + "/add/lecture", lecture, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    addCommentToCourse(addCommentDTO, token) {
        return axios.put(BASE_URL_COURSE + "/add/comment", addCommentDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        });
    }

    getCoruseComments(coruseCode, lectureHeader, token) {
        return axios.get(BASE_URL_COURSE + "/comments/" + coruseCode + "/" + lectureHeader, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, coruseCode, lectureHeader)
    }

    addSolutionToCourse(addCommentDTO, token) {
        return axios.put(BASE_URL_COURSE + "/add/solution", addCommentDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        });
    }

    getCoruseSolutions(coruseCode, lectureHeader, token) {
        return axios.get(BASE_URL_COURSE + "/solutions/" + coruseCode + "/" + lectureHeader, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, coruseCode, lectureHeader)
    }

    getUserPhotoByEmail(email, token) {
        return axios.get(BASE_URL + "/photourl/" + email, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, email)
    }

    compile() {
        return axios.post("https://ce.judge0.com/submissions/?base64_encoded=false&wait=false", {
            "source_code": "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello, %s\n\", name);\n  return 0;\n}",
            "language_id": 4,
            "stdin": "world"
        }, {
            "Content- Type": "application/json",
            "X-Auth-Token": "427d6c1267mshae7fe963ae0886cp106d18jsn5992b865ed82"
        })
    }

    checkKey() {
        return axios.post(" https://ce.judge0.com/authenticate", {
            "X-Auth-Token": "427d6c1267mshae7fe963ae0886cp106d18jsn5992b865ed82"
        },
        )
    }

    postTests(addTestDTO, token) {
        return axios.put(BASE_URL_COURSE + "/add/tests", addTestDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    postInputs(addInputDTO, token) {
        return axios.put(BASE_URL_COURSE + "/add/inputs", addInputDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    upvote(VoteDTO, token) {
        return axios.put(BASE_URL_COURSE + "/upvote", VoteDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    downvote(VoteDTO, token) {
        return axios.put(BASE_URL_COURSE + "/downvote", VoteDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    getUpvotes(coruseCode, lectureHeader, token) {
        return axios.get(BASE_URL_COURSE + "/get/upvotes/" + coruseCode + "/" + lectureHeader, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, coruseCode, lectureHeader)
    }

    getDownvotes(courseCode, lectureHeader, token) {
        return axios.get(BASE_URL_COURSE + "/get/downvotes/" + courseCode + "/" + lectureHeader, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, courseCode, lectureHeader)
    }

    getTests(courseCode, lectureHeader, token) {
        return axios.get(BASE_URL_COURSE + "/get/tests/" + courseCode + "/" + lectureHeader, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, courseCode, lectureHeader)
    }

    getInputs(courseCode, lectureHeader, token) {
        return axios.get(BASE_URL_COURSE + "/get/inputs/" + courseCode + "/" + lectureHeader, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, courseCode, lectureHeader)
    }
    addQuiz(quizDTO, token) {
        return axios.post(BASE_URL_QUIZ + "/add", quizDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    addStudentToQuiz(addStudentDTO, token) {
        return axios.put(BASE_URL_QUIZ + "/add/students", addStudentDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    addProblemToQuiz(addProblemDTO, token) {
        return axios.put(BASE_URL_QUIZ + "/add/problem", addProblemDTO, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    isUserActive(email, token) {
        return axios.get(BASE_URL + "/active/" + email, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, email)
    }

    getQuizByCode(code, token) {
        return axios.get(BASE_URL_QUIZ + "/get/" + code, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, code)
    }

    getQuizCodeFromUser(email, token) {
        return axios.get(BASE_URL + "/quiz-code/" + email, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, email)
    }

    getQuizProblem(quizCode, quizProblemCode, token) {
        return axios.get(BASE_URL_QUIZ + "/get/problem/" + quizCode + "/" + quizProblemCode, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        }, quizCode, quizProblemCode)
    }

    resetRequest(email, token) {
        return axios.post(BASE_URL + "/resetPassword", email, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

    addBio(AddBioDto, token) {
        return axios.put(BASE_URL + "/add/bio", AddBioDto, {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
    }

}
//dto go before auth headers,care
//removed "new" keyword before UserService maybe this broke if it breaks   
let userService = new UserService();
export default userService;

