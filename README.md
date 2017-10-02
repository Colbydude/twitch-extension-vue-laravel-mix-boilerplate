# Twitch Extensions VueJS &amp; Laravel Mix Boilerplate

This boilerplate is setup to provide a quick way to create an extension frontend using [Vue](https://vuejs.org/) and [Laravel Mix](https://laravel.com/docs/master/mix), and a backend with Docker/Express. This is stemming from the same format of boilerplate as the [official Twitch Sample](https://github.com/twitchdev/extensions-samples).

## Dependencies

You will need:
 * [docker](https://docs.docker.com/engine/installation/)
 * [docker-compose](https://docs.docker.com/compose/install/)

## Generate self-signed certs
```bash
cd certs
./generate_local_ssl.sh
    # Requires a sudo password so that the cert can be installed on the root keychain
    # If this install fails, see the README in ./certs for manual override.
```

## To start the Extensions Boilerplate service
```bash
docker-compose up --build
```

## Further documentation

Please consult the [Twitch Extensions documentation on the Twitch developer site](https://dev.twitch.tv/docs/extensions)
