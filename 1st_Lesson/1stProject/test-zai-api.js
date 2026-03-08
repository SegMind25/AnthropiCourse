// Test script for Z.ai API - Check available models and balance
const ZAI_API_KEY = '1f369efe115d454ba61034233472ccb0.3VUd0u9jVx4BNgH9';

const ENDPOINTS = {
  balance: 'https://open.bigmodel.cn/api/v1/balance',
  models: 'https://open.bigmodel.cn/api/v1/models',
};

async function checkBalance() {
  console.log('=== Checking Account Balance ===\n');
  
  try {
    const response = await fetch(ENDPOINTS.balance, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ZAI_API_KEY}`,
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Balance API Response:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(`❌ Failed (${response.status})`);
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function checkModels() {
  console.log('\n=== Checking Available Models ===\n');
  
  try {
    const response = await fetch(ENDPOINTS.models, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ZAI_API_KEY}`,
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Models API Response:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(`❌ Failed (${response.status})`);
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function testChatGLM() {
  console.log('\n=== Testing Chat Completions ===\n');
  
  const modelsToTry = [
    'glm-4-flash',
    'glm-4-air',
    'glm-4',
    'chatglm_turbo',
    'glm-3-turbo-4k',
    'glm-4-flashx',
  ];
  
  for (const model of modelsToTry) {
    console.log(`Testing model: ${model}`);
    
    try {
      const response = await fetch('https://open.bigmodel.cn/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ZAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Say OK' }],
          max_tokens: 5,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(`  ✅ SUCCESS: ${data.choices?.[0]?.message?.content || 'OK'}`);
      } else {
        console.log(`  ❌ ${response.status}: ${data.error?.message || 'Error'}`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
    console.log('');
  }
}

async function runAllTests() {
  console.log('Z.ai API Key Test');
  console.log('Key:', ZAI_API_KEY.substring(0, 10) + '...\n');
  
  await checkBalance();
  await checkModels();
  await testChatGLM();
  
  console.log('\n=== Test Complete ===\n');
}

runAllTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
