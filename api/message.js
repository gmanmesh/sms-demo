export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const { phone_number, message } = req.body;
    if (!phone_number || !message) {
        return res.status(400).json({ error: 'Missing phone number or message' });
    }
    const headers = {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'whatsms.p.rapidapi.com'
    }
    return res.status(200).json({ phone: phone_number, message: message });
    const params = {
        phone_number: phone_number,
        message: message
    }
    const queryString = URLSearchParams(params).toString();
    const urlWithParams = `https://whatsms.p.rapidapi.com/send_sms?${queryString}`;
    try {
        const response = await fetch(urlWithParams, { method: 'POST', headers: headers, body: JSON.stringify({})});

        const responseData = response.json();
        if(!response.ok){
            return res.status(response.status).json({ error: 'API request failed', details: responseData });
        }
        return res.status(200).json({ success: true, data: responseData, message: 'Message sent successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message', details: error.message})
    }

}
