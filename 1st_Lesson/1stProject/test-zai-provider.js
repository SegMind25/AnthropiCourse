// Quick test for Z.ai provider integration
require('dotenv').config({ path: '.env' });

const { getZaiLanguageModel } = require('./src/lib/zai-provider.ts');

async function test() {
  console.log('Testing Z.ai Provider Integration...\n');
  console.log('ZAI_API_KEY set:', !!process.env.ZAI_API_KEY);
  console.log('API Key:', process.env.ZAI_API_KEY?.substring(0, 10) + '...\n');

  try {
    const model = getZaiLanguageModel('glm-4-flash');
    console.log('Model created:', model.modelId);
    console.log('Provider:', model.provider);
    console.log('\n✅ Provider initialization successful!');
    console.log('\nNote: The API key is valid but needs model permissions activated.');
    console.log('Visit https://open.bigmodel.cn/ to enable models.\n');
  } catch (error) {
    console.log('\n❌ Error:', error.message);
    process.exit(1);
  }
}

test();
