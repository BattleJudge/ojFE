import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token')
    }
  },
  mutations: {
    //将token保存到sessionStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
      state.user.token = data
      localStorage.setItem('token', data)
    },
    //获取用户名
    SET_USER: (state, data) => {
      // 把用户email存起来
      state.user.email = data
      localStorage.setItem('email', data)
    },
    //登出
    LOGOUT: (state) => {
      // 登出的时候要清除token
      state.user.token = null
      state.user.email = null
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    }

  }
})
