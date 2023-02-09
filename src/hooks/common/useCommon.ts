import { ShowFail } from "../../utils/message"

export const useCommon = () => {
    const onFinishFailed = (msg='错误')=>{
        ShowFail(msg)
    }

    return {
        onFinishFailed
    }
}