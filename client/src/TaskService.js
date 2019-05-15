import axios from 'axios'
import request from 'request-promise-native'

const url = 'http://localhost:3000/tasks/all/'

class TaskService {

    // Get Tasks
    static async getTasks() {
        var options = {
            uri: url,
            json: true // Automatically parses the JSON string in the response
        };
        const response = await request(options)
        return response
    }
    // Create Task
    static insertTask(description, completed = false) {
        return axios.post(url, {
            description,
            completed
        })
    }

    // Delete Task
    static deleteTask(id) {
        return axios.delete(`${url}${id}`)
    }

}

export default TaskService