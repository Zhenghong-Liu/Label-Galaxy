const request = require('request')

async function baidu(context, callback) {
var options = {
        'method': 'POST',
        'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-3.5-8k-preview?access_token=24.02889ce1c7bf9016e7ffce4b34349124.2592000.1717912348.282335-67911487',
        'headers': {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(context)

    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        const data = JSON.parse(response.body)
        console.log(data)
//      console.log(data.result)
//      console.log(data.usage.total_tokens)
		callback(data.result, data.usage.total_tokens)
    });
}

export {baidu}















//function baidu(){
//	const responseData = {
//		name : '刘政宏',
//		age : 20
//	}
//	
//	
//	return JSON.stringify(responseData)
//	
//}
//
//export {baidu}
