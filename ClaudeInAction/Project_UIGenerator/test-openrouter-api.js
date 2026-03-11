// Test script for OpenRouter API
const OPENROUTER_API_KEY = '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';

async function testOpenRouter() {
  console.log('=== Testing OpenRouter API ===\n');
  console.log('API Key:', OPENROUTER_API_KEY.substring(0, 15) + '...\n');

  const modelsToTry = [
    'stepfun/step-3.5-flash:free',
    'google/gemma-2-9b-it:free',
    'meta-llama/llama-3-8b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
  ];

  for (const model of modelsToTry) {
    console.log(`Testing model: ${model}`);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://github.com/test',
          'X-Title': 'Test',
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Say OK' }],
          max_tokens: 10,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`  ✅ SUCCESS: ${data.choices?.[0]?.message?.content || 'OK'}`);
        console.log(`     Usage: ${data.usage?.total_tokens || '?'} tokens\n`);
      } else {
        console.log(`  ❌ ${response.status}: ${data.error?.message || 'Error'}\n`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}\n`);
    }
  }

  console.log('=== Test Complete ===\n');
}

testOpenRouter()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
