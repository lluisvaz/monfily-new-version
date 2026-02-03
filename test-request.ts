async function testValidation() {
  const data = {
    name: 'Luis Felipe Vaz Rodrigues',
    email: 'lipevaz.lfv@gmail.com',
    phone: '11945645232',
    country: 'BR',
    company: 'sfaffsa',
    website: 'google.com',
    services: ['website'],
    budget: 'lt5k',
    timeframe: 'urgent',
    message: 'Test message'
  };

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();
    console.log('Status:', response.status);
    console.log('Body:', JSON.stringify(body, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testValidation();
