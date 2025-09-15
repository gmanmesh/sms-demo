
import axios from 'axios';

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
    const params = {
        phone_number,
        message
    }
    try {
        const response = await axios.post('https://whatsms.p.rapidapi.com/send_sms', {}, { params, headers });
        return res.status(200).json({ success: true, data: response.data, message: 'Message sent successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message', details: error.message})
    }

}