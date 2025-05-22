import {defineStore} from 'pinia'
import axios from 'axios'

interface User {
    id: number
    username: string
    phone?: string
    bio?: string
}
interface AuthState {
    user: User | null
    token: string | null
}
export const useAuthStore = defineStore('auth', {state: (): AuthState => ({
        user: null,
        token: localStorage.getItem('token')||null
    }),
    actions: {
        async register(UserData:{username:string, email:string, password:string, phone?:string, bio?:string}){
            const response = await axios.post('http://localhost:8000/api/register', UserData)
            this.token = response.data.token
            localStorage.setItem('token', this.token as string)
            await this.fetchUser()
        },
        async login(credentials: { username: string; password: string }) {
            const response = await axios.post('http://localhost:8000/api/login/', credentials)
            this.token = response.data.token
            localStorage.setItem('token', this.token as string)
            await this.fetchUser()
        },
        async fetchUser(){
            if (this.token){
                const response = await axios.get('http://localhost:8000/api/user/', 
                    {headers: {Authorization: `Token ${this.token}`}})
                this.user = response.data
            }
        },
        logout()
        {
            this.token = null
            localStorage.removeItem('token')
            this.user = null

        }
    }
})