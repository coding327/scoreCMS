import { ShowFail } from "../../utils/message"
import { useRouter } from 'vue-router'

export const useCommon = () => {

    const router = useRouter()
    const gotowhere = (url: string) => {
      router.push(url)
    }

    const onFinishFailed = (msg='错误')=>{
        ShowFail(msg)
    }

    return {
        onFinishFailed,
        gotowhere
    }
}