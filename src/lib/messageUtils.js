
const createSystemMessage = (content) => {
    return {
        type: 'system',
        content,
    }
}

const createRobotMessage = (content) =>{
    return {
        type: 'text',
        content,
        user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg', name: '人工智能' },
    }
}

const createOtherUserMesage = (content,userId) =>{
    return {
        type: 'text',
        content,
        user: { name: userId },
    };
}

const createSendMesage = (content) => {
    return {
        type: 'text',
        content,
        position: 'right',
    };
}
const messageUtils = {
    createSystemMessage,
    createRobotMessage,
    createOtherUserMesage,
    createSendMesage,
};
export default messageUtils;