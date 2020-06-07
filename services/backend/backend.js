const color = require('color');
const ext = require('commander');
const express = require('express');
const fs = require('fs');
const https = require('https');
const jwt = require('jsonwebtoken');
const path = require('path');
const request = require('request');

const app = express();

// Config.
const verboseLogging = true;                // Verbose logging; Turn off for production.

const initialColor = color('#6441A4');      // Super important; bleedPurple, etc.
const serverTokenDurationSec = 30;          // Our tokens for pubsub expire after 30 seconds.
const userCooldownMs = 1000;                // Maximum input rate per user to prevent bot abuse.
const userCooldownClearIntervalMs = 60000;  // Interval to reset our tracking object.
const channelCooldownMs = 1000;             // Maximum broadcast rate per channel.
const bearerPrefix = 'Bearer ';             // JWT auth headers have this prefix.

const channelColors = {};                   // Current extension state.
const channelCooldowns = {};                // Rate limit compliance.
let userCooldowns = {};                     // Spam prevention.

const STRINGS = {
    env_secret: `* Using env var for secret`,
    env_client_id: `* Using env var for client-id`,
    env_owner_id: `* Using env var for owner-id`,
    server_started: `Server running at %s`,
    missing_secret: "Extension secret required.\nUse argument '-s <secret>'",
    missing_clientId: "Extension client ID required.\nUse argument '-c <client ID>'",
    missing_ownerId: "Extension owner ID required.\nUse argument '-o <owner ID>'",
    message_send_error: "Error sending message to channel %s",
    pubsub_response: "Message to c:%s returned %s",
    cycling_color: "Cycling color for c:%s on behalf of u:%s",
    color_broadcast: "Broadcasting color %s for c:%s",
    send_color: "Sending color %s to c:%s",
    cooldown: "Please wait before clicking again",
    invalid_jwt: "Invalid JWT"
};

ext.version(require('../../package.json').version)
    .option('-s, --secret <secret>', 'Extension secret')
    .option('-c, --client-id <client_id>', 'Extension client ID')
    .option('-o, --owner-id <owner_id>', 'Extension owner ID')
    .parse(process.argv);

// YOU SHALL NOT PASS!
if (!ext.secret) {
    console.log(STRINGS.missing_secret);
    process.exit(1);
}

if (!ext.clientId) {
    console.log(STRINGS.missing_clientId);
    process.exit(1);
}

if (!ext.ownerId) {
    console.log(STRINGS.missing_ownerId);
    process.exit(1);
}

// Log function that won't spam in production.
const verboseLog = verboseLogging ? console.log.bind(console) : function () { };

// Methods.
const verifyAndDecode = (header) => {
    try {
        if (!header.startsWith(bearerPrefix)) {
            return false;
        }

        const token = header.substring(bearerPrefix.length);
        const secret = Buffer.from(ext.secret, 'base64');

        return jwt.verify(token, secret, {
            algorithms: ['HS256']
        });
    } catch (e) {
        return false;
    }
};

const colorCycleHandler = (req, res) => {
    // Once more with feeling: every request MUST be verified, for SAFETY!
    const payload = verifyAndDecode(req.headers.authorization);
    if (!payload) {
        return res.send(401, STRINGS.invalid_jwt);
    }

    const {
        channel_id: channelId,
        opaque_user_id: opaqueUserId
    } = payload;

    // We need to store the color for each channel using the extension.
    let currentColor = channelColors[channelId] || initialColor;

    // Bot abuse prevention - don't allow a single user to spam the button.
    if (userIsInCooldown(opaqueUserId)) {
        return res.send(429, STRINGS.cooldown);
    }

    verboseLog(STRINGS.cycling_color, channelId, opaqueUserId);

    // Rotate the color like a wheel.
    currentColor = color(currentColor).rotate(30).hex();

    // Save the new color for the channel.
    channelColors[channelId] = currentColor;

    attemptColorBroadcast(channelId);

    return res.send(200, currentColor);
};

const colorQueryHandler = (req, res) => {
    // REMEMBER! Every request MUST be verified, for SAFETY!
    const payload = verifyAndDecode(req.headers.authorization);
    if (!payload) {
        return res.send(401, STRINGS.invalid_jwt);
    } // Seriously though.

    const {
        channel_id: channelId,
        opaque_user_id: opaqueUserId
    } = payload;

    const currentColor = color(channelColors[channelId] || initialColor).hex();

    verboseLog(STRINGS.send_color, currentColor, opaqueUserId);

    return res.send(200, currentColor);
};

const attemptColorBroadcast = (channelId) => {
    // Per-channel rate limit handler.
    const now = Date.now();
    const cooldown = channelCooldowns[channelId];

    if (!cooldown || cooldown.time < now) {
        // We can send immediately because we're outside the cooldown.
        sendColorBroadcast(channelId);
        channelCooldowns[channelId] = {
            time: now + channelCooldownMs
        };

        return;
    }

    // schedule a delayed broadcast only if we haven't already
    if (!cooldown.trigger) {
        cooldown.trigger = setTimeout(sendColorBroadcast, now - cooldown.time, channelId);
    }
};

const sendColorBroadcast = (channelId) => {
    // our HTTP headers to the Twitch API
    const headers = {
        'Client-Id': ext.clientId,
        'Content-Type': 'application/json',
        'Authorization': bearerPrefix + makeServerToken(channelId)
    };

    const currentColor = color(channelColors[channelId] || initialColor).hex();

    // our POST body to the Twitch API
    const body = JSON.stringify({
        content_type: 'application/json',
        message: currentColor,
        targets: ['broadcast']
    });

    verboseLog(STRINGS.color_broadcast, currentColor, channelId);

    // send our broadcast request to Twitch
    request(
        `https://api.twitch.tv/extensions/message/${channelId}`, {
        method: 'POST',
        headers,
        body
    }, (err, res) => {
        if (err) {
            console.log(STRINGS.messageSendError, channelId);
        } else {
            verboseLog(STRINGS.pubsub_response, channelId, res.statusCode);
        }
    });
};

const makeServerToken = (channelId) => {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + serverTokenDurationSec,
        channel_id: channelId,
        user_id: ext.ownerId, // Extension owner ID for the call to Twitch PubSub.
        role: 'external',
        pubsub_perms: {
            send: ['*'],
        },
    };

    const secret = Buffer.from(ext.secret, 'base64');
    return jwt.sign(payload, secret, {
        algorithm: 'HS256'
    });
};

const userIsInCooldown = (opaqueUserId) => {
    const cooldown = userCooldowns[opaqueUserId];
    const now = Date.now();

    if (cooldown && cooldown > now) {
        return true;
    }

    // Voting extensions should also track per-user votes to prevent skew.
    userCooldowns[opaqueUserId] = now + userCooldownMs;

    return false;
};

// Server
// CORS.
app.use((req, res, next) => {
    console.log('Got request', req.path, req.method);

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Origin', '*');

    return next();
});

// Routes.
app.post('/color/cycle', colorCycleHandler);
app.get('/color/query', colorQueryHandler);

// HTTPS.
let options = {
    key: fs.readFileSync(path.resolve(__dirname, '../conf/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../conf/server.crt'))
};

const PORT = 8081;
https.createServer(options, app).listen(PORT, function () {
    console.log(STRINGS.server_started, PORT);

    // Periodically clear cooldown tracking to prevent unbounded growth due to
    // per-session logged out user tokens.
    setInterval(function () {
        userCooldowns = {};
    }, userCooldownClearIntervalMs);
});
