# IP Tracker Vercel Project

This project is a simple Vercel deployment with:

- A clean landing page in `public/index.html`
- A serverless API route in `api/visit.js`
- Email notifications sent with Nodemailer
- Environment-based secrets for all email credentials

## Files Included

- `package.json`
- `vercel.json`
- `api/visit.js`
- `public/index.html`
- `README.md`

## How It Works

When the landing page loads, the browser calls `POST /api/visit`. The API route then:

1. Reads the visitor IP address from request headers
2. Creates an ISO timestamp
3. Captures the `User-Agent`
4. Sends an email notification through Nodemailer

## Install Dependencies

```bash
npm install
```

## Run Locally

You can run the project locally with the Vercel CLI:

```bash
npm run dev
```

If you prefer, you can also use:

```bash
vercel dev
```

## Deploy to Vercel

1. Push the project to a Git repository.
2. Import the repository into Vercel.
3. Set the environment variables described below.
4. Deploy the project.

Vercel will serve the landing page and the `/api/visit` serverless function automatically.

## Environment Variables

Set these values in your Vercel project settings and in your local environment if needed:

- `MAIL_USER`
- `MAIL_PASS`
- `MAIL_TO`

Example local setup file:

```bash
MAIL_USER=your-sending-email@example.com
MAIL_PASS=your-email-password-or-app-password
MAIL_TO=destination-email@example.com
```

## Email Configuration

Place your email account details here:

- `MAIL_USER`: the email address that Nodemailer will send from
- `MAIL_PASS`: the password or app password for that sender account
- `MAIL_TO`: the email address that should receive notifications

In `api/visit.js`, there are comments showing exactly where each variable is used:

- `MAIL_USER` configures the sender email address
- `MAIL_PASS` configures the sender password or app password
- `MAIL_TO` configures the notification recipient

Do not hardcode any of these values into the source code. Keep them in environment variables only.

## Privacy Notice

The landing page includes a visible notice informing visitors that access information may be recorded.

## Notes

- The API route includes basic method validation and error handling.
- The email transport currently uses Gmail as the example provider in Nodemailer.
- If you use a different email provider, update the transporter configuration in `api/visit.js` accordingly.
