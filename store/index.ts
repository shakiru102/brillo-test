import { userDetails } from "~/types/interface";

export const state = () => ({
     user: null as userDetails | null
})

export const mutations =  {
   SetUser(state: any , doc: any){
      state.user = doc
   },
}