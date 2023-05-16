import { Text, View } from 'react-native';
import React from 'react'
import CommonStyle from "../../../themes/commonStyles";
const ChatField = ({ senderName, timeData }) => {

    return (
        <>
            <View style={CommonStyle.topViewInChatView}>
                <Text style={CommonStyle.senderNameTxt}>{senderName}</Text>
                <Text style={CommonStyle.timeTxt}>{timeData}</Text>
            </View>

        </>
    )
}

export default ChatField