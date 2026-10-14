# Email Configuration Setup

This application is configured to send form submissions to `velwinestates@gmail.com` for all form submissions.

## Current Status
- ✅ All forms are integrated with email functionality
- ✅ Form submissions are stored locally in `data/submissions.json`
- ✅ Email logs are written to `data/email.log`
- ⚠️ Actual email sending requires SMTP credentials in the server environment

## Forms Integrated with Email

1. **Book My Team** - `/book-team`
2. **Upload Your Farm Details** - `/farm-details`
3. **List Your Land for Buy/Sell** - `/land` and main page section
4. **Register as Farmer** - `/join-us` and main page section
5. **Register as Worker/Contractor** - Main page section
6. **Request Quote in Construction** - `/request-quote`
7. **Start Managing My Farm** - Plan confirmation pages
8. **Start AMC** - Already integrated
9. **Book Project** - Already integrated
10. **Schedule Soil Test** - Already integrated

## To Enable Real Email Sending

1. **Get Gmail App Password:**
   - Go to your Google Account settings
   - Enable 2-Factor Authentication
   - Generate an App Password for "Mail"
   - Copy the 16-character password

2. **Update the project-root `.env` file:**
   ```env
   SMTP_USER=velwinestates@gmail.com
   SMTP_PASS=your_16_character_app_password_here
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SEND_EMAILS=true
   ```

   `SMTP_USER` and `SMTP_PASS` are required. The host and port above use Gmail
   SMTP; for another provider, use its SMTP host, port, and credentials. The
   server sends the submission notification to `TO_EMAIL` and a separate
   acknowledgement to the user's submitted email address when provided.

   Keep these credentials out of source control. For the hosted site, add the
   same variables to the hosting provider's server environment and redeploy;
   changing the local `.env` only affects local development.

3. **Restart the server:**
   ```bash
   node index.js
   ```

## Email Content

Each email includes:
- **Form Type** (e.g., "Book My Team", "Register as Farmer")
- **User Information** (Name, Phone, Email when provided)
- **Form-specific Details** (varies by form)
- **Timestamp** of submission
- **User Agent and IP** for tracking

## Local Storage

Even when email sending fails, all submissions are:
- Stored in `data/submissions.json` with full details
- Logged in `data/email.log` with timestamps
- Available via admin API at `/api/submissions`
- Deletable from the admin page using each submission's stable ID

## Google Sheets Delete Support

If `GOOGLE_SHEETS_URL` is configured, the deployed Google Apps Script must
handle a delete action in `doPost(e)`. The server sends this JSON payload:

```json
{
   "secret": "your-secret",
   "action": "delete",
   "index": 0
}
```

The `index` is zero-based among data rows, excluding the header row. The Apps
Script should validate `secret`, delete row `index + 2`, and return
`{ "success": true }`.

## Testing

1. Fill out any form on the website
2. Check server console for confirmation logs
3. Check `data/submissions.json` for stored data
4. Check `data/email.log` for email attempts

## Admin Access

View all submissions at: `http://localhost:4000/api/submissions?adminKey=velwinbest@12`