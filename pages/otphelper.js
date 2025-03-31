const Imap = require('imap');
const { simpleParser } = require('mailparser');

const imapConfig = {
    user: 'bijen@propertystack.ai',
    password: 'khlofmsbttlhrvrb',  
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchOTP(user, password) {
    return new Promise(async (resolve, reject) => {
        console.log("Waiting 10 seconds before fetching OTP...");
        await delay(10000); // Wait for 10 seconds before checking emails

        const imap = new Imap({ ...imapConfig, user, password });

        function openInbox(cb) {
            imap.openBox('INBOX', false, cb);
        }

        imap.once('ready', function () {
            openInbox(function (err, box) {
                if (err) {
                    imap.end();
                    return reject(err);
                }

                console.log("Searching for unread OTP emails...");
                imap.search(['UNSEEN', ['FROM', 'admin@propertystack.ai']], function (err, results) {
                    if (err || !results.length) {
                        console.log('No new OTP emails found.');
                        imap.end();
                        return reject('No OTP found');
                    }

                    console.log(`Found ${results.length} unread email(s). Fetching the latest one...`);

                    const fetch = imap.fetch(results.slice(-1), { bodies: '' }); // Get the most recent email
                    fetch.on('message', function (msg) {
                        msg.on('body', function (stream) {
                            simpleParser(stream, async (err, parsed) => {
                                if (err) {
                                    imap.end();
                                    return reject(err);
                                }

                                // Extract email body
                                const emailBody = parsed.text || parsed.html || '';
                                console.log('Email Body Preview:', emailBody.substring(0, 200)); // Show first 200 characters

                               
                                // Extract OTP after "YOUR LOGIN CODE"
                                const otpMatch = emailBody.match(/YOUR LOGIN CODE\s*\n+\s*([A-Za-z0-9]{6})/);
                                const otp = otpMatch ? otpMatch[1] : null;


                                console.log('Extracted OTP:', otp);
                                imap.end();

                                if (!otp) {
                                    return reject('Could not find the OTP in the email.');
                                }

                                resolve(otp);
                            });
                        });
                    });
                });
            });
        });

        imap.once('error', function (err) {
            console.error('IMAP Error:', err);
            reject(err);
        });

        imap.once('end', function () {
            console.log('IMAP Connection Ended');
        });

        imap.connect();
    });
}

module.exports = { fetchOTP };
