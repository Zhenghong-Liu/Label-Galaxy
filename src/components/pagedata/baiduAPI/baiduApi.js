const request = require('request')
const AK = "plRtgxgcnnYMuIhs3M1fiGHA"
const SK = "IxXBdvVJP5gVGwFWRQVeLNJvibZFpAf2"

function baidu(context, callback) {
    var options = {
        'method': 'POST',
        'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-3.5-8k-0613?access_token=' + '24.4f9d4bec494d6df76ebfde8206e03d10.2592000.1721388611.282335-67911487',
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
