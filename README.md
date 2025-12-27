# 📧 Email Automation Agent

An intelligent agent that monitors your email inbox, identifies scholarship and job opportunities, automatically applies on your behalf, and sends WhatsApp notifications.

## Features

- 🔍 **Smart Email Monitoring**: Continuously scans your inbox for opportunities
- 🤖 **AI-Powered Analysis**: Uses GPT-4 to understand email content and identify applications
- 📝 **Automatic Applications**: Fills and submits applications using your resume and cover letter
- 📱 **WhatsApp Notifications**: Real-time updates on every application submitted
- 📊 **Dashboard**: Track all applications and activity in one place

## Setup

1. **Email Configuration**:
   - Gmail: Enable 2FA and create an app-specific password
   - Outlook/Yahoo: Generate an app password in security settings

2. **WhatsApp Integration**:
   - For production: Set up Twilio WhatsApp API or WhatsApp Business API
   - Add credentials to environment variables

3. **OpenAI API**:
   - Get your API key from https://platform.openai.com

4. **Deploy**:
   ```bash
   npm install
   npm run build
   npm start
   ```

## Configuration

Fill out the form with:
- Email provider and credentials
- WhatsApp phone number (with country code)
- OpenAI API key
- Resume URL (publicly accessible)
- Cover letter template

## How It Works

1. Agent checks your email every 30 seconds
2. AI analyzes each email to detect opportunities
3. Extracts application links and requirements
4. Automatically fills and submits applications
5. Sends you a WhatsApp confirmation with details

## Security

- Credentials are stored securely
- All operations happen on your behalf
- No data is shared with third parties
- Open source and auditable

## Production Deployment

For production use:
- Integrate real email APIs (Gmail API, Microsoft Graph)
- Set up WhatsApp Business API or Twilio
- Add proper authentication and encryption
- Use environment variables for all secrets
- Implement rate limiting and error handling

## License

MIT
