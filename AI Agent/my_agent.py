import json
from openai import OpenAI

# 1. 建立与本地 Ollama (Gemma 4 Cloud) 的连接
client = OpenAI(
    base_url='http://localhost:11434/v1',
    api_key='ollama'  # 因为是本地服务，这里填任意字符串即可
)

# 2. 准备 Agent 的“手脚”（定义一个本地 Python 函数）
def get_device_status(device_name):
    """这是一个模拟工具：负责获取本地智能设备的状态"""
    print(f"\n[🔧 工具执行中...] 正在查询设备: {device_name}")
    
    # 现实中，你可以在这里用 requests.get() 去请求 Home Assistant 或 ESP32 的 API
    if "机柜" in device_name or "server" in device_name.lower():
        return "温度 42 度，风扇以 60% 功率运转中"
    elif "灯" in device_name:
        return "处于关闭状态"
    else:
        return "设备在线，状态正常"

# 3. 告诉 Agent 它拥有哪些工具可以使用 (JSON Schema 格式)
tools = [{
    "type": "function",
    "function": {
        "name": "get_device_status",
        "description": "获取指定智能开关、传感器或设备的状态",
        "parameters": {
            "type": "object",
            "properties": {
                "device_name": {
                    "type": "string",
                    "description": "设备的名称，例如：客厅主灯、服务器机柜排风扇、空调"
                }
            },
            "required": ["device_name"]
        }
    }
}]

# 4. 开始对话（这里模拟你的自然语言输入）
user_input = "帮我看看服务器机柜现在的状态怎么样了？"
messages = [{"role": "user", "content": user_input}]

print(f"你: {user_input}")
print("Agent: 思考中...\n")

# 5. 第一轮大脑运转：让 Agent 决定是否需要使用工具
response = client.chat.completions.create(
    model="gemma4:31b-cloud", # 调用你刚刚授权的云端模型
    messages=messages,
    tools=tools
)

message = response.choices[0].message

# 6. 判断 Agent 是否决定“动手”
if message.tool_calls:
    for tool_call in message.tool_calls:
        # Agent 决定调用工具，提取它想调用的函数名和提取出的参数
        function_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)
        
        if function_name == "get_device_status":
            # 执行我们写好的本地 Python 函数
            result = get_device_status(arguments.get("device_name"))
            
            # 关键步骤：把工具执行的真实结果“喂”回给 Agent，让它结合结果做总结
            messages.append(message) # 把 Agent 决定调用工具的动作记录存入上下文
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": str(result)
            })
            
            # 第二轮大脑运转：Agent 结合工具返回的数据，用人话回答你
            final_response = client.chat.completions.create(
                model="gemma4:31b-cloud",
                messages=messages
            )
            print(f"\nAgent 最终回复: {final_response.choices[0].message.content}")
else:
    # 如果问题不需要用工具（比如“你好”），它会直接回答
    print(f"\nAgent 直接回复: {message.content}")