import { Auth } from 'aws-amplify'

export const auth = {
    namespaced : true,
    mutations:{
        setUser(state, payload){
            state.user = payload
        }
    },
    state:{
        user:null
    },
    actions:{
        async logoutUser({commit}){
            commit('setUser',null);
            return await Auth.signOut();
        },
        async loginUser({commit}, {username, password}){
            try {
                await Auth.signIn({
                    username,
                    password
                })
                commit('setUser',await Auth.currentUserInfo());
                return Promise.resolve("Successfully Logged In")
            }
            catch (error){
                console.error(error);
                return Promise.reject("No such User")
            }
        },

        async ConfirmSignupUser(_, {username, code}){
            try {
                await Auth.confirmSignUp(username,code);
                return Promise.resolve("You're Successfully Signed Up");
            }
            catch (error){
                console.log("Something Went Wrong "+ error);
                return Promise.reject("Something Went Wrong")
            }
        },

        async SignupUser(_, {username, password, email}){
            try {
                await Auth.signUp({
                    username,
                    password,
                    attributes:{
                        email
                    }
                });
                return Promise.resolve("You're Successfully Signed Up");
            }
            catch (error){
                console.log("Something Went Wrong "+ error);
                return Promise.reject(error)
            }
        },

        async authAction({commit}){
            commit('setUser',await  Auth.currentUserInfo());
        }

    },
    getters:{
        user:(state) => state.user
    }
};