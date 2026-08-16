const mineflayer = require('mineflayer');

const config = {
    host: 'hassanmohdd.aternos.me',
    port: 19983,
    username: 'YOUR_BOT_NAME',
    version: false,
    auth: 'offline'
};

function createBot() {
    console.log('🔄 Connecting...');

    const bot = mineflayer.createBot(config);
    let jumpInterval;

    bot.once('spawn', () => {
        console.log('✅ Bot joined!');
        console.log('🚶 Walking + jumping...');

        bot.setControlState('forward', true);

        jumpInterval = setInterval(() => {
            if (!bot.entity) return;

            bot.setControlState('jump', true);

            setTimeout(() => {
                if (bot.entity) {
                    bot.setControlState('jump', false);
                }
            }, 250);
        }, 700);
    });

    bot.on('error', err => {
        console.log('⚠️ Error:', err.code || err.message);
    });

    bot.on('kicked', reason => {
        console.log('🚫 Kicked:', reason);
    });

    bot.on('end', reason => {
        console.log('🔌 Disconnected:', reason || 'Unknown');

        if (jumpInterval) {
            clearInterval(jumpInterval);
            jumpInterval = null;
        }

        console.log('🔄 Rejoining in 10 seconds...');

        setTimeout(createBot, 10000);
    });
}

createBot();
